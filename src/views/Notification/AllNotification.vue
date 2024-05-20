<template>
  <div class="notification-container">
    <div class="notification-details">
      <div class="notification-info">
        <ul>
          <li>Id:{{ notification.id }}</li>
          <li>Timestamp: {{ notification.timestamp }}</li>
          <li>Priority: {{ notification.priority }}</li>
          <li>Type: {{ notification.type }}</li>
          <li>Title: {{ notification.title }}</li>
          <li>Message: {{ notification.message }}</li>
          <li>Email Address: {{ notification.emailAddress }}</li>
          <li>Sent: {{ notification.sent }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notification"],
};
</script>

<style scoped>
.notification-container {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notification-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.notification-info > ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.notification-info > ul > li {
  padding: 5px 0;
  text-align: left;
}

.notification-actions {
  display: flex;
  gap: 10px;
}
</style>
