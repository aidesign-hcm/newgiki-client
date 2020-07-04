<template>
  <v-layout column justify-center align-center>
    <v-container class="mb-6">
      <v-row>
        <productCard
          v-for="product in filteredProducts"
          :product="product"
          :key="product.id"
        />
      </v-row>
      <div class="text-center">
        <v-pagination v-model="page" :length="getLength" total-visible=5 ></v-pagination>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import productCard from "~/components/productCard.vue";

export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/products");
      return {
        products: response.products,
        count: response.count
      };
      console.log(products);
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      page: 1
    };
  },
  components: {
    productCard
  },
  computed: {
    filteredProducts: function(params) {
      var page = parseInt(params.page) || 1;
      var perPage = 5;
      var start = (page - 1) * perPage;
      var end = (page - 1) * perPage + perPage
      var produtcList = _.orderBy(this.products, ['name'], ['desc'])
      var productSLice = produtcList.slice(start, end);
      return productSLice;
    },
  getLength(){
    var getLength =  Math.ceil(this.count/5)
    return getLength
  }
  }

};
</script>
