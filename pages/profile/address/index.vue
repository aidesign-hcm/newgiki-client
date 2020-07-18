<template>
  <!--MAIN-->
  <div id="addAddress">
    <v-main>
      <v-container>
        <h3>Địa chỉ của bạn</h3>

        <v-alert type="warning" v-show="errMessage">
          {{ message }}
        </v-alert>
        <v-card width="800" class="mx-auto px-2 py-2 mb-3">
          <h3>
            user name:{{ $auth.$state.user.userName }}
          </h3>
          <div v-if="address">
            <ul class="">
              <li>
                Tên khách hàng: {{ address.name }}
              </li>
              <li v-if="address.apartment">
                Tòa nhà/Chung cư: {{ address.apartment }}
              </li>
              <li>
                Địa chỉ: {{ address.street }}, {{ address.district }},
                {{ address.city }}
              </li>
              <li>Số điện thoại: {{ address.phoneNumber }}</li>
            </ul>
            <nuxt-link class="mr-3" :to="'/profile/address/' + userId"
              >Edit</nuxt-link
            >
          </div>
          <div v-else>
            <nuxt-link to="/profile/address/add">Thêm địa chỉ mới</nuxt-link>
          </div>
        </v-card>
      </v-container>
    </v-main>
  </div>
  <!--/MAIN-->
</template>
<script>
export default {
  middleware: ["auth"],
  auth: true,
  data() {
    return {
      message: "",
      errMessage: false
    };
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/address");
      return {
        address: response.userInfo.address,
        userId: response.userInfo._id
      };
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
