<template>
  <!--MAIN-->
  <div id="addAddress">
    <v-main>
      <v-container>
        <h3>Địa chỉ của bạn</h3>
        <nuxt-link to="/profile/address/add">Thêm địa chỉ mới</nuxt-link>
        <v-alert type="warning" v-show="errMessage">
          {{ message }}
        </v-alert>
        <v-card
          width="800"
          class="mx-auto px-2 py-2 mb-3"
          v-for="(add, index) in address"
          :key="add._id"
        >
          <h3>
            {{ $auth.$state.user.userName }}
          </h3>
          <ul class="">
            <li v-if="add.apartment">Tòa nhà/Chung cư: {{ add.apartment }}</li>
            <li>
              Địa chỉ: {{ add.street }}, {{ add.district }}, {{ add.city }}
            </li>
            <li>Số điện thoại: {{ add.phoneNumber }}</li>
          </ul>
          <a class="mr-3" @click="onDeleteAddress(add._id, index)">Delete</a>
          <nuxt-link class="mr-3" :to="'/profile/address/' + (add._id)">Edit</nuxt-link>
          <a @click="onSetDefaultAddress(add._id)">Địa chỉ mặc định</a>
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
      errMessage: false,
    };
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/address");
      return {
        address: response.address
      };
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async onDeleteAddress(id, index) {
      try {
        let response = await this.$axios.$delete(`/api/address/${id}`);
        if (response.success) {
          this.message = "Delete success";
          this.address.splice(index, 1);
        }
      } catch (err) {
        this.message = err.message;
        console.log(err);
      }
    },
    async onSetDefaultAddress(id) {
      try {
        let response = await this.$axios.$put("/api/address/set/default", {
          id: id
        });
        if (response.success) {
          this.message = "Set default success";
          this.errMessage = true;
          await this.$auth.fetchUser();
        }
      } catch (err) {
        this.message = err.message;
        console.log(err);
      }
    }
  }
};
</script>
