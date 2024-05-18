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
      <button class="btn submit-btn" type="submit">Add Customer</button>
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
      },
    };
  },
  methods: {
    addCustomer() {
      fetch("http://localhost:8082/api/customers", {
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
  /* padding-right: 5%; */
}

.input-container {
  flex: 1;
  margin-right: 10px;
}

.input-container label {
  display: block;
  margin-bottom: 5px;
}

.input-container input {
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 15px;
  width: calc(100% - 40px);
  box-sizing: content-box;
}

.btn.submit-btn {
  padding: 15px 20px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background-color: #1abc9c;
  font-size: 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin-left: 10px;
}

.btn.submit-btn:hover {
  background-color: #2980b9;
}
</style>
