<template>
  <div id="signup">
    <v-main>
      <v-container>
        <v-card width="600" class="mx-auto px-2 py-2">
          <v-card-title><h1>Signup</h1></v-card-title>
          <v-form ref="signUpForm" v-model="formValidity">
            <v-card-text>
              <v-alert type="warning" v-show="errMessage">
                {{ message }}
              </v-alert>
              <v-text-field
                v-model="userName"
                :rules="nameRules"
                :counter="20"
                label="Nick Name"
                required
              ></v-text-field>
              <v-text-field
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passRules"
                :type="show1 ? 'text' : 'password'"
                label="Your Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-checkbox
                label="Agree to terms & conditions"
                v-model="agreeToTerms"
                :rules="agreeToTermsRules"
                required
              ></v-checkbox>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="primary"
                class="mr-4"
                :disabled="!formValidity"
                @click="userSignup()"
                >Submit</v-btn
              >
              <v-btn color="error" to="/login">Login</v-btn>
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
  layout: "default",

  data: () => ({
    email: "",
    userName: "",
    password: "",
    formValidity: false,
    show1: false,
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
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 20 || "Name must be less than 20 characters"
    ],
    passRules: [
      v => v.length >= 8 || "Min 8 characters",
      v => v.length <= 20 || "max 20 characters",
      v => !!v || "Required.",
      v => v.match(/^(?=.*[A-Z])/) || "Mật khẩu phải có 1 chữ viết hoa",
      v => v.match(/^(?=.*\d)/) || "Mật khẩu phải có 1 một số"
    ],
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    agreeToTerms: false,
    agreeToTermsRules: [
      value =>
        !!value ||
        "You must agree to the terms and conditions to sign up for an account."
    ]
  }),
  methods: {
    async userSignup() {
      if (this.$refs.signUpForm.validate()) {
        try {
          let data = {
            userName: this.userName,
            email: this.email,
            password: this.password
          };
          let response = await this.$axios.$post("/api/auth/signup", data);
          if (response.success) {
            this.$auth.loginWith("local", {
              data: {
                email: this.email,
                password: this.password
              }
            });
            this.$router.push("/");
          }
        } catch (err) {
          this.message = "Địa chỉ Email đã có người dùng";
          console.log(err);
          this.errMessage = true;
          this.email = "";
        }
      }
    }
  },
  components: {}
};
</script>
