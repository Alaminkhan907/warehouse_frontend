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
  data() {
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
          this.token = response;
          if (this.token.startsWith("ey")) {
            this.decodedToken = jwt_decode(this.token);
            this.roles = this.decodedToken.roles;
            console.log(this.decodedToken.roles);
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

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
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
