<template>
  <div>
    <h1 class="header">Add Customer</h1>
    <form @submit.prevent="addCustomer" class="form-container">
      <div class="input-container">
        <label>Name:</label>
        <input type="text" v-model="newCustomer.fullName" />
      </div>
      <div class="input-container">
        <label>Email:</label>
        <input type="email" v-model="newCustomer.email" />
      </div>
      <div class="input-container">
        <label>Phone:</label>
        <input type="text" v-model="newCustomer.phoneNo" />
      </div>
      <div class="input-container">
        <label>State:</label>
        <input type="text" v-model="newCustomer.state" />
      </div>
      <div class="input-container">
        <label>City:</label>
        <input type="text" v-model="newCustomer.city" />
      </div>
      <div class="input-container">
        <label>Zip:</label>
        <input type="text" v-model="newCustomer.zip" />
      </div>
      <div class="input-container">
        <label>Street:</label>
        <input type="text" v-model="newCustomer.street" />
      </div>
      <div class="input-container">
        <label>Country:</label>
        <input type="text" v-model="newCustomer.country" />
      </div>
      <div class="button-container">
        <button class="btn submit-btn" type="submit">Add Customer</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCustomer: {
        fullName: "",
        email: "",
        phoneNo: "",
        state: "",
        city: "",
        zip: "",
        street: "",
        country: "",
      },
    };
  },
  methods: {
    addCustomer() {
      fetch("http://localhost:8089/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newCustomer),
      })
        .then((response) => {
          if (response.ok) {
            this.$router.push({ name: "Customer" });
          } else {
            console.error("Error adding customer:", response.statusText);
          }
        })
        .catch((error) => console.error("Error adding customer:", error));
    },
  },
};
</script>

<style scoped>
.header {
  padding: 40px;
  text-align: center;
  background: #1abc9c;
  color: white;
  font-size: 30px;
  margin-bottom: 2%;
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 10px;
}

.input-container {
  flex: 1 1 calc(50% - 20px);
  margin-bottom: 10px;
}

.input-container label {
  margin-bottom: 5px;
}

.input-container input {
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 15px;
  width: 100%;
  box-sizing: border-box;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.btn.submit-btn {
  padding: 15px 30px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background-color: #1abc9c;
  color: white;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn.submit-btn:hover {
  background-color: #2980b9;
}
</style>
