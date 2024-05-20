<template>
  <div>
    <h1 class="header">Notifications</h1>
    <div v-if="notification">
      <AllNotification :notification="notification" />
    </div>
  </div>
</template>

<script>
import AllNotification from "./AllNotification.vue";

export default {
  name: "NotificationView",
  components: {
    AllNotification,
  },
  data() {
    return {
      notification: null,
    };
  },
  methods: {
    fetchNotification() {
      fetch(`http://localhost:8089/api/notifications`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            this.notification = data;
          }
        })
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.fetchNotification();
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
</style>
