<template>
  <v-app light>
    <Header />
    <v-main>
      <v-divider></v-divider>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Header from "~/components/HeaderControl/Header.vue";
export default {
  data() {
    return {
     
    };
  },
  components:{
    Header
  }
};
</script>
