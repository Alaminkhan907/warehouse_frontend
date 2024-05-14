<template>
  <div>
    <h1>Edit Order</h1>
    <form @submit.prevent="updateOrder">
      <label>Customer ID:</label>
      <input type="text" v-model="editedOrder.customerId" />
      <label>Inventory ID:</label>
      <input type="text" v-model="editedOrder.inventoryId" />
      <label>Quantity:</label>
      <input type="number" v-model="editedOrder.quantity" />
      <label>Price:</label>
      <input type="number" v-model="editedOrder.price" step="0.01" />

      <label>Order Status:</label>
      <select v-model="editedOrder.orderStatus">
        <option value="CREATED">Created</option>
        <option value="SHIPPED">Shipped</option>
        <option value="DELIVERED">Delivered</option>
      </select>
      <label>Shipment Status:</label>
      <select v-model="editedOrder.shipmentStatus">
        <option value="CREATED">Created</option>
        <option value="IN_TRANSIT">In Transit</option>
        <option value="DELIVERED">Delivered</option>
      </select>
      <button class="btn btn-blue" type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editedOrder: {
        customerId: "",
        inventoryId: "",
        quantity: "",
        price: "",
        orderDate: "",
        orderStatus: "",
        shipmentStatus: "CREATED",
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
        fetch(`http://localhost:8080/api/orders/${orderId}`)
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
        fetch(`http://localhost:8080/api/orders/${orderId}`, {
          method: "PUT",
          headers: {
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
.btn-blue {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full;
}
</style>
