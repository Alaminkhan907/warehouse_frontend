<template>
  <div>
    <div>
      <ul>
        <li>Order ID: {{ order.id }}</li>
        <li>Customer ID: {{ order.customerId }}</li>
        <li>Inventory ID: {{ order.inventoryId }}</li>
        <li v-if="order.quantity !== null">Quantity: {{ order.quantity }}</li>
        <li>Price: {{ order.price }}</li>
        <li v-if="order.orderDate !== null">
          Order Date: {{ order.orderDate }}
        </li>
        <li>Order Status: {{ order.orderStatus }}</li>
        <li>Shipment Status: {{ order.shipmentStatus }}</li>
      </ul>
      <button @click="emitEdit">Edit</button>
      <button @click="emitDelete">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order"],
  methods: {
    emitDelete() {
      this.$emit("delete", this.order.id);
    },
    emitEdit() {
      this.$emit("edit", this.order.id);
      console.log("edit call from child", this.order.id);
    },
  },
};
</script>
