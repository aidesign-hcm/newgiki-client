<template>
  <div>
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="serverUrl + $auth.$state.user.avatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{$auth.$state.user.userName}}</v-list-item-title>
        <v-list-item-title>{{$auth.$state.user.email}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.label" link>
          <nuxt-link :to="item.url">
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </nuxt-link>
      </v-list-item>
    </v-list>
    <a @click="onLogout">Thoát</a>
  </div>
</template>

<script>
export default {
    middleware: ['auth'],
    auth: true,
    data () {
      return {
        serverUrl: "http://localhost:8338/",
        drawer: null,
        items: [
          { label: 'Profile', url: '/profile/' },
          { label: 'My products', url: '/profile/products' },
          { label: 'Add Product', url: '/profile/products/add' },
          { label: 'Address', url: '/profile/address' },
          { label: 'Oders', url: '/profile/orders' },
        ],
      }
    },
    methods: {
        async onLogout() {
            await this.$auth.logout()
        }
    }
};
</script>

<style></style>
