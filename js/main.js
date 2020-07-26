const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function getRequest(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject(xhr.statusText);
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send();
  });
}

getRequest(`${API}/catalogData.json`)
  .then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  });

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    // this.#fetchProducts();
    this.getProducts()
      .then((data) => {
        this.goods = [...data];
        this.render();
        this.addEventListeners();
      });

  }

  async getProducts() {
    try {
      const result = await fetch(`${API}/catalogData.json`);
      return await result.json();
    }
    catch (error) {
      console.log('Error!', error);
    }
  }
  calcSum() {
    return this.goods.reduce((sum, { price }) => sum + price, 0);
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  addEventListeners() {
    const buttons = document.querySelectorAll('.buy-btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const index = list.goods.findIndex(item => {
          return item.id_product == button.parentElement.parentElement.dataset.id;
        })
        cart.addToCart(index);
      })
    })
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id_product}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.product_name}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

class Cart {
  constructor(container = '.cart') {
    this.container = container;
    this.goods = [];
    this.getByCart('getBasket.json')
      .then((data) => {
        this.amount = data.amount;
        this.countGoods = data.countGoods;
        this.goods = [...data.contents];
        this.render();
        this.addEventListeners();
      });
  }

  async getByCart(adress) {
    try {
      const result = await fetch(`${API}/${adress}`);
      return await result.json();
    }
    catch (error) {
      console.log('Error!', error);
    }
  }

  addToCart(id) {
    this.getByCart('addToBasket.json')
      .then(data => {
        if (data.result == 1) {
          const block = document.querySelector(this.container);
          const index = this.goods.findIndex(item => {
            return item.id_product == list.goods[id].id_product;
          })
          if (index != -1) {
            this.goods[index].quantity++;
          } else {
            this.goods.push(list.goods[id]);
            this.goods[this.goods.length - 1].quantity = 1;
          }
          this.clear();
          this.render();
          this.addEventListeners();
        }
      });
  }

  deleteFromCart(id) {
    this.getByCart('addToBasket.json')
      .then(data => {
        if (data.result == 1) {
          const block = document.querySelector(this.container);
          const index = this.goods.findIndex(item => {
            return item.id_product == list.goods[id].id_product;
          })
          if (this.goods[index].quantity > 1) {
            this.goods[index].quantity--;
          } else {
            this.goods.splice(index, 1);
          }
          this.clear();
          this.render();
          this.addEventListeners();
        }
      });
  }

  clear() {
    document.querySelector(this.container).innerHTML = '';
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new CartItem(product);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  addEventListeners() {
    const buttons = document.querySelectorAll('.dlt-btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const index = list.goods.findIndex(item => {
          return item.id_product == button.parentElement.dataset.id;
        })
        console.log(index);
        cart.deleteFromCart(index);
      });
    });
  }
}

class CartItem {
  constructor(product) {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.quantity = product.quantity;
  }

  render() {
    return `<div class="cart-item" data-id="${this.id_product}">
              <div>${this.product_name}</div>
              <div>${this.price} \u20bd</div>
              <div>${this.quantity} шт.</div>
              <button class="dlt-btn" type="button">Удалить</button>
            </div>`;
  }
}


const list = new ProductList();
const cart = new Cart();

document.querySelector('.btn-cart').addEventListener('click', () => {
  const cart = document.querySelector('.cart');
  if (cart.classList.contains('hidden')) {
    cart.classList.remove('hidden');
  }
  else {
    cart.classList.add('hidden');
  }
});
