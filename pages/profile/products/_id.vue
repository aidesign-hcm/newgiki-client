<template>
  <div id="add-new-product">
    <v-container>
      <v-card width="800" class="mx-auto px-2 py-2">
        <v-alert type="warning" v-show="errMessage">
          {{ message }}
        </v-alert>
        <v-form ref="onEditProduct" v-model="formValidity">
          <v-card-title>
            <h2 class="display-1">Edit Product</h2>
          </v-card-title>
          <addProduct :product="product" :categories="categories" />
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="info" @click="onAddProduct">Xác nhận</v-btn>
            <v-spacer />
            <v-btn color="success" @click="clear">Reset</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import addProduct from "~/components/ProfileControl/addProduct";
import { required, max } from "vee-validate/dist/rules";

export default {
  middleware: ["auth"],
  auth: true,
  async asyncData({ $axios, params }) {
    try {
      let categories = $axios.$get("/api/categories");
      let product = $axios.$get(`/api/products/${params.id}`);
      const [catResponse, productResponse] = await Promise.all([
        categories,
        product
      ]);
      return {
        categories: catResponse.categories,
        product: productResponse.product
      };
    } catch (error) {
      console.log(error);
    }
  },
  data: () => ({
    formValidity: false,
    message: "",
    errMessage: false
  }),

  methods: {
    async onAddProduct() {
      if (this.$refs.onEditProduct.validate()) {
        try {
          let data = new FormData();
          data.append("Category", this.product.Category);
          data.append("User", this.getUserName);
          data.append("name", this.product.name);
          data.append("price", this.product.price);
          data.append("desc", this.product.desc);
          data.append("StockQuantity", this.product.StockQuantity);
          for (let file of this.Product.productImage) {
            data.append("productImage", file, file.name);
          }
          let result = await this.$axios.$put(
            `/api/products/${this.$route.params.id}`,
            data
          );
          this.$router.push("/");
        } catch (err) {
          console.log(err);
          this.message = "Có lỗi trong lúc đăng sản phẩm";
          this.errMessage = true;
        }
      }
    },
    clear() {
      this.Product.name = "";
      this.Product.Category = null;
      this.Product.price = 0;
      this.Product.desc = "";
      this.Product.StockQuantity = 0;
      this.Product.productImage = [];
    }
  },
  computed: {
    getUserName() {
      var userName = this.$auth.$state.user._id;
      return userName;
    }
  },
  components: {
    addProduct
  }
};
</script>

<style></style>
