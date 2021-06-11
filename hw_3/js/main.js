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
            <button class="buy-btn">Купить</button>
        </div>
    </div>`;
    }
}

class GoodsList {
    constructor(container = '.products') { // передаем параметр с строкой .products 
        this.container = container;
        this._goods = []; // данные
        this._allProducts = []; // массив экземпляров товаров на основе this.goods

        // this._fetchGoods(); // получаем данные с сервера
        this._getData() // получаем данные с сервера
          .then((data) => {
            this._goods = data;
            this._render(); // создаем объект из данные с сервера                    
            this.sum(); // считаем стоимость всех товаров прилетевших в данные
          });

        this.addToCart();
    }

    // данные  с сервера
    // _fetchGoods() {
    //   getRequest(`${API}/catalogData.json`, (data) => {
    //     this._goods = JSON.parse(data);
    //     this._render(); // создаем объект из данных с сервера
    //   });
    // }

    _getData() { 
      return fetch(`${API}/catalogData.json`) // получаем данные с сервера
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
    addToCart() {
        let btnBuy = document.querySelectorAll('.buy-btn'); // присваиваем переменной ссылку на кнопки
        btnBuy.forEach(elem => { // перебираем объект с кнопками
            elem.addEventListener('click', function(event) { // добавляем слушатель события
                console.log(event.target);
            })
        })
    }

}

const list = new GoodsList();








    // Корзина покупок
// class Cart {
//     constructor(buyList) {
//         this.buyList = buyList;
//     }

//     countingCart() {
//         let toBePaid = '';
//             toBePaid += +this.buyList[1].innerHTML;
//         let test2 = +toBePaid;
//         console.log(test2);
//     }
// }

// let by__btn = document.querySelectorAll('.buy-btn');
// by__btn.forEach(elem => {
//     elem.addEventListener('click', (event) => {
//         let test = new Cart(event.target);
//         test.countingCart();
//     });
// });