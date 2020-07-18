<template>
    <v-layout>
      <v-container class="mb-6">
        <v-row>
          <v-col md="8" cols="12">
            <h2 class="checkout-title">
              Giỏ Hàng Của Bạn
              <span class="text-h5">{{ getCartlength }} mặt hàng</span>
            </h2>
            <v-divider></v-divider>
            <v-row v-for="product in getCart" :key="product._id">
              <v-divider></v-divider>
              <v-col cols="2">
                <v-img
                  class="white--text align-end"
                  :src="serverUrl + product.productImage[0].path"
                ></v-img>
              </v-col>
              <v-col cols="6">
                <nuxt-link
                  :to="/products/ + product._id"
                  class="a-link-normal a-size-medium a-text-bold"
                  >{{ product.name }}</nuxt-link
                >
                <div v-if="product.term">{{product.attribute.name}}: {{product.term}}</div>
                <v-row justify="space-around">
                  <v-icon @click="qtyDecrement(product)">mdi-minus</v-icon>
                  {{ product.quantity }}
                  <v-icon @click="qtyIncrement(product)">mdi-plus</v-icon>
                </v-row>
                <span class="a-size-small">
                  <a @click="$store.commit('REMOVE_PRODUCT', product)">Delete</a>
                </span>
              </v-col>
              <v-col cols="4"> </v-col>
            </v-row>
          </v-col>
          <v-col md="4" cols="12">
                <p>Subtotal ({{ getCartlength }} item):</p>
                <p>${{ getCartTotal | currency}}</p>
                <nuxt-link  to="/checkout" color="white">Thanh toán</nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
</template>
<script>
import { mapGetters } from "Vuex";
export default {
  data() {
    return {
      model: 0,
      serverUrl: "http://localhost:8338/"
    };
  },
  computed: {
    ...mapGetters(["getCart", "getCartTotal", "getCartlength"]),
  },
  methods: {
    qtyIncrement(product){
      this.$store.commit('QTY_INCREMENT', product)
    },
    qtyDecrement(product){
      this.$store.commit('QTY_DECREMENT', product)
    },
  }
};
</script>
