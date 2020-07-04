<template>
  <section>
    <div class="container vertical-center  mt-4 ">
      <v-col col lg="12"><h2 class="text-center">Update Profile</h2></v-col>
      <v-row class="justify-content-md-center">
        <v-col col lg="9">
          <h4><strong>Name</strong>: {{$auth.$state.user.userName}}</h4>
          <h4><strong>Email</strong>: {{$auth.$state.user.email}}</h4>
          <v-btn @click="onLogout">Logout</v-btn>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
export default {
    middleware: ['auth'],
    auth: true,
    methods: {
        async onLogout() {
            await this.$auth.logout()
        }
    }
}
</script>

<style></style>