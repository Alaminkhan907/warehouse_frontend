<template>
  <div class="supplier-container">
    <div class="supplier-details">
      <div class="supplier-info">
        <div>Supplier ID: {{ supplier.id }}</div>
        <div>Name: {{ supplier.name }}</div>
        <div>Email: {{ supplier.email }}</div>
        <div>Phone: {{ supplier.phoneNo }}</div>
        <div>Address: {{ supplier.address }}</div>
      </div>
      <div class="supplier-actions">
        <button class="btn edit-btn" @click="emitEdit">Edit</button>
        <button class="btn delete-btn" @click="emitDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    supplier: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitEdit() {
      this.$emit("edit", this.supplier.id);
    },
    emitDelete() {
      this.$emit("delete", this.supplier.id);
    },
  },
};
</script>

<style scoped>
.supplier-container {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.supplier-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.supplier-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.supplier-info > div {
  padding: 5px 0;
  text-align: left;
}

.supplier-actions {
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
