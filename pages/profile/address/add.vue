<template>
  <div id="addaddress">
    <v-main>
      <v-container>
        <v-card width="800" class="mx-auto px-2 py-2">
          <v-form ref="onaddAdress" v-model="formValidity">
            <v-card-title>
              <h1 class="display-1">Tạo địa chỉ mới</h1>
            </v-card-title>
            <addAddress 
            :address="address"
            :cities="cities.data"
             />
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn :disabled="!formValidity" color="info" @click="onaddress"
                >Thêm</v-btn
              >
              <v-spacer />
              <v-btn color="success" @click="reset">Reset</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container></v-main
    >
  </div>
</template>
<script>
import addAddress from "~/components/ProfileControl/addAddress.vue";
export default {
  middleware: "auth",
  auth: true,
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/address/city");
      return {
        cities: response
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      formValidity: false,
      address: {
        name:"",
        street: "",
        apartment: "",
        district: "",
        phoneNumber: "",
        city:"Thành phố Hồ Chí Minh"
      }
    };
  },
  methods: {
    async onaddress() {
      if (this.$refs.onaddAdress.validate()) {
        try {
          let data = {
            name: this.address.name,
            street: this.address.street,
            apartment: this.address.apartment,
            district: this.address.district,
            city: this.address.city,
            phoneNumber: this.address.phoneNumber
          };
          let response = await this.$axios.$post("/api/address", data);
          if (response.success) {
            this.$router.push("/profile/address");
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    reset() {
      console.log("reset");
    }
  },
  components: {
    addAddress
  }
};
</script>
