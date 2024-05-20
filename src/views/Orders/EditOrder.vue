<template>
  <div>
    <h1 class="header">Edit Order</h1>
    <form @submit.prevent="updateOrder" class="form-container">
      <div class="input-container">
        <label>Customer ID:</label>
        <input type="text" v-model="editedOrder.customerId" />
      </div>
      <div class="input-container">
        <label>Inventory ID:</label>
        <input type="text" v-model="editedOrder.inventoryId" />
      </div>
      <div class="input-container">
        <label>Quantity:</label>
        <input type="number" v-model="editedOrder.quantity" />
      </div>
      <div class="input-container">
        <label>Price:</label>
        <input type="number" v-model="editedOrder.price" step="0.01" />
      </div>
      <!-- <div class="input-container">
        <label>Order Date:</label>
        <input type="text" v-model="editedOrder.orderDate" readonly />
      </div> -->
      <div class="input-container">
        <label>Order Status:</label>
        <select v-model="editedOrder.orderStatus">
          <option value="CREATED">CREATED</option>
          <option value="SHIPPED">CONFIRMED</option>
          <option value="DELIVERED">COMPLETED</option>
          <option value="DELIVERED">CANCELED</option>
        </select>
      </div>

      <div class="button-container">
        <button class="btn btn-blue" type="submit">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getAuthToken } from "@/utils";
export default {
  data() {
    const getCurrentDateTime = () => {
      const now = new Date();
      return now.toISOString();
    };
    return {
      editedOrder: {
        customerId: "",
        inventoryId: "",
        quantity: "",
        price: "",
        orderDate: getCurrentDateTime,
        orderStatus: "",
      },
    };
  },
  mounted() {
    const orderId = this.$route.params.id;
    console.log("Received order ID:", orderId);

    this.fetchOrder();
  },
  methods: {
    fetchOrder() {
      const orderId = this.$route.params.id;
      console.log("Received order ID:", orderId);

      if (orderId) {
        fetch(`http://localhost:8085/api/orders/${orderId}`, {
          headers: {
            Authorization: getAuthToken(),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.editedOrder = data;
          })
          .catch((error) => console.error("Error fetching order:", error));
      } else {
        console.error("Order ID is invalid or missing");
      }
    },
    updateOrder() {
      const orderId = this.$route.params.id;

      if (orderId) {
        fetch(`http://localhost:8085/api/orders/${orderId}`, {
          method: "PUT",
          headers: {
            Authorization: getAuthToken(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.editedOrder),
        })
          .then((response) => {
            if (response.ok) {
              this.$router.push({ name: "Order" });
            } else {
              console.error("Error updating order:", response.statusText);
            }
          })
          .catch((error) => console.error("Error updating order:", error));
      } else {
        console.error("Order ID is invalid or missing");
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
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
}

.input-container label {
  margin-bottom: 5px;
}

.input-container input,
.input-container select {
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 15px;
  width: 100%;
  box-sizing: border-box;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
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
