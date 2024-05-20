<template>
  <div>
    <h1 class="header">Edit Customer</h1>
    <form @submit.prevent="updateCustomer" class="form-container">
      <div class="input-container">
        <label>Name:</label>
        <input type="text" v-model="editedCustomer.fullName" />
      </div>
      <div class="input-container">
        <label>Email:</label>
        <input type="email" v-model="editedCustomer.email" />
      </div>
      <div class="input-container">
        <label>Phone:</label>
        <input type="text" v-model="editedCustomer.phoneNo" />
      </div>
      <div class="button-container">
        <button class="btn btn-blue" type="submit">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editedCustomer: {
        fullName: "",
        email: "",
        phoneNo: "",
      },
    };
  },
  mounted() {
    const customerId = this.$route.params.id;
    console.log("Received customer ID:", customerId);

    this.fetchCustomer();
  },
  methods: {
    fetchCustomer() {
      const customerId = this.$route.params.id;
      console.log("Received customer ID:", customerId);

      if (customerId) {
        fetch(`http://localhost:8089/api/customers/${customerId}`)
          .then((response) => response.json())
          .then((data) => {
            this.editedCustomer = data;
          })
          .catch((error) => console.error("Error fetching customer:", error));
      } else {
        console.error("Customer ID is invalid or missing");
      }
    },
    updateCustomer() {
      const customerId = this.$route.params.id;

      if (customerId) {
        fetch(`http://localhost:8089/api/customers/${customerId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.editedCustomer),
        })
          .then((response) => {
            if (response.ok) {
              this.$router.push({ name: "Customer" });
            } else {
              console.error("Error updating customer:", response.statusText);
            }
          })
          .catch((error) => console.error("Error updating customer:", error));
      } else {
        console.error("Customer ID is invalid or missing");
      }
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
  align-items: flex-end;
  gap: 10px;
}

.input-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
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
  display: flex;
  align-items: flex-end;
}

.btn.btn-blue {
  padding: 15px 30px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn.btn-blue:hover {
  background-color: #2980b9;
}
</style>
