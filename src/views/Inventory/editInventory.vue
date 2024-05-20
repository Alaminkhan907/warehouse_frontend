<template>
  <div>
    <h1 class="header">Edit Inventory</h1>
    <form @submit.prevent="updateInventory">
      <div class="form-group">
        <label for="code">Code</label>
        <input type="number" v-model="inventory.code" required />
      </div>
      <div class="form-group">
        <label for="supplierId">Supplier ID</label>
        <input type="number" v-model="inventory.supplierId" required />
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" v-model="inventory.name" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="inventory.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" v-model="inventory.price" step="0.01" required />
      </div>
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input type="number" v-model="inventory.quantity" required />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <input type="text" v-model="inventory.category" required />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <input type="text" v-model="inventory.status" required />
      </div>
      <button type="submit" class="btn submit-btn">Update</button>
    </form>
  </div>
</template>

<script>
import { getAuthToken } from "@/utils";
export default {
  name: "EditInventory",
  data() {
    return {
      inventory: {
        code: null,
        supplierId: null,
        name: "",
        description: "",
        price: null,
        quantity: null,
        category: "",
        status: "",
      },
    };
  },
  methods: {
    fetchInventory() {
      const inventoryId = this.$route.params.id;
      fetch(`http://localhost:8089/api/inventory/${inventoryId}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.inventory = data;
        })
        .catch((err) => console.log(err.message));
    },
    updateInventory() {
      const inventoryId = this.$route.params.id;
      fetch(`http://localhost:8089/api/inventory/${inventoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAuthToken(),
        },
        body: JSON.stringify(this.inventory),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to update inventory");
          }
        })
        .then((data) => {
          console.log("Inventory updated:", data);
          this.$router.push({ name: "InventoryView" });
        })
        .catch((error) => {
          console.error("Error updating inventory:", error);
        });
    },
  },
  mounted() {
    this.fetchInventory();
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
}

.form-group {
  margin-bottom: 20px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
}

.btn {
  display: block;
  width: fit-content;
  margin: 20px auto;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.submit-btn {
  background-color: #2ecc71;
  color: white;
}

.submit-btn:hover {
  background-color: #27ae60;
}
</style>
