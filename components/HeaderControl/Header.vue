<template>
  <div>
    <v-app-bar color="white" elevate-on-scroll>
      <v-toolbar-title class="d-inline">
        <nuxt-link to="/" text>
          <v-img
            :src="require('~/assets/images/begiki-logo.svg')"
            class="mr-3 hidden-xs-only"
            contain
            max-width="120"
          />
        </nuxt-link>
      </v-toolbar-title>

      <Search />
      
      <v-spacer />
      <div class="hidden-sm-and-down mx-auto" optional>
        <v-btn
          v-for="i in links"
          :key="i.id"
          :to="i.url"
          :ripple="false"
          active-class="text--primary"
          class="font-weight-bold mx-2"
          text
        >
          {{ i.label }}
        </v-btn>
      </div>
      <v-spacer />
      <template v-if="$auth.$state.loggedIn">
        <a class="mx-4" @click="onLogout" text>Logout</a>
        <a @click.stop="drawer = !drawer">
          {{ $auth.$state.user.userName }}
        </a>
      </template>
      <template v-else>
        <nuxt-link class="mx-4" to="/login">Đăng nhập</nuxt-link>
        <nuxt-link class="mx-4" to="/signup">Đăng ký</nuxt-link>
      </template>
      <div class="menu-right">
        <nuxt-link to="/cart">
          <v-badge color="green" :content="getCartlength" overlap>
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </nuxt-link>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      v-if="$auth.$state.loggedIn"
    >
      <profileMenu />
    </v-navigation-drawer>
  </div>
</template>

<script>
import Search from '~/components/HeaderControl/search.vue'
import profileMenu from "~/components/HeaderControl/profileMenu.vue";
import { mapGetters } from "Vuex";
export default {
  data() {
    return {
      title: "Begiki",
      links: [
        {
          label: "Home",
          url: "/"
        },
        {
          label: "About",
          url: "/about-us"
        },
        {
          label: "Products",
          url: "/products"
        },
        {
          label: "Blog",
          url: "/blog"
        },
        {
          label: "Contact",
          url: "/contact"
        }
      ],
      drawer: null
    };
  },
  computed: {
    ...mapGetters(["getCartlength"])
  },
  methods: {
    async onLogout() {
      await this.$auth.logout();
    }
  },
  components: {
    profileMenu,
    Search
  }
};
</script>

<style></style>
