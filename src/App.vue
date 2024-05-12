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
        { name: "Analytics", icon: "bxs-user-detail", href: "/analytics" },
        { name: "Inventory", icon: "bxs-school", href: "/inventory" },
        { name: "Order", icon: "bxs-trophy", href: "/order" },
        { name: "Customer", icon: "bxs-trophy", href: "/customer" },
        { name: "Shipment", icon: "bxs-trophy", href: "/Shipment" },
        { name: "Supplier", icon: "bxs-star", href: "/supplier" },
        { name: "Notification", icon: "bxs-star", href: "/notification" },
        {
          isFooter: true,
          tooltip: "Vue.js LinkedIn page",
          icon: "bxl-linkedin",
          href: "https://www.linkedin.com/company/vuejsdevelopers",
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
