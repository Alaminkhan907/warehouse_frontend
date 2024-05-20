<template>
  <div class="login-container">
    <div class="login-box">
      <h3 class="login-header">Sign Up</h3>
      <form @submit.prevent="SignUp">
        <div class="input-group">
          <label for="username">User Name</label>
          <input type="text" name="username" required v-model="username" />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" name="email" required v-model="email" />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" name="password" required v-model="password" />
        </div>
        <div class="input-group">
          <label for="roles">Role</label>
          <input type="text" name="roles" required v-model="roles" />
        </div>
        <div class="button-group">
          <button type="submit" class="btn btn-signup">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "SignUp",
  data: function () {
    return {
      username: "",
      email: "",
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
        email: this.email,
        password: this.password,
        roles: this.roles,
      };

      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      await fetch("http://localhost:8089/api/auth/signup", {
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
            this.$router.push("/LogIn");
            //decoding the jwt and save it in the decodedToken variable
            this.decodedToken = jwt_decode(this.token);
            // saving the returned user role into the roles variable
            this.roles = this.decodedToken.roles;
            console.log(this.decodedToken.roles);
            // saving the token into the windows local storage
            localStorage.setItem("jwtToken", this.token);
            console.log(localStorage.getItem("jwtToken"));
          }
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(-150deg, #1abc9c 50%, #3498db 50%);
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-header {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-signup {
  background-color: #42b72a;
  color: white;
}

.btn-signup:hover {
  background-color: #36a420;
}
</style>
