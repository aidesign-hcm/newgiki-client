<template>
 <v-layout column justify-center align-center>
    <v-container class="mb-6">
      <h3 class="title">Freature Product</h3>
      <v-row>
        <productCard 
        v-for="product in filteredProducts"
        :product="product" 
        :key="product.id"  />
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import productCard from "~/components/ProductView/productCard.vue";

export default {
  async asyncData({$axios}){
    try {
      let response = await $axios.$get('/api/products')
      return {
        products: response.products
      }
      console.log(products)
    } catch(err) {
      console.log(err)
    }
  },
  components: {
    productCard
  },
  computed: {
  filteredProducts() {
    return _.orderBy(this.products, ['name'], ['desc'])
  }
}
}
</script>
