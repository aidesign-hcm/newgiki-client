<template>
  <v-form enctype="multipart/form-data">
    <div class="field">
      <label for="file" class="label">Upload File</label>
      <input type="file" ref="avatar" @change="selecFile" />
    </div>
     <div class="field">
      <v-btn primary >Upload</v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      file: ""
    };
  },
  methods: {
    selecFile() {
      this.file = this.$refs.avatar.files[0];
    }
  }
};
</script>

<style></style>
