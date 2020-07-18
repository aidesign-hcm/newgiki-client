<template>
  <!--MAIN-->
  <div id="login">
    <v-main>
      <v-container>
        <v-row>
          <v-col md="8" cols="12">
            <h1>Địa chỉ giao hàng</h1>
            <div v-if="$auth.$state.loggedIn">
              <!-- Login và có địa chỉ giao hàng -->
              <div  v-if="address" class="">
                <v-form ref="purchange" v-model="formValidity">
                  <userAddress :address="address" />
                </v-form>
                <!-- Giao hàng tới địa chỉ khác -->
                <v-switch
                  v-model="anotherAdd"
                  label="Giao hàng tới địa chỉ khác"
                ></v-switch>
                <div v-show="anotherAdd">
                  <v-form ref="purchange">
                    <addAddress :address="receiveAdd" :cities="cities.data" />
                  </v-form>
                </div>
              </div>
              <!-- Login chưa có địa chỉ-->
              <div v-else>
                <nuxt-link to="/profile/address/add">Thêm địa chỉ</nuxt-link>
                <v-form ref="purchange" v-model="formValidity">
                  <addAddress :address="receiveAdd" :cities="cities.data" />
                </v-form>
              </div>
            </div>
            <!-- Chưa login -->
            <div v-else>
              <div>
                <a href="/login">đăng nhập</a> / <a href="/login">đăng ký</a>
              </div>
              <v-form ref="purchange" v-model="formValidity">
                <addAddress :address="receiveAdd" :cities="cities.data" />
              </v-form>
            </div>

            <div class="">
              Dự kiến giao hàng vào ngày: {{ shippingEstimated }}
            </div>
            <div>
              <!-- Shipping normal -->
              <v-radio-group v-model="radios">
                <v-radio
                  @change="onChoosenShipping('normal')"
                  value="normal"
                  label="Giao hàng thường"
                ></v-radio>
                <v-radio
                  @change="onChoosenShipping('fast')"
                  value="fast"
                  label="Giao hàng nhanh"
                ></v-radio>
              </v-radio-group>
            </div>
          </v-col>
          <v-col md="4" cols="12">
            <v-row v-for="product in getCart" :key="product._id">
              <v-col cols="3">
                <v-img
                  class="white--text align-end"
                  :src="serverUrl + product.productImage[0].path"
                ></v-img>
              </v-col>
              <v-col cols="9">
                <nuxt-link
                  :to="/products/ + product._id"
                  class="a-link-normal a-size-medium a-text-bold"
                  >{{ product.name }}</nuxt-link
                >
                <div v-if="product.term">{{product.attribute.name}}: {{product.term}}</div>
                <p>Số lượng: {{ product.quantity }}</p>
              </v-col>
              <v-col cols="4"> </v-col>
            </v-row>
            <p>Số lượng ({{ getCartlength }} sản phẩm):</p>
            <p>{{ getCartTotal | currency }}</p>
            <p>Gía Ship: {{ shippingPrice | currency }}</p>
            <p>Tổng giá: {{ getCartTotalWithShiping | currency }}</p>
            <v-checkbox
              label="Agree to terms & conditions"
              v-model="agreeToTerms"
              :rules="agreeToTermsRules"
              required
            ></v-checkbox>
            <!-- Đã đăng nhập -->
            <v-btn
              v-if="$auth.$state.loggedIn"
              :disabled="!formValidity"
              color="primary"
              @click="onPurchanse"
              >Purchase</v-btn
            >
            <!-- Chưa đăng nhập -->
            <v-btn
              v-else
              :disabled="!formValidity"
              color="primary"
              @click="onCustomerPurchanse"
              >Purchase</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
  <!--/MAIN-->
</template>

<script>
import { mapGetters } from "vuex";
import addAddress from "~/components/ProfileControl/addAddress.vue";
import userAddress from "~/components/ProfileControl/userAddress.vue";

export default {
  async asyncData({ store, $axios }) {
    try {
      let getCities = $axios.$get("/api/address/city");
      let postShipment = $axios.$post("/api/shipment", { shipment: "normal" });
      let getUserAddress = $axios.$get("/api/address");
      let [
        cityResponse,
        shipmentResponse,
        addressResponse
      ] = await Promise.all([getCities, postShipment, getUserAddress]);
      store.commit("SET_SHIPPING", {
        price: shipmentResponse.shipment.price,
        estimated: shipmentResponse.shipment.estimated
      });
      return {
        cities: cityResponse,
        shippingPrice: shipmentResponse.shipment.price,
        shippingEstimated: shipmentResponse.shipment.estimated,
        address: addressResponse.userInfo.address
      };
    } catch (err) {
      console.log(err);
    }
  },

  data() {
    return {
      formValidity: false,
      err: "",
      dialog: true,
      showWhenAddressAdd: false,
      anotherAdd: false,
      serverUrl: "http://localhost:8338/",
      radios: "normal",

      receiveAdd: {
        name: "",
        street: "",
        apartment: "",
        district: "",
        phoneNumber: "",
        city: "Thành phố Hồ Chí Minh"
      },
      agreeToTerms: false,
      agreeToTermsRules: [
        value =>
          !!value ||
          "You must agree to the terms and conditions to sign up for an account."
      ]
    };
  },
  computed: {
    ...mapGetters([
      "getCartTotal",
      "getCartlength",
      "getCart",
      "getCartTotalWithShiping",
      "getEstimatedDelivery",
      "getUser"
    ])
  },
  methods: {
    async onChoosenShipping(shipment) {
      try {
        let response = await this.$axios.$post("/api/shipment", {
          shipment: shipment
        });
        this.$store.commit("SET_SHIPPING", {
          price: response.shipment.price,
          shippingEstimated: response.shipment.estimated
        });
        (this.shippingPrice = response.shipment.price),
          (this.shippingEstimated = response.shipment.estimated);
      } catch (err) {
        console.log(err);
      }
    },
    async onPurchanse() {
      try {
        let response = await this.$axios.$post("/api/payment", {
          totalPrice: this.getCartTotalWithShiping,
          cart: this.getCart,
          estimatedDelivery: this.radios,
          receiveAdd: this.receiveAdd
        });
        if (response.success) {
          // Do something here
          this.$store.commit("CLEAR_CART");
          this.$router.push("/checkout/" + response.order._id);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async onCustomerPurchanse() {
      try {
        let response = await this.$axios.$post("/api/payment/customer", {
          totalPrice: this.getCartTotalWithShiping,
          cart: this.getCart,
          estimatedDelivery: this.radios,
          receiveAdd: this.receiveAdd
        });
        if (response.success) {
          // Do something here
          this.$store.commit("CLEAR_CART");
          this.$router.push("/checkout/" + response.order._id);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  components: {
    addAddress,
    userAddress
  }
};
</script>

<style></style>
