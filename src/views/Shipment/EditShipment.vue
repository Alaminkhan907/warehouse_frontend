<template>
  <div>
    <h1 class="header">Edit Shipment</h1>
    <form @submit.prevent="updateShipment">
      <div class="form-group">
        <label for="orderId">Order ID</label>
        <input type="number" v-model="shipment.orderId" required />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <input type="text" v-model="shipment.status" required />
      </div>
      <div class="form-group">
        <label for="shipDate">Ship Date</label>
        <input type="date" v-model="shipment.shipDate" required />
      </div>
      <button type="submit" class="btn submit-btn">Update</button>
    </form>
  </div>
</template>

<script>
import { getAuthToken } from "@/utils";
export default {
  name: "EditShipment",
  data() {
    return {
      shipment: {
        orderId: null,
        status: "",
        shipDate: null,
      },
    };
  },
  methods: {
    fetchShipment() {
      const shipmentId = this.$route.params.id;
      fetch(`http://localhost:8086/api/shipments/${shipmentId}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.shipment = data;
        })
        .catch((err) => console.log(err.message));
    },
    updateShipment() {
      const shipmentId = this.$route.params.id;
      fetch(`http://localhost:8086/api/shipments/${shipmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAuthToken(),
        },
        body: JSON.stringify(this.shipment),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to update shipment");
          }
        })
        .then((data) => {
          console.log("Shipment updated:", data);
          this.$router.push({ name: "ShipmentView" });
        })
        .catch((error) => {
          console.error("Error updating shipment:", error);
        });
    },
  },
  mounted() {
    this.fetchShipment();
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

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
