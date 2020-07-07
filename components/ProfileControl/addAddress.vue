<template>
  <div>
    <v-card-text>
      <v-text-field
        v-model="Address.street"
        label="Địa chỉ"
        :rules="rules"
        required
        type="text"
      />
      <v-text-field
        v-model="Address.phoneNumber"
        label="Số điện thoại"
        required
        type="Number"
      />
      <v-text-field
        v-model="Address.apartment"
        label="Tên chung cư/ Số Tầng"
        type="text"
      />
      <v-select
        item-text="name"
        item-value="name"
        v-model="Address.city"
        :items="cities"
        label="Thành Phố"
        required
      ></v-select>
      <div v-for="ci in cities" :key="ci.level1_id">
        <v-select
          v-if="ci.name === Address.city"
          item-text="name"
          item-value="name"
          v-model="Address.district"
          :items="ci.level2s"
          label="Quận Huyện"
          required
        ></v-select>
      </div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: {
    Address: {
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
      rules: [v => v.length >= 5 || "Min 5 characters"]
    };
  }
};
</script>

<style></style>
