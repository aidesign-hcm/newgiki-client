<template>
  <v-col md="3" cols="12">
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      type="card"
      v-if="loading == true"
      :loading="loading"
      transition="fade-transition"
    ></v-skeleton-loader>
    <v-fade-transition mode="out-in">
      <v-card v-show="loaded" transition="fade-transition" class="mx-auto">
        <v-img
          class="white--text align-end"
          :src="serverUrl + product.productImage[0].path"
        >
        </v-img>
        <v-card-text class="text--primary">
          <h2>
            <nuxt-link v-if="product._id" :to="/products/ + product._id">{{
              product.name
            }}</nuxt-link>
            <nuxt-link v-else :to="/products/ + product.objectID">{{
              product.name
            }}</nuxt-link>
          </h2>
          <small>{{ product.date | date }}</small>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" text> Price: {{ product.price | currency }} </v-btn>
          <v-btn :to="/products/ + product._id" color="orange" text>
            Read More
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-fade-transition>
  </v-col>
</template>

<script>
export default {
  name: "productCard",
  props: {
    product: {
      type: Object
    }
  },
  data() {
    return {
      serverUrl: "http://localhost:8338/",
      loading: true,
      loaded: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$nuxt.$loading.start()) {
        this.loading = false;
        this.loaded = true;
      }
    });
  }
};
</script>

<style></style>
