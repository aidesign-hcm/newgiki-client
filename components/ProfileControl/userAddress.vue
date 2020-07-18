<template>
  <div>
      <ul>
        <li>Họ và tên: {{ address.name }}</li>
        <li v-if="address.apartment">
          Tòa nhà/Chung cư: {{ address.apartment }}
        </li>
        <li>
          Địa chỉ: {{ address.street }}, {{ address.district }},
          {{ address.city }}
        </li>
        <li>Số điện thoại: {{ address.phoneNumber }}</li>
      </ul>
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
    anotherAddress: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
    openAnotherAddress(){
      this.anotherAddress = true
    }
  }
};
</script>

<style></style>
