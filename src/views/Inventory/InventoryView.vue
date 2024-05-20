<template>
  <div>
    <h1 class="header">Inventory</h1>
    <div class="controls">
      <button class="btn add-btn" @click="redirectToCreateInventory">
        Create Inventory
      </button>
      <input
        type="text"
        v-model="searchId"
        placeholder="Search by Inventory ID"
        class="search-input"
      />
      <button class="btn search-btn" @click="searchInventory">Search</button>
    </div>
    <div v-if="searchResult">
      <h2>Search Result</h2>
      <AllInventory
        :inventory="searchResult"
        @edit="editInventory"
        @delete="deleteInventory"
      />
    </div>
    <div v-else-if="searchNotFound">
      <p>No inventory found with ID: {{ searchId }}</p>
    </div>
    <div v-else>
      <p class="subheading">All Inventories</p>
      <div>
        <AllInventory
          v-for="inventory in inventories"
          :key="inventory.id"
          :inventory="inventory"
          @edit="editInventory"
          @delete="deleteInventory"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getAuthToken } from "@/utils";
import AllInventory from "./allInventory.vue";

export default {
  name: "InventoryView",
  components: {
    AllInventory,
  },
  data() {
    return {
      inventories: [],
      searchId: "",
      searchResult: null,
      searchNotFound: false,
    };
  },
  methods: {
    fetchInventories() {
      fetch(`http://localhost:8089/api/inventory`, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
        .then((response) => response.json())
        .then((data) => (this.inventories = data))
        .catch((err) => console.log(err.message));
    },
    editInventory(inventoryId) {
      console.log("Edit call from child received on parent", inventoryId);
      this.$router.push({ name: "EditInventory", params: { id: inventoryId } });
    },
    deleteInventory(inventoryId) {
      console.log("Delete Inventory Call on", inventoryId);
      fetch(`http://localhost:8089/api/inventory/${inventoryId}`, {
        headers: {
          Authorization: getAuthToken(),
        },
        method: "DELETE",
      })
        .then(() => {
          this.fetchInventories();
        })
        .catch((error) => {
          console.error("Error deleting inventory:", error);
        });
    },
    redirectToCreateInventory() {
      this.$router.push({ name: "AddInventory" });
    },
    searchInventory() {
      const inventoryId = parseInt(this.searchId);
      if (!isNaN(inventoryId)) {
        fetch(`http://localhost:8089/api/inventory/${inventoryId}`, {
          headers: {
            Authorization: getAuthToken(),
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Inventory not found");
            }
          })
          .then((data) => {
            this.searchResult = data;
            this.searchNotFound = false;
          })
          .catch((error) => {
            console.error("Error fetching inventory:", error);
            this.searchResult = null;
            this.searchNotFound = true;
          });
      } else {
        console.error("Invalid inventory ID");
        this.searchResult = null;
        this.searchNotFound = true;
      }
    },
  },
  mounted() {
    this.fetchInventories();
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
.subheading {
  text-align: center;
  font-size: 20px;
  margin: 2em;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.search-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 200px;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.add-btn {
  background-color: #3498db;
  color: white;
  margin-right: 10px;
}

.add-btn:hover {
  background-color: #2980b9;
}

.search-btn {
  background-color: #2ecc71;
  color: white;
}

.search-btn:hover {
  background-color: #27ae60;
}

h2 {
  text-align: center;
  color: #333;
  margin-top: 20px;
}

p {
  text-align: center;
  color: #999;
}

div[v-cloak] {
  display: none;
}
</style>
