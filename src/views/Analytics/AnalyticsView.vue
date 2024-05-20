<template>
  <div>
    <h1 class="header">Analytics View</h1>
    <div id="dashboard">
      <div class="chart-box custom-card">
        <div class="card-icon">
          <i class="fas fa-box"></i>
        </div>
        <div class="card-content">
          <h3 class="card-title">Number of Customer</h3>
          <p class="card-text">{{ NumberOfCustomers }}</p>
        </div>
      </div>
      <div class="chart-box custom-card">
        <div class="card-icon">
          <i class="fas fa-box"></i>
        </div>
        <div class="card-content">
          <h3 class="card-title">Current Active order</h3>
          <p class="card-text">{{ NumberOfOrder }}</p>
        </div>
      </div>
      <div class="chart-box custom-card">
        <div class="card-icon">
          <i class="fas fa-box"> </i>
        </div>
        <div class="card-content">
          <h3 class="card-title">Number Inventory Items</h3>
          <p class="card-text">{{ NumberOfInventory }}</p>
        </div>
      </div>

      <div>
        <h2>Last sell</h2>
        <div class="chart-box">
          <canvas ref="lineChart1" width="400" height="200"></canvas>
        </div>
      </div>
      <div>
        <h2>Last buy</h2>
        <div class="chart-box">
          <canvas ref="lineChart2" width="400" height="200"></canvas>
        </div>
      </div>
      <div>
        <h2>Cost of shipping</h2>
        <div class="chart-box">
          <canvas ref="barChart" width="400" height="200"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";

export default {
  name: "analyticsView",
  data() {
    return {
      lineChart1: null,
      lineChart2: null,
      barChart: null,
      NumberOfCustomers: 0,
      NumberOfInventory: 0,
      NumberOfOrder: 0,
    };
  },
  mounted() {
    this.renderLineChart1();
    this.renderLineChart2();
    this.renderBarChart();
    this.fetchNumberOfCustomers();
    this.fetchNumberOfInventory();
    this.fetchNumberOfOrder();
  },
  methods: {
    fetchNumberOfCustomers() {
      fetch("http://localhost:8081/api/analytics/customers")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.NumberOfCustomers = data.length;
        })
        .catch((error) =>
          console.error("Error fetching number of customers:", error)
        );
    },
    fetchNumberOfInventory() {
      fetch("http://localhost:8081/api/analytics/inventory")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.NumberOfInventory = data.length;
        })
        .catch((error) =>
          console.error("Error fetching number of customers:", error)
        );
    },
    fetchNumberOfOrder() {
      fetch("http://localhost:8081/api/analytics/orders")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.NumberOfOrder = data.length;
        })
        .catch((error) =>
          console.error("Error fetching number of customers:", error)
        );
    },
    renderLineChart1() {
      const ctx = this.$refs.lineChart1.getContext("2d");
      this.lineChart1 = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Line Chart 1",
              backgroundColor: "rgba(99, 179, 237, 0.4)",
              borderColor: "#63b3ed",
              data: [10, 20, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
    renderLineChart2() {
      const ctx = this.$refs.lineChart2.getContext("2d");
      this.lineChart2 = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Line Chart 2",
              backgroundColor: "rgba(198, 198, 198, 0.4)",
              borderColor: "#f7fafc",
              data: [10, 20, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
    renderBarChart() {
      const ctx = this.$refs.barChart.getContext("2d");
      this.barChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Bar Chart",
              backgroundColor: "rgba(99, 179, 237, 0.4)",
              borderColor: "#63b3ed",
              data: [10, 20, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
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
  margin-bottom: 2%;
}
#dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.chart-box {
  flex: 1 1 calc(33.33% - 20px);
  margin: 10px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.custom-info-box {
  padding: 20px;
  background-color: #f7fafc;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
}

.custom-card {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 20px;
  width: 300px; /* Adjust width as needed */
}

.card-icon {
  background-color: #f7fafc;
  border-radius: 50%;
  padding: 15px;
  margin-right: 20px;
}

.card-icon i {
  color: #1abc9c; /* Adjust icon color as needed */
  font-size: 24px;
}

.card-content {
  flex-grow: 1;
}

.card-title {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
}

.card-text {
  margin: 0;
  font-size: 24px;
}
</style>
