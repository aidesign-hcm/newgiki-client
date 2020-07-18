<template>
  <div>
    <v-card-text>
      <div v-if="$auth.$state.loggedIn">
        <v-text-field
        v-model="address.name"
        label="Họ và tên"
        required
        type="text"
        :placeholder="getUser.userName"
       />
      </div>
      <v-text-field v-else
        v-model="address.name"
        label="Họ và tên"
        :rules="rules"
        required
        type="text"
      />
      <v-text-field
        v-model="address.street"
        label="Địa chỉ"
        :rules="rules"
        required
        type="text"
      />
      <v-text-field
        v-model="address.phoneNumber"
        label="Số điện thoại"
        required
        type="Number"
      />
      <v-text-field
        v-model="address.apartment"
        label="Tên chung cư/ Số Tầng"
        type="text"
      />
      <v-select
        item-text="name"
        item-value="name"
        v-model="address.city"
        :items="cities"
        label="Thành Phố"
        required
        :rules="[v => !!v || 'Item is required']"
      ></v-select>
      <div v-for="(ci, i) in cities" :key="i">
        <v-select
          v-if="ci.name === address.city"
          item-text="name"
          item-value="name"
          v-model="address.district"
          :items="ci.level2s"
          label="Quận Huyện"
          required
          :rules="[v => !!v || 'Item is required']"
        ></v-select>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    address: {
      type: Object,
      required: false
    },
    cities: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      rules: [v => v.length >= 5 || "Min 5 characters"],
    };
  },
  computed: {
    ...mapGetters([
      "getUser"
    ])
  },
};
</script>

<style></style>
