<template>
  <v-layout column justify-center align-center>
    <v-container class="mb-6">
      <v-row v-if="count === 0"><p>Bạn không có sản phẩm nào</p></v-row>
      <v-row v-else>
        <listProduct
          v-for="product in products"
          :product="product"
          :key="product.id"
          @onDeleteProduct="onDeleteProduct"
        ></listProduct>
        <v-col cols="12" class="text-center">
          <v-pagination
            v-model="page"
            :length="getLength"
            total-visible="5"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import listProduct from "~/components/listProduct.vue";
export default {
  middleware: ["auth"],
  auth: true,
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/products/by-user");
      return {
        products: response.FoundProduct,
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
  methods: {
    async onDeleteProduct(id, index) {
      try {
        let response = await this.$axios.$delete(`/api/products/${id}`);
        if (response.success) {
          this.message = "Delete success";
          this.products.splice(index, 1);
        }
      } catch (err) {
        this.message = err.message;
        console.log(err);
      }
    }
  },
  computed: {
    filteredProducts: function(params) {
      var page = parseInt(params.page) || 1;
      var perPage = 8;
      var start = (page - 1) * perPage;
      var end = (page - 1) * perPage + perPage;
      var produtcList = _.orderBy(this.products, ["name"], ["desc"]);
      var productSLice = produtcList.slice(start, end);
      return productSLice;
    },
    getLength() {
      var getLength = Math.ceil(this.count / 5);
      return getLength;
    }
  },
  components: {
    listProduct
  }
};
</script>
