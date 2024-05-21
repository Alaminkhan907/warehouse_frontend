<template>
  <div class="shipment-container">
    <div class="shipment-details">
      <div class="shipment-info">
        <div>Shipment ID: {{ shipment.id }}</div>
        <div>Order ID: {{ shipment.orderId }}</div>
        <div>Shipment Status: {{ shipment.shipmentStatus }}</div>
        <div>Address: {{ shipment.street }}, {{ shipment.city }}, {{ shipment.state }}, {{ shipment.country }}</div>
        <div v-if="shipment.shipDate !== null">
          Ship Date: {{ shipment.shipDate }}
        </div>
      </div>
      <div class="shipment-actions">
        <button class="btn edit-btn" @click="emitEdit">Edit</button>
        <button class="btn delete-btn" @click="emitDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shipment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitEdit() {
      this.$emit("edit", this.shipment.id);
    },
    emitDelete() {
      this.$emit("delete", this.shipment.id);
    },
  },
};
</script>

<style scoped>
.shipment-container {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.shipment-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shipment-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.shipment-info > div {
  padding: 5px 0;
  text-align: left;
}

.shipment-actions {
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
