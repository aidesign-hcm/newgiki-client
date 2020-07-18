<template>
  <v-row >
    <v-col md="3" cols="12" v-for="(product, i) in products" :key="i">
      <v-card class="mx-auto" :elevation="0">
        <v-img
          class="white--text align-end"
          :src="serverUrl + product.productImage[0].path"
        >
        </v-img>

        <v-card-text class="text--primary">
          <h4>
            <nuxt-link :to="`/products/` + product._id">{{
              product.name
            }}</nuxt-link>
          </h4>
        </v-card-text>
        <v-card-actions>
          <a @click="onDeleteProduct(product._id, i)">Delete</a>
          <nuxt-link
            :to="`/profile/products/` + product._id"
            color="orange"
            text
          >
            Chỉnh sửa
          </nuxt-link>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    products: {
      type: Array
    }
  },
  methods: {
    onDeleteProduct(id, i) {
      this.$emit("onDeleteProduct", id, i);
    }
  },
  data() {
    return {
      serverUrl: "http://localhost:8338/"
    };
  }
};
</script>

<style></style>
