<template>
  <v-layout column justify-center align-center>
    <v-container class="mb-6">
      <v-row>
        <v-col md="5" cols="12">
          <v-carousel
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-carousel-item v-for="(img, i) in product.productImage" :key="i">
              <v-img
                class="white--text align-end"
                :src="serverUrl + img.path"
              />
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col md="4" cols="12">
          <h2 class="title">{{ product.name }}</h2>
          <p v-if="product.User" class="description">
            {{ product.User.userName }}
          </p>
          <p class="description">{{ product.desc }}</p>
          <h4>Price: {{ (product.price * quantity) | currency }} VNĐ</h4>
        </v-col>

        <v-col md="3" cols="12">
          <div v-if="product.attribute">
            <v-form ref="verify" v-model="formValidity">
              <div v-for="(termsOf, i) in product.attribute" :key="i">
              <v-radio-group
                required
                :rules="[v => !!v || 'You must select option before add cart!']"
                row
                v-model="term"
              >
                <div v-for="(te, i) in termsOf.terms" :key="i">
                  <v-radio :label="te.name" :value="te.name" />
                </div>
              </v-radio-group>
              </div>
            </v-form>
            {{ product.attribute.name }} {{ term }}
          </div>
          <v-row justify="space-around">
            <v-icon @click="quantity--" :disabled="quantity < 2"
              >mdi-minus</v-icon
            >
            {{ quantity }}
            <v-icon @click="quantity++">mdi-plus</v-icon>
          </v-row>

          <v-btn
            :disabled="!formValidity"
            type="submit"
            color="second"
            @click="addProductToCart({ product, quantity, term })"
            >Add to cart</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { mapActions } from "Vuex";
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
  data() {
    return {
      serverUrl: "http://localhost:8338/",
      quantity: 1,
      term: null,
      formValidity: true
    };
  },
  methods: {
    ...mapActions(["addProductToCart"])
  },
  computed: {
    increPrice() {
      this.product.price * this.quantity;
    }
  }
};
</script>

<style></style>
