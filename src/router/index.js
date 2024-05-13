import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
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
    component: () => import("../views/OrderView.vue"),
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
