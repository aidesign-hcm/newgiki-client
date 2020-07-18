<template>
  <div>
    <v-card-text>
      <h4><strong>Name</strong>: {{ $auth.$state.user.userName }}</h4>
      <v-text-field
        v-model="product.name"
        type="Text"
        label="Tiêu đề sản phẩm"
        :rules="rules"
        required
      />
      <v-text-field
        v-model="product.price"
        type="Number"
        label="Giá sản phẩm"
        :rules="numberRule"
        required
      />
      <p>{{ product.price | currency }}</p>
      <v-textarea
        solo
        v-model="product.desc"
        label="Nội dung"
        :rules="rules"
        required
      ></v-textarea>
      <v-autocomplete
        item-text="name"
        item-value="_id"
        v-model="product.Category"
        :items="categories"
        :rules="[v => !!v || 'Item is required']"
        label="Danh mục"
        required
      >
        <template v-slot:selection="data">
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
          <v-list-item-subtitle
            ><span v-for="(a, i) in data.item.ancestors" :key="i">
              <v-icon>mdi-chevron-right</v-icon> {{ a.name }}
            </span></v-list-item-subtitle
          >
        </template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
              <v-list-item-subtitle
                ><span v-for="(a, i) in data.item.ancestors" :key="i">
                  <v-icon>mdi-chevron-right</v-icon> {{ a.name }}
                </span></v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
     
      <v-text-field
        v-model="product.StockQuantity"
        type="number"
        :rules="numberRule"
        label="Số lượng"
      />
      <!-- <v-file-input
        v-model="product.productImage"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an avatar"
        prepend-icon="mdi-camera"
        label="Ảnh sản phẩm"
        multiple
        counter
        clearable
        :show-size="1000"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip
            v-if="index < 2"
            color="deep-purple accent-4"
            dark
            label
            small
          >
            {{ text }}
          </v-chip>
          <span
            v-else-if="index === 2"
            class="overline grey--text text--darken-3 mx-2"
          >
            +{{ product.productImage.length - 2 }} File(s)
          </span>
        </template>
      </v-file-input> -->
      <div>
       <v-switch v-model="product.useAtribute" label="Sử dụng Tùy chọn"></v-switch>
      {{product.attribute}}
      <div v-if="product.useAtribute">
        <v-autocomplete
          item-text="name"
          item-value="_id"
          v-model="product.attribute"
          :items="attributes"
          label="Attributes"
          deletable-chips
          chips
        >
        <template v-slot:selection="data">
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
          <v-list-item-subtitle
                ><span v-for="(a, i) in data.item.terms" :key="i">
                  {{ a.name }}
                </span></v-list-item-subtitle
              >
        </template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
              <v-list-item-subtitle
                ><span v-for="(a, i) in data.item.terms" :key="i">
                </span></v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </template>
        </v-autocomplete>
      </div>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    product: {
      type: Object,
      required: false
    },
    categories: {
      type: Array,
      required: false
    },
    attributes: {
      type: Array,
      required: false
    },
    
  },
  data() {
    return {
      rules: [v => v.length >= 5 || "Min 5 characters"],
      imgRules: [
        value => !value || value.size < 2000000 || "Hình ảnh phải nhỏ hơn 2MB"
      ],
      numberRule: [
        v => !!v || "Bắt buộc đề gía",
        v => v >= 0 || "Giá tiền không được âm"
      ]
    };
  }
};
</script>

<style></style>
