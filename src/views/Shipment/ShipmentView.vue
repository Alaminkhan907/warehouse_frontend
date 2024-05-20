<template>
  <div>
    <h1 class="header">Shipments</h1>
    <div class="controls">
      <button class="btn add-btn" @click="redirectToCreateShipment">
        Create Shipment
      </button>
      <input
        type="text"
        v-model="searchId"
        placeholder="Search by Shipment ID"
        class="search-input"
      />
      <button class="btn search-btn" @click="searchShipment">Search</button>
    </div>
    <div v-if="searchResult">
      <p>Search Result</p>
      <AllShipment
        :shipment="searchResult"
        @edit="editShipment"
        @delete="deleteShipment"
      />
    </div>
    <div v-else-if="searchNotFound">
      <p>No shipment found with ID: {{ searchId }}</p>
    </div>
    <div v-else>
      <p class="subheading">All Shipments</p>
      <div>
        <AllShipment
          v-for="shipment in shipments"
          :key="shipment.id"
          :shipment="shipment"
          @edit="editShipment"
          @delete="deleteShipment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AllShipment from "./AllShipment.vue";

import { getAuthToken } from "@/utils";
export default {
  name: "ShipmentView",
  components: {
    AllShipment,
  },
  data() {
    return {
      shipments: [],
      searchId: "",
      searchResult: null,
      searchNotFound: false,
    };
  },
  methods: {
    fetchShipments() {
      fetch(`http://localhost:8086/api/shipments`, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
        .then((response) => response.json())
        .then((data) => (this.shipments = data))
        .catch((err) => console.log(err.message));
    },
    editShipment(shipmentId) {
      console.log("Shipment call from child received on parent", shipmentId);
      this.$router.push({ name: "EditShipment", params: { id: shipmentId } });
    },
    deleteShipment(shipmentId) {
      console.log("Delete Shipment Call on", shipmentId);
      fetch(`http://localhost:8086/api/shipments/${shipmentId}`, {
        method: "DELETE",
        headers: {
          Authorization: getAuthToken(),
        },
      })
        .then(() => {
          this.fetchShipments();
        })
        .catch((error) => {
          console.error("Error deleting shipment:", error);
        });
    },
    redirectToCreateShipment() {
      this.$router.push({ name: "AddShipment" });
    },
    searchShipment() {
      const shipmentId = parseInt(this.searchId);
      if (!isNaN(shipmentId)) {
        fetch(`http://localhost:8086/api/shipments/${shipmentId}`, {
          headers: {
            Authorization: getAuthToken(),
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Shipment not found");
            }
          })
          .then((data) => {
            this.searchResult = data;
            this.searchNotFound = false;
          })
          .catch((error) => {
            console.error("Error fetching shipment:", error);
            this.searchResult = null;
            this.searchNotFound = true;
          });
      } else {
        console.error("Invalid shipment ID");
        this.searchResult = null;
        this.searchNotFound = true;
      }
    },
  },
  mounted() {
    this.fetchShipments();
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
