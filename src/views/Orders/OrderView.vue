<template>
  <div>
    <h1 class="header">Orders</h1>
    <div class="controls">
      <button class="btn add-btn" @click="redirectToCreateOrder">
        Create Order
      </button>
      <input
        type="text"
        v-model="searchId"
        placeholder="Search by Order ID"
        class="search-input"
      />
      <button class="btn search-btn" @click="searchOrder">Search</button>
    </div>
    <div v-if="searchResult">
      <h2>Search Result</h2>
      <AllOrder :order="searchResult" @edit="editOrder" @delete="deleteOrder" />
    </div>
    <div v-else-if="searchNotFound">
      <p>No order found with ID: {{ searchId }}</p>
    </div>
    <div v-else>
      <p class="subheading">This is all orders</p>
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
      console.log("Order call from child received on parent", orderId);
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
