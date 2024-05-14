<template>
  <div class="form">
    <h3>SignUp</h3>
    <label for="username">User Name</label>
    <input type="text" name="username" required v-model="username" />
    <label for="password">Password</label>
    <input type="password" name="password" required v-model="password" />
    <label for="roles">Role</label>
    <input type="text" name="roles" required v-model="roles" />
    <button @click="SignUp" class="SignUp">SignUp</button>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "SignUp",
  data: function () {
    return {
      username: "",
      password: "",
      roles: "",
      token: "",
      decodedToken: "",
    };
  },
  methods: {
    async SignUp() {
      var data = {
        name: this.username,
        password: this.password,
        roles: this.roles,
      };

      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      await fetch("http://localhost:8090/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((response) => {
          //saving the jwt in the token variable
          this.token = response;
          if (this.token.startsWith("ey")) {
            //decoding the jwt and save it in the decodedToken variable
            this.decodedToken = jwt_decode(this.token);
            // saving the returned user role into the roles variable
            this.roles = this.decodedToken.roles;
            console.log(this.decodedToken.roles);
            // saving the token into the windows local storage
            localStorage.setItem("jwtToken", this.token);
            console.log(localStorage.getItem("jwtToken"));
            this.$router.push("/");
          }
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
    },
  },
};
</script>

<style scoped></style>
