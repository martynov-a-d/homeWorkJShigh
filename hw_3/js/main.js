'use strict'
const main = document.querySelector('main');
    main.classList.add("conteiner");
const header = document.querySelector('header');
const btn__cart = document.querySelector('.btn-cart');

const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

    // запросить данные с сервера
      // ES5 
      // let getRequest = (url, callBack) => {
      //   let xhr = new XMLHttpRequest();
      //   xhr.open('GET', url, true);
      //   xhr.onreadystatechange = function () {
      //     if (xhr.readyState === 4) { // если статус запроса "выполнилось"
      //       if (xhr.status !== 200) { // если статус с кодом ошибки
      //           console.log('ooopps...' + xhr.status + ' ' + xhr.statusText);
      //       } else {
      //         callBack(xhr.responseText);
      //       }
      //     }
      //   }
      //   xhr.send();
      // }
      // 
      // Promise
      // let getRequest = (url) => {
      //   return new Promise((resolve, reject) => {
      //     let xhr = new XMLHttpRequest();
      //     xhr.open('GET', url, true);
      //     xhr.onreadystatechange = () {
      //       if (xhr.readyState === 4) { // если статус запроса "выполнилось"
      //         if (xhr.status !== 200) { // если статус с кодом ошибки
      //           reject("error");
      //         } else {
      //           resolve(xhr.responseText);
      //         }
      //       }
      //     }
      //   });
      // }

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
        // this._fetchGoods(); // получаем данные с сервера
        this._getData() // получаем данные с сервера
          .then((data) => {
            this._goods = data;
            this._render(); // создаем объект из данные с сервера                    
            this.sum(); // считаем стоимость всех товаров прилетевших в данные
            this.taskBtn(); // добавляем слушатель события
          });
    }

    // данные  с сервера
    // _fetchGoods() {
    //   getRequest(`${API}/catalogData.json`, (data) => {
    //     this._goods = JSON.parse(data);
    //     this._render(); // создаем объект из данных с сервера
    //   });
    // }

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
        // let btnBuy = document.querySelectorAll(this.container); // присваиваем переменной ссылку на кнопки
        // btnBuy.forEach(elem => { // перебираем объект с кнопками
        //     elem.addEventListener('click', elem => { // добавляем слушатель события
        //         if (elem.target.classList.contains('buy-btn')) {
        //           console.log(elem.target.dataset);
        let btnBuy = document.querySelector(this.container); // присваиваем переменной ссылку на кнопки
          btnBuy.addEventListener('click', elem => {
            if (elem.target.classList.contains('buy-btn')) {
              console.log(elem.target.dataset);
              const cart = new CartElem(elem.target.dataset);
            }
          })

        //     })
        // })
    }
}

    // Корзина покупок
    class CartElem extends GoodsItem{
      constructor(elem, img = 'https://via.placeholder.com/50x100'){
        super(elem, img);
        this.quantity = 1;
        this.arrCartItem = [];
        this._addToCart();
        this._removeCart();
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
      _addToCart() {
        
        let cart_block = document.querySelector('.cart-block');
        let cart_item = document.querySelectorAll('.cart-item');
        let cI_quantity = document.querySelectorAll('.product-quantity');
        
        if (cart_item.length < 1) {
          cart_block.insertAdjacentHTML('beforeend', this.render());
          console.log(this);
        }
        // console.log(cart_item);
        // this.arrCartItem.push(cart_item);
        // let cartFind = this.arrCartItem.find(elem => elem.id === this.id) 
        //   if(cartFind) {
        //     this.quantity++;
        //     console.log(this);
        //   } else {
        //     cart_block.insertAdjacentHTML('beforeend', this.render());
        //     console.log(this);
        //   }  
        
      

        console.log(cart_item);
        cart_item.forEach(elem => {
          if(elem.dataset['id'] == this.id) {
            this.cI_quantity++;
            console.log(this);
          } else {
            cart_block.insertAdjacentHTML('beforeend', this.render());
            console.log(this);
          }  
        })
        
        // if(cart_item.id === this.id) {
        //   console.log("WTF");
        // } else {
        //       cart_block.insertAdjacentHTML('beforeend', this.render());
        //       console.log(this);
        //     }  

        // while (this.arrCartItem.length < 1) {
        //   this.arrCartItem.push(this);
        //   cart_block.insertAdjacentHTML('beforeend', this.render());
        //   console.log(cart_item);
        //   console.log(this.arrCartItem);
        // }
        // this.arrCartItem.forEach(elem => {
        //   if (+elem.id === +this.id) {
        //     console.log(+this.id)
        //     // elem.quantity = quantity++;
        //   } else {
        //     cart_block.insertAdjacentHTML('beforeend', this.render());
        //     console.log(this.arrCartItem);
        //   }  
        // })

        // if (false) {
        //   this.quantity = quantity++;
        // } else {
        //   arrCartItem.push(this);
        //   cart_block.insertAdjacentHTML('beforeend', this.render());
        //   console.log(arrCartItem);
        // }
      }
      _removeCart() {
        let btnRemove = document.querySelector('.cart-block');
        btnRemove.addEventListener('click', elem => {
          if(elem.target.classList.contains('del-btn')) {
            console.log(this);
            // document.querySelector(this).remove();
          };
        });
      }


      // constructor(container = ".cart-block", url = "/getBasket.json"){
      //   super(url, container);
      // }
      // _addToCart(elem) {
      //   this._getData(`${API}/addToBasket.json`)
      //     .then(data => {
      //       console.log(data);
      //       if(data.result === 1){
      //         let elemId = +elem.dataset['id'];
      //         let find = this.allProducts.find(product => product.id_product === elemId);
      //         let product = {
      //           id_product: productId,
      //           price: +elem.dataset['price'],
      //           product_name: elem.dataset['name'],
      //           quantity: 1
      //         }
      //         this._goods = [product];
      //       }
      //     })
      //   }
      }
    

    const list = new GoodsList();
    