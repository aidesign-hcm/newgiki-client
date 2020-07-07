<template>
  <div>
    <v-container>
      <h1>Cảm ơn bạn vì đã mua hàng của chúng tôi</h1>
      <nuxt-link to="/products">Nhấn đây để tiếp tục mua hàng</nuxt-link>
      <p>Tổng giá: {{order.totalPrice}}</p>
              <p>Giao hàng: {{ order.estimatedDelivery }}</p>
      <v-row v-for="product in order.products" :key="product._id">
                <v-divider></v-divider>
                <v-col cols="2">
                  <v-img
                    class="white--text align-end"
                    :src="serverUrl + product.productId.productImage"
                  ></v-img>
                </v-col>
                <v-col cols="6">
                  <nuxt-link :to="/products/ + product.productId._id">{{
                    product.productId.name
                  }}</nuxt-link>
                  <p>Số lượng: {{ product.quantity }}</p>
                  <p>Gía: {{ product.price }}</p>
                  <p v-if="product.productId.User">Người bán: {{ product.productId.User.userName }}</p>
                </v-col>
                <v-col cols="4"> </v-col>
              </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
    async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(`/api/orders/checkout/${params.id}`);
      return {
        order: response.order
      };
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style></style>
