<template>
  <div>
    <h1>Customer</h1>
    <button @click="redirectToAddCustomer">Add Customer</button>
    <input type="text" v-model="searchId" placeholder="Search by ID" />
    <button @click="searchCustomer">Search</button>
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
      <p>This is all customers</p>
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
      fetch(`http://localhost:8082/api/customers`)
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
      fetch(`http://localhost:8082/api/customers/${customerId}`, {
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
        fetch(`http://localhost:8082/api/customers/${customerId}`)
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

<style scoped></style>
