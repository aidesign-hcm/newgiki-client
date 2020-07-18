<template>
  <section>
    <div class="container vertical-center  mt-4 ">
      <v-col col lg="12"><h2 class="text-center">Update Profile</h2></v-col>
      <v-row class="justify-content-md-center">
        <v-col col lg="9">
          <div class="large-12 medium-12 small-12 cell">
            <div v-if="!user.avatar" @click="launchFilePicker()">
              <v-avatar
                size="150px"
                v-ripple
                v-if="!showPreview"
                class="grey lighten-3 mb-3"
              >
                <span>Click to add avatar</span>
              </v-avatar>
              <v-avatar size="150px" v-ripple v-else class="mb-3">
                <img v-bind:src="imagePreview" alt="avatar" />
              </v-avatar>
            </div>
            <div v-else>
              <v-avatar size="150px" v-ripple class="mb-3"  >
                <img v-bind:src="serverUrl + user.avatar" alt="avatar" @click="launchFilePicker()"/>
            </v-avatar>
            <a @click="onDeleteAvatar(user._id)">Xóa avatar</a>
            </div>
            <input
              type="file"
              id="file"
              ref="file"
              accept="image/*"
              style="display:none"
              v-on:change="handleFileUpload()"
            />
            <v-dialog v-model="errorDialog" max-width="300">
              <v-card>
                <v-card-text class="subheading">{{errorText}}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="errorDialog = false">Got it!</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-slide-x-transition>
              <div v-if="showPreview">
                <v-btn class="primary" @click="onAddAvatar" :loading="saving">Save Avatar</v-btn>
              </div>
            </v-slide-x-transition>
            <h4><strong>Name</strong>: {{ $auth.$state.user.userName }}</h4>
            <h4><strong>Email</strong>: {{ $auth.$state.user.email }}</h4>
            <v-btn @click="onLogout">Logout</v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>

export default {
  middleware: ["auth"],
  auth: true,
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/auth/user");
      return {
        user: response.user
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      serverUrl: "http://localhost:8338/",
      user: {
        avatar: null
      },
      saving: false,
      saved: false,
      file: "",
      showPreview: false,
      imagePreview: "",
      maxSize: 1024,
      errorDialog: null,
      errorText: '',
    };
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    async onLogout() {
      await this.$auth.logout();
    },
    async onDeleteAvatar(id, index) {
      try {
        let response = await this.$axios.$delete(`/api/auth/user/avatar/${id}`);
        if (response.success) {
          this.user.avatar = null;
          this.message = "Delete success";
        }
      } catch (err) {
        this.message = err.message;
        console.log(err);
      }
    },
    async onAddAvatar() {
      try {
        let data = new FormData();
        data.append("avatar", this.file);
        let result = await this.$axios.$post("/api/auth/user/avatar", data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        if (result.success) {
          this.saving = true;
          setTimeout(() => this.savedAvatar(), 1000);
          setTimeout(() => this.user.avatar= result.avatar, 1000);
        }
      } catch (err) {
        this.message = "Có lỗi trong lúc đăng ảnh";
        this.errMessage = true;
      }
    },
    handleFileUpload() {
      this.user.avatar = null
      this.file = this.$refs.file.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );
      if (this.file) {
        let size = this.file.size / this.maxSize / this.maxSize
        if(size > 3) {
          this.errorDialog = true
          this.errorText = 'FIle không được năng quá 3MB'
        }
        else if (!/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
         this.errorDialog = true
          this.errorText = 'Chỉ được phép đăng hình ảnh'
        } else {
          reader.readAsDataURL(this.file);
        }
      }
    },
    savedAvatar() {
      this.saving = false;
      this.showPreview = false ;
      this.$router.push("/profile/");
    }
  },
  // watch: {
  //   avatar: {
  //     handler: function() {
  //       this.saved = false;
  //     },
  //     deep: true
  //   }
  // }
};
</script>

<style></style>
