<template>
  <div class="inventory-container">
    <div class="inventory-details">
      <div class="inventory-info">
        <div>Inventory ID: {{ inventory.id }}</div>
        <div>Code: {{ inventory.code }}</div>
        <div>Supplier ID: {{ inventory.supplierId }}</div>
        <div>Name: {{ inventory.name }}</div>
        <div>Description: {{ inventory.description }}</div>
        <div>Price: {{ inventory.price }}</div>
        <div v-if="inventory.quantity !== null">
          Quantity: {{ inventory.quantity }}
        </div>
        <div>Category: {{ inventory.category }}</div>
        <div>Status: {{ inventory.status }}</div>
        <div v-if="inventory.createdAt !== null">
          Created At: {{ inventory.createdAt }}
        </div>
        <div v-if="inventory.updatedAt !== null">
          Updated At: {{ inventory.updatedAt }}
        </div>
      </div>
      <div class="inventory-actions">
        <button class="btn edit-btn" @click="emitEdit">Edit</button>
        <button class="btn delete-btn" @click="emitDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inventory: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitEdit() {
      this.$emit("edit", this.inventory.id);
      console.log("Edit call from child", this.inventory.id);
    },
    emitDelete() {
      this.$emit("delete", this.inventory.id);
    },
  },
};
</script>

<style scoped>
.inventory-container {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.inventory-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inventory-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.inventory-info > div {
  padding: 5px 0;
  text-align: left;
}

.inventory-actions {
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
