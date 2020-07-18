<template>
  <v-layout>
    <v-container class="mb-6">
      <v-row>
        <v-col md="8" cols="12">
          <h2 class="checkout-title">
            Đơn hàng của bạn
          </h2>
          <v-divider></v-divider>
          <v-card class="mb-3" v-for="order in orders" :key="order._id">
            <v-card-text>
              <h3>Tổng giá: {{order.totalPrice | currency}}</h3>
              <p>Giao hàng: {{ order.estimatedDelivery}}</p>
              <v-row v-for="product in order.products" :key="product._id">
                <v-divider></v-divider>
                <v-col cols="2">
                  <v-img
                    class="white--text align-end"
                    :src="serverUrl + product.productId.productImage[0].path"
                  ></v-img>
                </v-col>
                <v-col cols="6">
                  <nuxt-link :to="/products/ + product.productId._id">{{
                    product.productId.name
                  }}</nuxt-link>
                  <p>Số lượng: {{ product.quantity }}</p>
                  <p>Gía: {{ product.price | currency }}</p>
                  <p v-if="product.productId.User">Người bán: {{ product.productId.User.userName }}</p>
                </v-col>
                <v-col cols="4"> </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="4" cols="12"> </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>
<script>
import { mapGetters } from "Vuex";
export default {
  data() {
    return {
      serverUrl: "http://localhost:8338/"
    };
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/orders/user");
      return {
        orders: response.products
      };
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
