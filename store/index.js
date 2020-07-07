export const state = () => ({
  cart: [],
  cartLength: 0,
  shippingPrice: 0,
  shippingEstimated: ""
});

export const actions = {
  addProductToCart({ state, commit }, product) {
    const cartProduct = state.cart.find(prod => prod._id === product._id);
    if (!cartProduct) {
      commit("PUSH_PRODUCT_TO_CART", product);
    } else {
      commit("INCREMENT_PRODUCT_QTY", cartProduct);
    }
    commit("INCREMENT_CART_LENGTH");
  }
};

export const mutations = {
  PUSH_PRODUCT_TO_CART(state, product) {
    (product.quantity = 1), state.cart.push(product);
  },
  INCREMENT_PRODUCT_QTY(state, product) {
    product.quantity++;
    let indexOfProduct = state.cart.indexOf(product);
    state.cart.splice(indexOfProduct, 1, product);
  },
  INCREMENT_CART_LENGTH(state) {
    state.cartLength = 0;
    if (state.cart.length > 0) {
      state.cart.map(product => {
        state.cartLength += product.quantity;
      });
    }
  },
  QTY_INCREMENT(state, product) {
    const cartProduct = state.cart.find(prod => prod._id === product._id); // 1. Find a product in the cart
    cartProduct.quantity++; // 2. Change the quantity of the product
    state.cartLength = 0;
    if (state.cart.length > 0) {
      state.cart.map(product => {
        state.cartLength += product.quantity;
      });
    } // 3. UPdate the length of the cart
    let indexOfProduct = state.cart.indexOf(product);
    state.cart.splice(indexOfProduct, 1, product); // 4. Update product price, some thing like that
  },
  QTY_DECREMENT(state, product) {
    const cartProduct = state.cart.find(prod => prod._id === product._id);
    if (cartProduct.quantity > 1) {
      cartProduct.quantity--;
      state.cartLength = 0;
      if (state.cart.length > 0) {
        state.cart.map(product => {
          state.cartLength += product.quantity;
        });
      }
      let indexOfProduct = state.cart.indexOf(product);
      state.cart.splice(indexOfProduct, 1, product);
    } else {
      alert("Số lượng phải lớn hơn 1");
    }
  },
  REMOVE_PRODUCT(state, product) {
    state.cartLength -= product.quantity; // 1. remove product quantity from the cartLength
    let indexOfProduct = state.cart.indexOf(product); // 2. get the ID product want to delete
    state.cart.splice(indexOfProduct, 1); // 3. remove that product using Spilce
  },
  SET_SHIPPING(state, { price, shippingEstimated }) {
    (state.shippingPrice = price),
      (state.shippingEstimated = shippingEstimated);
  },
  CLEAR_CART(state){
    state.cart = [];
    state.cartLength =  0;
    state.shippingPrice =  0;
    state.shippingEstimated = ""
  }
};

export const getters = {
  getCartlength(state) {
    return state.cartLength;
  },
  getCart(state) {
    return state.cart;
  },
  getCartTotal(state) {
    let total = 0;
    state.cart.map(product => {
      total += product.price * product.quantity;
    });
    return total;
  },
  getCartTotalWithShiping(state) {
    let total = 0;
    state.cart.map(product => {
      total += product.price * product.quantity;
    });
    return total + state.shippingPrice;
  },
  getEstimatedDelivery(state){
    return state.shippingEstimated
  }
};
