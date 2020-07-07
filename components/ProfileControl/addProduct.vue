<template>
  <div>
    <v-card-text>
      <h4><strong>Name</strong>: {{ $auth.$state.user.userName }}</h4>
      <v-text-field
        v-model="product.name"
        type="text"
        label="Tiêu đề sản phẩm"
        :rules="rules"
        required
      />
      <v-text-field
        v-model="product.price"
        type="number"
        label="Giá sản phẩm"
        :rules="numberRule"
        required
      />
      <v-textarea
        solo
        v-model="product.desc"
        label="Nội dung"
        :rules="rules"
        required
      ></v-textarea>
      <v-select
        item-text="type"
        item-value="_id"
        v-model="product.Category"
        :items="categories"
        :rules="[v => !!v || 'Item is required']"
        label="Danh mục"
        required
      ></v-select>
      <v-text-field
        v-model="product.StockQuantity"
        type="number"
        :rules="numberRule"
        label="Số lượng"
      />
      <v-file-input
        v-model="product.productImage"
        accept="image/png, image/jpeg, image/bmp"
        chips
        value=""
        :rules="imgRules"
        prepend-icon="mdi-camera"
        label="Ảnh sản phẩm"
      ></v-file-input>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: false
    },
    categories: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      rules: [v => v.length >= 5 || "Min 5 characters"],
      imgRules: [
        value => !value || value.size < 2000000 || "Hình ảnh phải nhỏ hơn 2MB"
      ],
      numberRule: [
      v => !!v || "Bắt buộc điề gía",
      v => v >= 0 || "Giá tiền không được âm"
    ],
    };
  }
};
</script>

<style></style>
