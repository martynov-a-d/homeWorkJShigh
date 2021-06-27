'use strict'
const main = document.querySelector('main');
    main.classList.add("conteiner");
const header = document.querySelector('header');
const btn__cart = document.querySelector('.btn-cart');
const cart_block = document.querySelector('.cart-block');
const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
class GoodsItem {
    constructor(elem, img='https://via.placeholder.com/200x150') {
        this.name = elem.product_name;
        this.price = elem.price;
        this.id = elem.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
        <img src="${this.img}" alt="Some img">
        <div class="desc">
            <h3>${this.name}</h3>
            <p>${this.price} \u20bd</p>
            <button class="buy-btn"
            data-id_product="${this.id}" 
            data-product_name="${this.name}" 
            data-price="${this.price}">Купить</button>
        </div>
    </div>`;
    }
}
class GoodsList {
    constructor(url = '/catalogData.json', container = '.products') { // передаем параметр с строкой .products 
        this.container = container;
        this.url = url;
        this._goods = []; // данные
        this._allProducts = []; // массив экземпляров товаров на основе this.goods
        this.arrCartItem = [];
        // this._fetchGoods(); // получаем данные с сервера
        this._getData() // получаем данные с сервера
          .then((data) => {
            this._goods = data;
            this._render(); // создаем объект из данные с сервера                    
            this.sum(); // считаем стоимость всех товаров прилетевших в данные
            this.taskBtn(); // добавляем слушатель события
          });
    }
    _getData() { 
      return fetch(`${API + this.url}`) // получаем данные с сервера
        .then(result => result.json()) // распарсиваем данные ))
        .catch(error => console.log(error)); // выдаем ошибку если ничего не принес
    }
    // приватный метод для перебора данные и создания массива с объектами этих данных
    _render() {
        const block = document.querySelector(this.container); // присваиваем block - window.'.products' div
        for(const product of this._goods) { // перебираем массив goods
            // console.log(new GoodsItem(product).render())
            const goodsObject = new GoodsItem(product); // создаем объект на основе данных из массива goods
            this._allProducts.push(goodsObject); // push добавляем элемент в конец массива allProducts
            block.insertAdjacentHTML('beforeend', goodsObject.render()) //
        }
    }
    // Считает стоимость всех товаров
    sum() {
        let totalPrice = 0; 
        this._goods.forEach(good => {
            totalPrice += good.price;
        })
        console.log(totalPrice);
    }
    // Добавляем обработчик на кнопку купить
    taskBtn() {
        const btnBuy = document.querySelector(this.container); // присваиваем переменной ссылку на кнопки
          btnBuy.addEventListener('click', elem => {
            if (elem.target.classList.contains('buy-btn')) {
              const cartEl = new CartElem(elem.target.dataset);
              this._addToCart(cartEl);
            }
          })
        cart_block.addEventListener('click', elem => {
            if (elem.target.classList.contains('del-btn')) {
              this._remove(elem.target);
            }
          })
    }
    _addToCart(cartEl) {
      let findElem = this.arrCartItem.find(elem => elem.id == cartEl.id);
      if (findElem) {
        findElem.quantity++;
        this._updateCart(findElem);
      } else {
        this.arrCartItem.push(cartEl);  
        cart_block.insertAdjacentHTML('beforeend', cartEl.render());
      }
    }
    _updateCart(addElem) {
      const elem = document.querySelectorAll('.cart-item');
      elem.forEach(el => {
        if (el.dataset.id == addElem.id) {
          el.querySelector('.product-quantity').textContent = `Количество: ${addElem.quantity}`;
          el.querySelector('.product-price').textContent = `${addElem.quantity*addElem.price} ₽`;
        }
      })
    }
    _remove(delElem) {
      const elem = document.querySelectorAll('.cart-item');
      let findElem = this.arrCartItem.find(elem => elem.id == delElem.dataset.id);
      elem.forEach(el => {
        if (el.dataset.id == delElem.dataset.id) {
          if (findElem.quantity > 1) {
            findElem.quantity--;
            this._updateCart(findElem);
          } else {
            el.remove();
            this.arrCartItem.splice(this.arrCartItem.indexOf(find), 1);
          }
        }
      })
    }
}
    // Корзина покупок
    class CartElem extends GoodsItem{
      constructor(elem, img = 'https://via.placeholder.com/50x100'){
        super(elem, img);
        this.quantity = 1;
      }
      render() {
        return `<div class="cart-item" data-id="${this.id}">
                <div class="product-bio">
                <img src="${this.img}" alt="Some image">
                <div class="product-desc">
                <p class="product-title">${this.name}</p>
                <p class="product-quantity">Количество: ${this.quantity}</p>
            <p class="product-single-price">${this.price} за ед.</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">${this.quantity*this.price} ₽</p>
                <button class="del-btn" data-id="${this.id}">&times;</button>
            </div>
            </div>`
      }
    }
    const list = new GoodsList();
    