const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    products: [],
    cartElem: [],
    isVisibleCart: false,
    searchingElem: [],
    searchLine: '',
    imgCatalog: 'https://placehold.it/200x150',
    imgCart: 'https://placehold.it/50x100',
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product){
      console.log(product.id_product);
      this.getJson(`${API}/addToBasket.json`) // Запросили с сервера обратную связь
        .then(data => { // Если он вернулся с данными
          if(data.result === 1){ // если в данных пришёл 1 (все огонь)
            // Пребираем массив методом find и возвращаем elem если проверка дала true
            console.log("WTF!!!!!!!");
            let compare = this.cartElem.find(elem => elem.id_product === product.id_product);
            if(compare){
              compare.quantity++;
              console.log("TEST");
              console.log(compare);
            } else {
              let newCartElem = Object.assign({quantity: 1}, product);
              this.cartElem.push(newCartElem);
            }
          } else {
            console.log("ERROR!!!");
          }
        })
    },
    removeProduct(elem){
      this.getJson(`${API}/deleteFromBasket.json`) // Запросили с сервера обратную связь
        .then(data => { // Если он вернулся с данными
          if(data.result === 1){ // если в данных пришёл 1 (все огонь)
            if(elem.quantity > 1){
              elem.quantity--;
            } else {
              this.cartElem.splice(this.cartElem.indexOf(elem), 1);
            }
          }
        })
    },
    filter(){
      let regExp = new RegExp(this.searchLine, 'i');
      this.searchingElem = this.products.filter(elem => regExp.test(elem.product_name));
    }
  },
  beforeCreate() {},
  created() {
    this.getJson(`${API + this.cartUrl}`)
        .then(data => {
          for (let elem of data.contents) {
            this.cartElem.push(elem);
          }
        });
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let elem of data){
          this.products.push(elem);
          this.searchingElem.push(elem);
        }
      });
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
});
