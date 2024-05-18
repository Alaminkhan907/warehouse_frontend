import { createRouter, createWebHistory } from "vue-router";

import auth from "../auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Auth/HomeView.vue"),
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next("/login");
      } else {
        next();
      }
    },
  },

  {
    path: "/analytics",
    name: "Analytics",
    component: () => import("../views/Analytics/AnalyticsView.vue"),
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: () => import("../views/Inventory/InventoryView.vue"),
  },
  {
    path: "/AddInventory",
    name: "AddInventory",
    component: () => import("../views/Inventory/AddInventory.vue"),
  },
  {
    path: "/editInventory/:id",
    name: "EditInventory",
    component: () => import("../views/Inventory/editInventory.vue"),
  },

  {
    path: "/order",
    name: "Order",
    component: () => import("../views/Orders/OrderView.vue"),
  },
  {
    path: "/customer",
    name: "Customer",
    component: () => import("../views/Customer/CustomerView.vue"),
  },
  {
    path: "/shipment",
    name: "Shipment",
    component: () => import("../views/Shipment/ShipmentView.vue"),
  },
  {
    path: "/addShipment",
    name: "AddShipment",
    component: () => import("../views/Shipment/AddShipment.vue"),
  },
  {
    path: "/editShipment/:id",
    name: "EditShipment",
    component: () => import("../views/Shipment/EditShipment.vue"),
  },
  {
    path: "/supplier",
    name: "Supplier",
    component: () => import("../views/Supplier/SupplierView.vue"),
  },
  {
    path: "/notification",
    name: "Notification",
    component: () => import("../views/Notification/NotificationView.vue"),
  },
  {
    path: "/allcustomer",
    name: "Allcustomer",
    component: () => import("../views/Customer/AllCustomer.vue"),
  },
  {
    path: "/editcustomer/:id",
    name: "Editcustomer",
    component: () => import("../views/Customer/EditCustomer.vue"),
  },
  {
    path: "/addcustomer",
    name: "AddCustomer",
    component: () => import("../views/Customer/AddCustomer.vue"),
  },
  {
    path: "/allorder",
    name: "AllOrder",
    component: () => import("../views/Orders/AllOrder.vue"),
  },
  {
    path: "/editorder/:id",
    name: "EditOrder",
    component: () => import("../views/Orders/EditOrder.vue"),
  },
  {
    path: "/addorder",
    name: "AddOrder",
    component: () => import("../views/Orders/AddOrder.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/Auth/SignUp.vue"),
  },
  {
    path: "/login",
    name: "LogIn",
    component: () => import("../views/Auth/LogIn.vue"),
  },
  {
    path: "/aboutview",
    name: "AboutView",
    component: () => import("../views/Auth/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
