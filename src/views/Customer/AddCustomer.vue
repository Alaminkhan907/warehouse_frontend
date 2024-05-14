<template>
  <div>
    <h1>Add Customer</h1>
    <form @submit.prevent="addCustomer">
      <label>Name:</label>
      <input type="text" v-model="newCustomer.fullName" />
      <label>Email:</label>
      <input type="email" v-model="newCustomer.email" />
      <label>Phone:</label>
      <input type="text" v-model="newCustomer.phoneNo" />
      <button class="btn btn-blue" type="submit">Add Customer</button>
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
      fetch("http://localhost:8080/api/customers", {
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
.btn-blue {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full;
}
</style>
