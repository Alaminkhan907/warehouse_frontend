<template>
  <div>
    <h1 class="header">You are logged out. Please log in again.</h1>
  </div>
</template>

<script>
export default {
  name: "UserLogout",
  created() {
    this.logout();
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      setTimeout(() => {
        this.$router.push("/login");
      }, 2000);
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
}
</style>
