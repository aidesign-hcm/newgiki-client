<template>
  <v-col md="3" cols="12">
    <v-card class="mx-auto" :elevation="0">
      <v-img
        class="white--text align-end"
        :src="serverUrl + product.productImage"
      >
      </v-img>

      <v-card-text class="text--primary">
        <h4><nuxt-link :to="`/products/` + (product._id)" >{{product.name}}</nuxt-link></h4>
      </v-card-text>
      <v-card-actions>
        <a @click="onDeleteProduct(product._id)">Delete</a>
        <nuxt-link :to="`/profile/my-products/` + (product._id)" color="orange" text>
            Chỉnh sửa
        </nuxt-link>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
    props: {
    product: {
        type: Object,
      }
    },
    methods: {
    onDeleteProduct(id, index){
      this.$emit('onDeleteProduct', id, index)
    }
  },
    data(){
      return {
        serverUrl: 'http://localhost:8338/'
      }
    }
};
</script>

<style></style>
