const main = document.querySelector('main');
    main.classList.add("conteiner");

const header = document.querySelector('header');

const btn__cart = document.querySelector('.btn-cart');
    

const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const renderProducts = (list = []) => {
    const productList = list.map((item) => {
        return renderProduct(item.title, item.price);
    });
    // let productList = [];

    // for (let i = 0; i < list.length; i++) {
    //     productList.push(renderProduct(list[i].title, list[i].price));
    // }
    // for (const item of list) {
    //     productList.push(renderProduct(item.title, item.price));
    // }

    // document.querySelector('.products').insertAdjacentHTML("afterbegin", productList);
    // console.log(productList);

    productList.forEach(elem => {
        document.querySelector('.products').insertAdjacentHTML("afterbegin", elem);
    });

    // let [test] = productList;
    // console.log(test);
}

renderProducts(products);
