<template>
  <div id="addAddress">
    <v-main>
      <v-container>
        <v-card width="800" class="mx-auto px-2 py-2">
          <v-form ref="onEditAddress" v-model="formValidity">
            <v-card-title>
              <h1 class="display-1">Chính sửa địa chỉ</h1>
            </v-card-title>
            <addAddress 
            :address="address"
            :cities="cities.data" />
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                :disabled="!formValidity"
                color="info"
                @click="onUpdateAddress"
                >Xác nhận</v-btn
              >
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
  data() {
    return {
      formValidity: false,
     
    };
  },
  // async asyncData({ $axios, params }) {
  //   try {
  //     let response = await $axios.$get(`/api/address/${params.id}`);
  //     return {
  //       address: response.address
  //     };
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  async asyncData({$axios, params}) {
        try {
        let response = $axios.$get("/api/address/city");
        let singleAddress= $axios.$get(`/api/address/`)
        let [citiesResponse, addressResponse] = await Promise.all([
            response,
            singleAddress
        ])
        return {
            cities: citiesResponse,
            address: addressResponse.userInfo.address,
        }
        } catch (err){
            console.log(err);
        }
    },
  methods: {
    async onUpdateAddress() {
      if (this.$refs.onEditAddress.validate()) {
        try {
          let data = {
            name: this.address.name,
            street: this.address.street,
            apartment: this.address.apartment,
            district: this.address.district,
            city: this.address.city,
            phoneNumber: this.address.phoneNumber
          };
          let response = await this.$axios.$put(
            `/api/address/${this.$route.params.id}`,
            data
          );
          if (response.success) {
               await this.$router.push("/profile/address");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  },
  components: {
    addAddress
  }
};
</script>
