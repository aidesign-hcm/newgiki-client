<template>
  <div id="add-new-product">
    <v-container>
      <v-card width="800" class="mx-auto px-2 py-2">
        <!-- <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-form>
            <v-card-title>
              <h2 class="display-1">Add new Product</h2>
            </v-card-title>
            <v-card-text>
              <h4><strong>Name</strong>: {{ $auth.$state.user.userName }}</h4>
              <ValidationProvider
                v-slot="{ errors }"
                name="Tiêu đề sản phẩm"
                rules="required"
              >
                <v-text-field
                  v-model="name"
                  type="text"
                  label="Tiêu đề sản phẩm"
                  :error-messages="errors"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Gía"
                rules="required"
              >
                <v-text-field
                  v-model="price"
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
                  v-model="desc"
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
                  :error-messages="errors"
                ></v-select>
              </ValidationProvider>
              <v-text-field
                v-model="StockQuantity"
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
                  accept="image/png, image/jpeg, image/bmp"
                  chips
                  value=""
                  :rules="rules"
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
                  label="Đồng ý với điều khoản"
                  type="checkbox"
                  required
                ></v-checkbox>
              </ValidationProvider>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="info" @click="onAddProduct">Xác nhận</v-btn>
              <v-spacer />
              <v-btn color="success" @click="clear">Reset</v-btn>
            </v-card-actions>
          </v-form>
        </ValidationObserver> -->
      </v-card>
    </v-container>
  </div>
</template>

<script>
// import { validationMixin } from "vuelidate";
// import { required, maxLength } from "vuelidate/lib/validators";

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
    productImage: []
  }),

  methods: {
    async onAddProduct() {
      if (this.$refs.observer.validate()) {
        try {
          let data = new FormData();
          data.append("Category", this.Category);
          data.append("User", this.getUserName);
          data.append("name", this.name);
          data.append("price", this.price);
          data.append("desc", this.desc);
          data.append("StockQuantity", this.StockQuantity);
          data.append("productImage", this.productImage);
          let result = await this.$axios.$post("/api/products", data);
          this.$router.push("/profile/my-products");
        } catch (err) {
          console.log(err);
        }
      }
    },
    clear() {
      this.checkbox = null;
      this.name = "";
      this.Category = null;
      this.price = 0;
      this.desc = "";
      this.StockQuantity = 0;
      this.productImage = [];
      this.$refs.observer.reset();
    }
  },
  computed: {
    getUserName() {
      var userName = this.$auth.$state.user._id;
      return userName;
    }
  },
  // components: {
  //   ValidationProvider,
  //   ValidationObserver
  // }
};
</script>

<style></style>
