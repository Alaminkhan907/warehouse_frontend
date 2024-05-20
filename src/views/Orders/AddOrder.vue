<template>
  <div>
    <h1 class="header">Add Order</h1>
    <form @submit.prevent="addOrder" class="form-container">
      <div class="input-container">
        <label>Customer ID:</label>
        <input type="text" v-model="newOrder.customerId" />
      </div>
      <div class="input-container">
        <label>Inventory ID:</label>
        <input type="text" v-model="newOrder.inventoryId" />
      </div>
      <div class="input-container">
        <label>Quantity:</label>
        <input type="number" v-model="newOrder.quantity" />
      </div>
      <div class="input-container">
        <label>Price:</label>
        <input type="number" v-model="newOrder.price" />
      </div>
      <div class="input-container">
        <label>Order Status:</label>
        <select v-model="newOrder.orderStatus">
          <option value="CREATED">CREATED</option>
          <option value="SHIPPED">CONFIRMED</option>
          <option value="DELIVERED">COMPLETED</option>
          <option value="DELIVERED">CANCELED</option>
        </select>
      </div>
      <button class="btn submit-btn" type="submit">Add Order</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    const getCurrentDateTime = () => {
      const now = new Date();
      return now.toISOString();
    };
    return {
      newOrder: {
        customerId: "",
        inventoryId: "",
        quantity: "",
        price: "",
        orderDate: getCurrentDateTime,
        orderStatus: "CREATED",
      },
    };
  },
  methods: {
    addOrder() {
      // Add the current date and time to the orderDate field
      this.newOrder.orderDate = new Date().toISOString();

      fetch("http://localhost:8089/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newOrder),
      }).then((response) => {
        if (response.ok) {
          this.$router.push({ name: "Order" });
        } else {
          console.error("Error adding order:", response.statusText);
        }
      });
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
}

.input-container {
  flex: 1;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
}

.input-container label {
  display: block;
  margin-bottom: 5px;
}

.input-container input,
.input-container select {
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
