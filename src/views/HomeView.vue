<template>
  <div class="container">
    <div v-if="!showCreateAccount" class="form-container">
      <h1 class="welcome">Well come to web page</h1>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="loginData.username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="loginData.password"
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account?
        <button @click="showCreateAccount = true">Create Account</button>
      </p>
    </div>
    <div v-if="showCreateAccount" class="form-container">
      <h2>Create Account</h2>
      <form @submit.prevent="createAccount">
        <div class="form-group">
          <label for="newUsername">Username:</label>
          <input
            type="text"
            id="newUsername"
            v-model="newUserData.username"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="newUserData.email" required />
        </div>
        <div class="form-group">
          <label for="age">Age:</label>
          <input type="number" id="age" v-model="newUserData.age" required />
        </div>
        <div class="form-group">
          <label for="country">Country:</label>
          <input
            type="text"
            id="country"
            v-model="newUserData.country"
            required
          />
        </div>
        <div class="form-group">
          <label for="businessType">Type of Business:</label>
          <select id="businessType" v-model="newUserData.businessType" required>
            <option value="retail">Retail</option>
            <option value="service">Service</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="newPassword">Password:</label>
          <input
            type="password"
            id="newPassword"
            v-model="newUserData.password"
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already have an account?
        <button @click="showCreateAccount = false">Login</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCreateAccount: false,
      loginData: {
        username: "",
        password: "",
      },
      newUserData: {
        username: "",
        email: "",
        age: null,
        country: "",
        businessType: "retail",
        password: "",
      },
    };
  },
  methods: {
    login() {
      // Implement login functionality
      console.log("Logging in...");
    },
    createAccount() {
      // Implement create account functionality
      console.log("Creating account...");
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #eaf0f1;
}

.form-container {
  margin: 0 20px;
  width: 600px; /* Doubled the width */
}

form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 10px;
}
.welcome {
  font-size: 50px;
  text-align: center;
  margin-bottom: 50px;
  color: #000;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  text-align: center;
  padding: 10px;
  margin-top: 10px;
  background-color: #a3cb37;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
