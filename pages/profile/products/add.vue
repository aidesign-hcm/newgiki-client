<template>
  <div id="add-new-product">
    <v-container>
      <v-card width="800" class="mx-auto px-2 py-2">
        <v-alert type="warning" v-show="errMessage">
                {{ message }}
              </v-alert>
          <v-form ref="addProduct" v-model="formValidity">
            <v-card-title>
              <h2 class="display-1">Add new Product</h2>
            </v-card-title>
            <addProduct 
            :product="Product"
            :categories="categories"
             />
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="info" :disabled="!formValidity" @click="onAddProduct">Xác nhận</v-btn>
              <v-spacer />
              <v-btn color="success" @click="clear">Reset</v-btn>
            </v-card-actions>
          </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// import { validationMixin } from "vuelidate";
// import { required, maxLength } from "vuelidate/lib/validators";
import addProduct from '~/components/ProfileControl/addProduct'
export default {
  middleware: ["auth"],
  auth: true,
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/categories");
      return {
        categories: response.categories
      };
      console.log(categories);
    } catch (error) {
      console.error(error);
    }
  },
  data: () => ({
    formValidity: false,
    message: "",
    errMessage: false,
    Product: {
      Category: null,
      user: null,
      name: "",
      price: 0,
      desc: "",
      StockQuantity: 0,
      productImage: []
    }
  }),

  methods: {
    async onAddProduct() {
      if (this.$refs.addProduct.validate()) {
        try {
          let data = new FormData();
          data.append("Category", this.Product.Category);
          data.append("User", this.getUserName);
          data.append("name", this.Product.name);
          data.append("price", this.Product.price);
          data.append("desc", this.Product.desc);
          data.append("StockQuantity", this.Product.StockQuantity);
          data.append("productImage", this.Product.productImage);
          let result = await this.$axios.$post("/api/products", data);
          this.$router.push("/profile/products");
        } catch (err) {
          this.message = "Có lỗi trong lúc đăng sản phẩm";
          this.errMessage = true;
          console.log(err);
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
  // components: {
  //   ValidationProvider,
  //   ValidationObserver
  // }
};
</script>

<style></style>
