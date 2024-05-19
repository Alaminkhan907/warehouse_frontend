<template>
  <sidebar-menu :items="items" />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import SidebarMenu from "@/components/SidebarMenu.vue";

export default {
  name: "App",
  components: {
    SidebarMenu,
  },
  data() {
    return {
      items: [
        {
          name: "Home",
          tooltip: "Mon tooltip Spécifique",
          icon: "bx-user",
          href: "/",
        },
        { name: "Analytics", icon: "bxs-analyse", href: "/analytics" },
        { name: "Inventory", icon: "bxs-bank", href: "/inventory" },
        { name: "Order", icon: "bxs-package", href: "/order" },
        { name: "Customer", icon: "bxs-user", href: "/customer" },
        { name: "Shipment", icon: "bxs-car", href: "/shipment" },
        { name: "Supplier", icon: "bxs-package", href: "/supplier" },
        {
          name: "Notification",
          icon: "bxs-chat",
          href: "/notification",
        },
        {
          isFooter: true,
          tooltip: "Log Out",
          icon: "bx-log-out",
          href: "/logout",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  /* Remove cursor "|" in html balise */
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  flex-basis: 100%;
  background-color: white;
  height: 100vh;
  overflow-y: auto;
}
</style>
