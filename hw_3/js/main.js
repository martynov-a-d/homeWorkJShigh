'use strict'
const main = document.querySelector('main');
    main.classList.add("conteiner");
const header = document.querySelector('header');
const btn__cart = document.querySelector('.btn-cart');

// ES5

// const products = [
//     {id: 1, title: 'Notebook', price: 20000},
//     {id: 2, title: 'Mouse', price: 1500},
//     {id: 3, title: 'Keyboard', price: 5000},
//     {id: 4, title: 'Gamepad', price: 4500},
// ];
// const renderProduct = (title, price) => {
//     return `<div class="product-item">
//                 <h3>${title}</h3>
//                 <p>${price}</p>
//                 <button class="by-btn">Добавить в корзину</button>
//               </div>`;
// };
// const renderProducts = (list = []) => {
//     const productList = list.map((item) => {
//         return renderProduct(item.title, item.price);
//     });
//     productList.forEach(elem => {
//         document.querySelector('.products').insertAdjacentHTML("afterbegin", elem);
//     });
// }
// renderProducts(products);

// ES6

class GoodsItem {
    constructor(elem, img='https://via.placeholder.com/200x150') {
        this.name = elem.name;
        this.price = elem.price;
        this.id = elem.id;
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

        this._checkData();
        this._fetchGoods(); // получаем данные с сервера
        this._render(); // создаем объект из данные с сервера
        this.sum(); // считаем стоимость всех товаров прилетевших в данные
        this.addToCart();
    }
    
    // запросить данные с сервера
    _checkData() {
      // ES5 как-то так, CORS меня послал
      // let xhr = new XMLHttpRequest();
      // xhr.open('GET', 'data.json', true);
      // xhr.onreadystatechange = function () {
      //   if (xhr.readyState !== 4) return; // если статус запроса не "выполнилось"
      //   if (xhr.status !== 200) { // если статус с кодом ошибки
      //       console.log('ooopps...' + xhr.status + ' ' + xhr.statusText);
      //   } else {
      //     let data = JSON.parse(xhr.responseText);
      //     _fetchGoods(data);
      //   }
      // }
      // xhr.send();

      // косячная попытка эмулировать поступление данных
      // let dataJSON = '[{"id":1,"name":"Notebook","price":20000},{"id":2,"name":"Mouse","price":1500},{"id":3,"name":"Keyboard","price":5000},{"id":4,"name":"Gamepad","price":4500}]';
      // let data = JSON.parse(dataJSON);
      // console.log(data);
      // data.forEach(elem => {
      //   this._goods.push = elem;
      //   console.log(elem);
      // })
      // return this._goods;

      // ES6
      // fetch('data.json')
      //   .then(result => result.json())
      //   .then(data => {
      //     _fetchGoods(data); // не уверян что правильно, но проверить не могу
      //   })
      //   .catch((error) => console.log('ooopps...'));
    }

    // данные  с сервера
    _fetchGoods() {
        this._goods = [
            {id: 1, name: 'Notebook', price: 20000},
            {id: 2, name: 'Mouse', price: 1500},
            {id: 3, name: 'Keyboard', price: 5000},
            {id: 4, name: 'Gamepad', price: 4500},
        ];
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