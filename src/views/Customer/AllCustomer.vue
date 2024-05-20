<template>
  <div class="customer-container">
    <div class="customer-details">
      <div class="customer-info">
        <div>Id: {{ customer.id }}</div>
        <div>Name: {{ customer.fullName }}</div>
        <div>Email: {{ customer.email }}</div>
        <div>State: {{ customer.state }}</div>
        <div>City: {{ customer.city }}</div>
        <div>Zip: {{ customer.zip }}</div>
        <div>Street: {{ customer.street }}</div>
        <div>Country: {{ customer.country }}</div>
      </div>
      <div class="customer-actions">
        <button class="btn edit-btn" @click="emitEdit">Edit</button>
        <button class="btn delete-btn" @click="emitDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitEdit() {
      this.$emit("edit", this.customer.id);
    },
    emitDelete() {
      this.$emit("delete", this.customer.id);
    },
  },
};
</script>

<style scoped>
.customer-container {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.customer-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.customer-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-grow: 1;
}

.customer-info > div {
  flex: 1;
  padding: 0 10px;
  text-align: center;
}

.customer-actions {
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
