<template>
  <v-layout column justify-center align-center>
    <v-container class="mb-6">
      <v-row>
        <v-col md="5" cols="12">
          <v-img class="white--text align-end" :src="serverUrl + product.productImage" />
        </v-col>
        <v-col md="4" cols="12">
          <h2 class="title">{{ product.name }}</h2>
          <p v-if="product.User" class="description">{{ product.User.userName }}</p>
          <p class="description">{{ product.desc }}</p>
          <h4>Price: {{ product.price }} VNĐ</h4>
        </v-col>
        <v-col md="3" cols="12">
          <v-btn type="submit" color="second" @click="addProductToCart(product)">Add to cart</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import {mapActions} from "Vuex"
export default {
  async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(`/api/products/${params.id}`);
      return {
        product: response.product
      };
    } catch (error) {
      console.log(error);
    }
  },
  data(){
      return {
        serverUrl: 'http://localhost:8338/'
      }
  },
  methods: {
    ...mapActions(["addProductToCart"])
  }
};
</script>

<style></style>
