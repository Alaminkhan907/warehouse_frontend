<template>
  <div>
    <h1>Add Order</h1>
    <form @submit.prevent="addOrder">
      <label>Customer ID:</label>
      <input type="text" v-model="newOrder.customerId" />
      <label>Inventory ID:</label>
      <input type="text" v-model="newOrder.inventoryId" />
      <label>Price:</label>
      <input type="number" v-model="newOrder.price" step="0.01" />
      <label>Order Status:</label>
      <select v-model="newOrder.orderStatus">
        <option value="CREATED">Created</option>
        <option value="SHIPPED">Shipped</option>
        <option value="DELIVERED">Delivered</option>
      </select>
      <label>Shipment Status:</label>
      <select v-model="newOrder.shipmentStatus">
        <option value="CREATED">Created</option>
        <option value="IN_TRANSIT">In Transit</option>
        <option value="DELIVERED">Delivered</option>
      </select>
      <button class="btn btn-blue" type="submit">Add Order</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newOrder: {
        customerId: "",
        inventoryId: "",
        quantity: "",
        price: "",
        orderDate: "",
        orderStatus: "CREATED",
        shipmentStatus: "CREATED",
      },
    };
  },
  methods: {
    addOrder() {
      fetch("http://localhost:8085/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newOrder),
      })
        .then((response) => {
          if (response.ok) {
            this.$router.push({ name: "Orders" });
          } else {
            console.error("Error adding order:", response.statusText);
          }
        })
        .catch((error) => console.error("Error adding order:", error));
    },
  },
};
</script>

<style scoped>
.btn-blue {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full;
}
</style>
