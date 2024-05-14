<template>
  <div class="form">
    <h3>LogIn</h3>
    <label for="username">User Name</label>
    <input type="text" name="username" required v-model="username" />
    <label for="password">Password</label>
    <input type="password" name="password" required v-model="password" />
    <div class="container">
      <button @click="LogIn" class="center">LogIn</button>
      <button @click="this.$router.push('/signup')" class="center">
        Signup
      </button>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "LogIn",

  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async LogIn() {
      var data = {
        name: this.username,
        password: this.password,
      };

      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      await fetch("http://localhost:8090/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((response) => {
          // saving the jwt returned in the response into the token variable
          this.token = response;

          //checking if a jwt token is retuned, all jwt tokes start with "ey"
          if (this.token.startsWith("ey")) {
            // decoding the jwt and save it in the decodedToken variable
            this.decodedToken = jwt_decode(this.token);
            // saving the returned user role into the roles variable
            this.roles = this.decodedToken.roles;
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
