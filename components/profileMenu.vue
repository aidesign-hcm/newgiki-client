<template>
  <div>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
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
        drawer: null,
        items: [
          { label: 'Profile', url: '/profile/' },
          { label: 'My products', url: '/profile/my-products' },
          { label: 'Add Product', url: '/profile/add-product' },
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
