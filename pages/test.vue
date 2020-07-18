<template>
  <v-form @submit.prevent="sendFile" enctype="multipart/form-data">
    <div class="field">
      <v-row>
        <v-col cols="6">
          <label>
            <input
              type="file"
              ref="avatar"
              @change="selecFile"
              style="display:none"
            />
            <v-card color="#385F73" dark class="py-5" hover>
              <v-card-text class="text-center">
                <v-icon style="display:block">mdi-camera</v-icon>
                <span>Upload File</span>
              </v-card-text>
            </v-card>
            {{ file.name }}
          </label>
        </v-col>
      </v-row>
    </div>
    <div class="field">
      <v-btn color="primary" type="submit">Upload</v-btn>
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
    },
    async sendFile() {
      try {
        let formData = new FormData();
        formData.append("avatar", this.file);
        let result = await this.$axios.$post("/upload", formData);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
