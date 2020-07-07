<template>
  <!--MAIN-->
  <div id="login">
    <v-main>
      <v-container>
        <v-row>
          <v-col md="8" cols="12">
            <h1>Địa chỉ giao hàng</h1>
            
            <div v-if="$auth.$state.loggedIn">
              <h3>
                {{ $auth.$state.user.userName }}
              </h3>
              <ul class="">
                <li v-if="$auth.$state.user.address.apartment">
                  Tòa nhà/Chung cư: {{ $auth.$state.user.address.apartment }}
                </li>
                <li>
                  Địa chỉ: {{ $auth.$state.user.address.street }},
                  {{ $auth.$state.user.address.district }},
                  {{ $auth.$state.user.address.city }}
                </li>
                <li>
                  Số điện thoại: {{ $auth.$state.user.address.phoneNumber }}
                </li>
              </ul>
            </div>
            <div v-else>
              <addAddress :Address="Address" :cities="cities.LtsItem" />
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
                  ></v-radio
                >
                <v-radio
                  @change="onChoosenShipping('fast')"
                  value="fast"
                  label="Giao hàng nhanh"
                  ></v-radio
                >
              </v-radio-group>
            </div>
          </v-col>
          <v-col md="4" cols="12">
            <v-row v-for="product in getCart" :key="product._id">
              <v-col cols="3">
                <v-img
                  class="white--text align-end"
                  :src="serverUrl + product.productImage"
                ></v-img>
              </v-col>
              <v-col cols="9">
                <nuxt-link
                  :to="/products/ + product._id"
                  class="a-link-normal a-size-medium a-text-bold"
                  >{{ product.name }}</nuxt-link
                >
                <p>Số lượng: {{ product.quantity }}</p>
              </v-col>
              <v-col cols="4"> </v-col>
            </v-row>
            <p>Số lượng ({{ getCartlength }} sản phẩm):</p>
            <p>${{ getCartTotal | currency }}</p>
            <p>Gía Ship: {{ shippingPrice | currency}}</p>
            <p>Tổng giá: {{ getCartTotalWithShiping | currency}}</p>
            <v-btn type="submit" @click="onPurchanse">Purchase</v-btn>
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

export default {
  async asyncData({ store, $axios }) {
    try {
      let getCities = $axios.$get("/api/address/city");
      let postShipment = $axios.$post("/api/shipment", { shipment: "normal" });
      let [cityResponse, shipmentResponse] = await Promise.all([
        getCities,
        postShipment
      ]);
      store.commit("SET_SHIPPING", {
        price: shipmentResponse.shipment.price,
        estimated: shipmentResponse.shipment.estimated
      });
      return {
        cities: cityResponse,
        shippingPrice: shipmentResponse.shipment.price,
        shippingEstimated: shipmentResponse.shipment.estimated
      };
    } catch (err) {
      console.log(err);
    }
  },

  data() {
    return {
      err: "",
      serverUrl: "http://localhost:8338/",
      radios: 'normal',
      Address: {
        street: "",
        apartment: "",
        district: "",
        phoneNumber: "",
        city: "Thành phố Hồ Chí Minh"
      }
    };
  },
  computed: {
    ...mapGetters([
      "getCartTotal",
      "getCartlength",
      "getCart",
      "getCartTotalWithShiping",
      "getEstimatedDelivery"
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
    async onPurchanse(){
        try {
          let response = await this.$axios.$post('/api/payment', {
            totalPrice: this.getCartTotalWithShiping,
            cart: this.getCart,
            estimatedDelivery: this.radios
          });
          if (response.success){
            // Do something here
            this.$store.commit('CLEAR_CART')
            this.$router.push('/checkout/' + response.order._id)
          }
        } catch(err){
          console.log(err)
        }
      }
  },
  components: {
    addAddress
  }
};
</script>

<style></style>
