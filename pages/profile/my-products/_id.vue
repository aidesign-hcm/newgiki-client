<template>
  <div id="add-new-product">
    <v-container>
      <v-card width="800" class="mx-auto px-2 py-2">
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-form>
            <v-card-title>
              <h2 class="display-1">Edit Product</h2>
            </v-card-title>
            <v-card-text>
              <h4><strong>Name</strong>: {{ $auth.$state.user.userName }}</h4>
              <ValidationProvider
                v-slot="{ errors }"
                name="Tiêu đề sản phẩm"
                rules="required"
              >
                <v-text-field
                  v-model="product.name"
                  type="text"
                  label="Tiêu đề sản phẩm"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Gía"
                rules="required"
              >
                <v-text-field
                  v-model="product.price"
                  type="number"
                  label="Giá sản phẩm"
                  :error-messages="errors"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Nội dung"
                rules="required"
              >
                <v-textarea
                  solo
                  v-model="product.desc"
                  label="Nội dung"
                  :error-messages="errors"
                ></v-textarea>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Danh mục"
                rules="required"
              >
                <v-select
                  item-text="type"
                  item-value="_id"
                  v-model="Category"
                  :items="categories"
                  :rules="[v => !!v || 'Item is required']"
                  label="Danh mục"
                  required
                  chips
                ></v-select>
              </ValidationProvider>
              <v-text-field
                v-model="product.StockQuantity"
                type="number"
                label="Số lượng"
              />
              <ValidationProvider
                v-slot="{ errors }"
                name="Hình Ảnh"
                rules="required"
              >
                <v-file-input
                  v-model="productImage"
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  chips
                  placeholder="Đăng hình ảnh sản phẩm"
                  prepend-icon="mdi-camera"
                  label="Ảnh sản phẩm"
                ></v-file-input>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="checkbox"
              >
                <v-checkbox
                  v-model="checkbox"
                  :error-messages="errors"
                  label="Option"
                  type="checkbox"
                  required
                ></v-checkbox>
              </ValidationProvider>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="info"
                @click="onAddProduct"
                >Xác nhận</v-btn
              >
              <v-spacer />
              <v-btn color="success" @click="clear">Reset</v-btn>
            </v-card-actions>
          </v-form>
        </ValidationObserver>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// import { validationMixin } from "vuelidate";
// import { required, maxLength } from "vuelidate/lib/validators";
import { required, max } from "vee-validate/dist/rules";

setInteractionMode("eager");
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode 
} from "vee-validate";

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

export default {
  middleware: ["auth"],
  auth: true,
  async asyncData({ $axios, params }) {
    try {
      let categories = $axios.$get("/api/categories");
      let product = $axios.$get(`/api/products/${params.id}`);
      const [ catResponse, productResponse] = await Promise.all([
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
    checkbox: null,
    rules: [
      value => !value || value.size < 2000000 || "Hình ảnh phải nhỏ hơn 2MB"
    ],
    Category: null,
    user: null,
    name: "",
    price: 0,
    desc: "",
    StockQuantity: 0,
    productImage: [],
  }),

  methods: {
    async onAddProduct() {
      this.$refs.observer.validate();
      try {
        let data = new FormData();
        data.append("Category", this.Category);
        data.append("User", this.getUserName);
        data.append("name", this.product.name);
        data.append("price", this.product.price);
        data.append("desc", this.product.desc);
        data.append("StockQuantity", this.product.StockQuantity);
        data.append("productImage", this.productImage);
        let result = await this.$axios.$put(`/api/products/${this.$route.params.id}`, data);
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        return err
      }
    },
    clear() {
      this.product.name = "";
      this.Category = null;
      this.checkbox = false;
      this.product.price = 0;
      this.product.desc = "";
      this.product.StockQuantity = 0;
      this.product.productImage = [];
      this.$refs.observer.reset();
    }
  },
  computed: {
    getUserName() {
      var userName = this.$auth.$state.user._id;
      return userName;
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  }
};
</script>

<style></style>
