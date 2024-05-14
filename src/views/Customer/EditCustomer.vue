<template>
  <div>
    <h1>Edit Customer</h1>
    <form @submit.prevent="updateCustomer">
      <label>Name:</label>
      <input type="text" v-model="editedCustomer.fullName" />
      <label>Email:</label>
      <input type="email" v-model="editedCustomer.email" />
      <label>Phone:</label>
      <input type="text" v-model="editedCustomer.phoneNo" />
      <button class="btn btn-blue" type="submit">Save Changes</button>
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
        fetch(`http://localhost:8080/api/customers/${customerId}`)
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
        fetch(`http://localhost:8080/api/customers/${customerId}`, {
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
.btn-blue {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full;
}
</style>
