<template>
  <div class="order-container">
    <div class="order-details">
      <div class="order-info">
        <div>Order ID: {{ order.id }}</div>
        <div>Customer ID: {{ order.customerId }}</div>
        <div>Inventory ID: {{ order.inventoryId }}</div>
        <div v-if="order.quantity !== null">Quantity: {{ order.quantity }}</div>
        <div>Price: {{ order.price }}</div>
        <div v-if="order.orderDate !== null">
          Order Date: {{ order.orderDate }}
        </div>
        <div>Order Status: {{ order.orderStatus }}</div>
        <div>Shipment Status: {{ order.shipmentStatus }}</div>
      </div>
      <div class="order-actions">
        <button class="btn edit-btn" @click="emitEdit">Edit</button>
        <button class="btn delete-btn" @click="emitDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitEdit() {
      this.$emit("edit", this.order.id);
      console.log("Edit call from child", this.order.id);
    },
    emitDelete() {
      this.$emit("delete", this.order.id);
    },
  },
};
</script>

<style scoped>
.order-container {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.order-info > div {
  padding: 5px 0;
  text-align: left;
}

.order-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.edit-btn {
  background-color: #3498db;
  color: white;
}

.edit-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: #ff4742;
  color: white;
}

.delete-btn:hover {
  background-color: #e3342f;
}
</style>
