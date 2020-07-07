<template>
  <v-layout column justify-center align-center>
    <v-container class="mb-6">
      <v-row>
        <productCard
          v-for="product in products"
          :product="product"
          :key="product.id"
        />
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import productCard from "~/components/ProductView/productCard.vue";

export default {

  data() {
    return {
      page: 1
    };
  },
  components: {
    productCard
  },
  watchQuery: ['name'],
  async asyncData({$axios, query}){
      try {
          let products =  await $axios.$post('/api/search', { name : query.name })
          
          return {
              products
          }
          console.log(products)
      } catch (err){
          console.log(err)
      }
  }

};
</script>
