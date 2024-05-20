<template>
  <div>
    <h1 class="header">Customer</h1>
    <div class="controls">
      <button class="btn add-btn" @click="redirectToAddCustomer">
        Add Customer
      </button>
      <input
        type="text"
        v-model="searchId"
        placeholder="Search by ID"
        class="search-input"
      />
      <button class="btn search-btn" @click="searchCustomer">Search</button>
    </div>
    <div v-if="searchResult">
      <h2>Search Result</h2>
      <AllCustomer
        :customer="searchResult"
        @edit="editFunction"
        @delete="deleteFunction"
      />
    </div>
    <div v-else-if="searchNotFound">
      <p>No customer found with ID: {{ searchId }}</p>
    </div>
    <div v-else>
      <p class="subheading">All customers</p>
      <div>
        <AllCustomer
          v-for="customer in customers"
          :key="customer.id"
          :customer="customer"
          @edit="editFunction"
          @delete="deleteFunction"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getAuthToken } from "@/utils";
import AllCustomer from "./AllCustomer.vue";

export default {
  name: "CustomerView",
  components: {
    AllCustomer,
  },
  data() {
    return {
      customers: [],
      searchId: "",
      searchResult: null,
      searchNotFound: false,
    };
  },
  methods: {
    fetchCustomers() {
      fetch(`http://localhost:8089/api/customers`, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
        .then((response) => response.json())
        .then((data) => (this.customers = data))
        .catch((err) => console.log(err.message));
    },
    editFunction(customerId) {
      console.log("Edit Call on", customerId);
      this.$router.push({ name: "Editcustomer", params: { id: customerId } });
    },
    deleteFunction(customerId) {
      console.log("Delete Call on", customerId);
      fetch(`http://localhost:8089/api/customers/${customerId}`, {
        headers: {
          Authorization: getAuthToken(),
        },
        method: "DELETE",
      })
        .then(() => {
          this.fetchCustomers();
        })
        .catch((error) => {
          console.error("Error deleting customer:", error);
        });
    },
    redirectToAddCustomer() {
      this.$router.push({ name: "AddCustomer" });
    },
    searchCustomer() {
      const customerId = parseInt(this.searchId);
      if (!isNaN(customerId)) {
        fetch(`http://localhost:8089/api/customers/${customerId}`, {
          headers: {
            Authorization: getAuthToken(),
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Customer not found");
            }
          })
          .then((data) => {
            this.searchResult = data;
            this.searchNotFound = false;
          })
          .catch((error) => {
            console.error("Error fetching customer:", error);
            this.searchResult = null;
            this.searchNotFound = true;
          });
      } else {
        console.error("Invalid customer ID");
        this.searchResult = null;
        this.searchNotFound = true;
      }
    },
  },
  mounted() {
    this.fetchCustomers();
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
}
.subheading {
  text-align: center;
  font-size: 20px;
  margin: 2em;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.search-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 200px;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.add-btn {
  background-color: #3498db;
  color: white;
  margin-right: 10px;
}

.add-btn:hover {
  background-color: #2980b9;
}

.search-btn {
  background-color: #2ecc71;
  color: white;
}

.search-btn:hover {
  background-color: #27ae60;
}

h2 {
  text-align: center;
  color: #333;
  margin-top: 20px;
}

p {
  text-align: center;
  color: #999;
}

div[v-cloak] {
  display: none;
}
</style>
