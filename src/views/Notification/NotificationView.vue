<template>
  <div>
    <h1 class="header">Notifications</h1>
    <div v-if="notifications && notifications.length">
      <AllNotification  
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification" 
      />
    </div>
    <div v-else>
      No notifications available.
    </div>
  </div>
</template>

<script>
import AllNotification from "./AllNotification.vue";
import { getAuthToken } from "@/utils";

export default {
  name: "NotificationView",
  components: {
    AllNotification,
  },
  data() {
    return {
      notifications: [],
    };
  },
  methods: {
    fetchNotifications() {
      fetch(`http://localhost:8087/api/notifications`, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then(response => response.json())
      .then(data => {
        this.notifications = data;
      })
      .catch(err => console.log(err.message));
    },
  },
  mounted() {
    this.fetchNotifications();
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
