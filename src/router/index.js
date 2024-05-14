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
    component: () => import("../views/AnalyticsView.vue"),
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: () => import("../views/InventoryView.vue"),
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
    component: () => import("../views/ShipmentView.vue"),
  },
  {
    path: "/supplier",
    name: "Supplier",
    component: () => import("../views/SupplierView.vue"),
  },
  {
    path: "/notification",
    name: "Notification",
    component: () => import("../views/NotificationView.vue"),
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
