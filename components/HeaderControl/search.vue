<template>
  <div class="d-flex">
    <v-text-field
      hide-details
      single-line
      placeholder="tìm kiếm"
      label="Search"
      v-model="query"
    ></v-text-field>
    <v-btn @click="onSearch" icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ""
    };
  },
  methods: {
    onSearch() {
      this.$router.push({
        path: "/search",
        query: { name: this.query }
      });
    }
  }
};
</script>

<style></style>
