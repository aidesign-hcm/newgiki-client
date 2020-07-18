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
            :attributes="attributes"
          />

          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="info" :disabled="!formValidity" @click="onAddProduct"
              >Xác nhận</v-btn
            >
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
export default {
  middleware: ["auth"],
  auth: true,

  data: () => ({
    formValidity: false,
    message: "",
    errMessage: false,
    Product: {
      useAtribute: false,
      Category: null,
      user: null,
      attribute: [],
      name: "",
      price: 0,
      desc: "",
      StockQuantity: 0,
      productImage: []
    }
  }),
  async asyncData({ $axios }) {
    try {
      let getCat = $axios.$get("/api/categories");
      let getAttr = $axios.$get("/api/attributes");
      const [catResponse, attrResponse] = await Promise.all([getCat, getAttr]);
      return {
        categories: catResponse.categories,
        attributes: attrResponse.attributes
      };
      console.log(categories);
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    async onAddProduct() {
      if (this.$refs.addProduct.validate()) {
        try {
          let data = new FormData();
          data.append("Category", this.Product.Category);
          data.append("attribute", this.Product.attribute);
          data.append("User", this.getUserName);
          data.append("name", this.Product.name);
          data.append("price", this.Product.price);
          data.append("desc", this.Product.desc);
          data.append("StockQuantity", this.Product.StockQuantity);
          for (let file of this.Product.productImage) {
            data.append("productImage", file, file.name);
          }

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
      this.Product.attribute = null;
      (this.Product.terms = null), (this.Product.name = "");
      this.Product.Category = null;
      this.Product.price = 0;
      this.Product.desc = "";
      this.Product.StockQuantity = 0;
      this.Product.productImage = null;
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
