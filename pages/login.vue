<template>
  <div id="login">
    <v-main>
      <v-container>
        <v-card width="600" class="mx-auto px-2 py-2">
          <v-form ref="onLogin" v-model="formValidity">
          <v-card-title>
            <h1 class="display-1">Login</h1>
          </v-card-title>
          <v-card-text>
              <v-text-field
                v-model="email"
                label="email"
                prepend-icon="mdi-account-circle"
                required
                :rules="emailRules"
              />
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                required
                :rules="passRules"
              />
              <v-checkbox
                label="Agree to terms & conditions"
                v-model="agreeToTerms"
                :rules="agreeToTermsRules"
                required
              ></v-checkbox>
            
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn :disabled="!formValidity" color="info" @click="onLogin">Login</v-btn>
            <v-spacer />
            <v-btn color="success" to="/signup">Resgister</v-btn>
          </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  auth: "guest",
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
      formValidity: false,
      message: "",
      errMessage: false,
      emailRules: [
      value => !!value || "Email is required.",
      value => value.indexOf("@") !== 0 || "Email should have a username.",
      value => value.includes("@") || "Email should include an @ symbol.",
      value =>
        value.indexOf(".") - value.indexOf("@") > 1 ||
        "Email should contain a valid domain.",
      value => value.includes(".") || "Email should include a period symbol.",
      value =>
        value.indexOf(".") <= value.length - 3 ||
        "Email should contain a valid domain extension."
    ],
    passRules: [
      v => v.length >= 8 || "Min 8 characters",
      v => v.length <= 20 || "max 20 characters",
      v => !!v || "Required.",
    ],
    agreeToTerms: false,
    agreeToTermsRules: [
      value =>
        !!value ||
        "You must agree to the terms and conditions to sign up for an account."
    ]
    };
  },
  methods: {
    async onLogin() {
      if (this.$refs.onLogin.validate()) {
        try {
          let response = await this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          });

          this.$router.push("/");
        } catch (err) {
          console.log(err);
          this.errMessage = true;
          this.email = "";
          this.message = "Mật khẩu hoặc Email không chính xác";
        }
      }
    }
  }
};
</script>
