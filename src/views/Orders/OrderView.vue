<template>
  <div>
    <h1>Orders</h1>
    <button @click="redirectToCreateOrder">Create Order</button>
    <input type="text" v-model="searchId" placeholder="Search by Order ID" />
    <button @click="searchOrder">Search</button>
    <div v-if="searchResult">
      <h2>Search Result</h2>
      <AllOrder :order="searchResult" @edit="editOrder" @delete="deleteOrder" />
    </div>
    <div v-else-if="searchNotFound">
      <p>No order found with ID: {{ searchId }}</p>
    </div>
    <div v-else>
      <p>This is all orders</p>
      <div>
        <AllOrder
          v-for="order in orders"
          :key="order.id"
          :order="order"
          @edit="editOrder"
          @delete="deleteOrder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AllOrder from "./AllOrder.vue";

export default {
  name: "OrderView",
  components: {
    AllOrder,
  },
  data() {
    return {
      orders: [],
      searchId: "",
      searchResult: null,
      searchNotFound: false,
    };
  },
  methods: {
    fetchOrders() {
      fetch(`http://localhost:8085/api/orders`)
        .then((response) => response.json())
        .then((data) => (this.orders = data))
        .catch((err) => console.log(err.message));
    },
    editOrder(orderId) {
      console.log("Order call from child receive on parent", orderId);
      this.$router.push({ name: "EditOrder", params: { id: orderId } });
    },
    deleteOrder(orderId) {
      console.log("Delete Order Call on", orderId);
      fetch(`http://localhost:8085/api/orders/${orderId}`, {
        method: "DELETE",
      })
        .then(() => {
          this.fetchOrders();
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
        });
    },
    redirectToCreateOrder() {
      this.$router.push({ name: "AddOrder" });
    },
    searchOrder() {
      const orderId = parseInt(this.searchId);
      if (!isNaN(orderId)) {
        fetch(`http://localhost:8085/api/orders/${orderId}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Order not found");
            }
          })
          .then((data) => {
            this.searchResult = data;
            this.searchNotFound = false;
          })
          .catch((error) => {
            console.error("Error fetching order:", error);
            this.searchResult = null;
            this.searchNotFound = true;
          });
      } else {
        console.error("Invalid order ID");
        this.searchResult = null;
        this.searchNotFound = true;
      }
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped></style>
