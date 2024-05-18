<template>
  <div>
    <h1 class="header">Suppliers</h1>
    <div class="controls">
      <button class="btn add-btn" @click="redirectToCreateSupplier">
        Add Supplier
      </button>
      <input
        type="text"
        v-model="searchId"
        placeholder="Search by Supplier ID"
        class="search-input"
      />
      <button class="btn search-btn" @click="searchSupplier">Search</button>
    </div>
    <div v-if="searchResult">
      <p>Search Result</p>
      <AllSupplier
        :supplier="searchResult"
        @edit="editSupplier"
        @delete="deleteSupplier"
      />
    </div>
    <div v-else-if="searchNotFound">
      <p>No supplier found with ID: {{ searchId }}</p>
    </div>
    <div v-else>
      <p class="subheading">All Suppliers</p>
      <div>
        <AllSupplier
          v-for="supplier in suppliers"
          :key="supplier.id"
          :supplier="supplier"
          @edit="editSupplier"
          @delete="deleteSupplier"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AllSupplier from "./AllSupplier.vue";

export default {
  name: "SupplierView",
  components: {
    AllSupplier,
  },
  data() {
    return {
      suppliers: [],
      searchId: "",
      searchResult: null,
      searchNotFound: false,
    };
  },
  methods: {
    fetchSuppliers() {
      fetch(`http://localhost:8083/api/suppliers`)
        .then((response) => response.json())
        .then((data) => (this.suppliers = data))
        .catch((err) => console.log(err.message));
    },
    editSupplier(supplierId) {
      console.log("Supplier call from child received on parent", supplierId);
      this.$router.push({ name: "EditSupplier", params: { id: supplierId } });
    },
    deleteSupplier(supplierId) {
      console.log("Delete Supplier Call on", supplierId);
      fetch(`http://localhost:8083/api/suppliers/${supplierId}`, {
        method: "DELETE",
      })
        .then(() => {
          this.fetchSuppliers();
        })
        .catch((error) => {
          console.error("Error deleting supplier:", error);
        });
    },
    redirectToCreateSupplier() {
      this.$router.push({ name: "AddSupplier" });
    },
    searchSupplier() {
      const supplierId = parseInt(this.searchId);
      if (!isNaN(supplierId)) {
        fetch(`http://localhost:8083/api/suppliers/${supplierId}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Supplier not found");
            }
          })
          .then((data) => {
            this.searchResult = data;
            this.searchNotFound = false;
          })
          .catch((error) => {
            console.error("Error fetching supplier:", error);
            this.searchResult = null;
            this.searchNotFound = true;
          });
      } else {
        console.error("Invalid supplier ID");
        this.searchResult = null;
        this.searchNotFound = true;
      }
    },
  },
  mounted() {
    this.fetchSuppliers();
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
