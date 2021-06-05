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
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="product-item">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <button class="by-btn">Добавить в корзину</button>
      </div>`;
    }
}
class GoodsList {
    constructor(goods) {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.products').insertAdjacentHTML("afterbegin", listHtml);
    }

    // Считает стоимость всех товаров

    test() {
        let totalPrice = 0;
        this.goods.forEach(good => {
            totalPrice += good.price;
        })
        console.log(totalPrice);
    }
}
const list = new GoodsList();
list.fetchGoods();
list.render();
list.test();

    // Корзина покупок

class Cart {
    constructor(buyList) {
        this.buyList = buyList.children;
    }

    countingCart() {
        let toBePaid = '';
            toBePaid += +this.buyList[1].innerHTML;
        let test2 = +toBePaid;
        console.log(test2);
    }

}


let by__btn = document.querySelectorAll('.by-btn');
by__btn.forEach(elem => {
    elem.addEventListener('click', (event) => {
        let test = new Cart(event.target.parentNode);
        test.countingCart();
    });
});




