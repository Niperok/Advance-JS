const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    products: [],
    filtered: [],
    productsInCart: [],
    imgCatalog: 'https://placehold.it/200x150',
    imgCart: 'https://placehold.it/50x100',
    searchLine: '',
    isVisibleCart: false,
  },
  methods: {
    getJson(url){
      return fetch(url)
          .then(result => result.json())
          .catch(error => {
            console.log(error);
          })
    },
    addProduct(product) {
      console.log(product);
    },
    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filtered = this.products.filter(product => regexp.test(product.product_name));
    },
    showCart() {
      this.isVisibleCart = !this.isVisibleCart;
    }
  },
  beforeCreate() {

  },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
        .then(data => {
          for(let el of data){
            this.products.push(el);
          }
          this.filtered = this.products;
        });
    this.getJson(`${API + this.cartUrl}`)
        .then(data => {
          for(let el of data.contents){
            this.productsInCart.push(el);
          }
        });
  },
  beforeMount() {

  },
  mounted(){

  },
  beforeUpdate() {

  },
  updated() {

  },
  beforeDestroy() {

  },
  destroyed() {

  },
});
