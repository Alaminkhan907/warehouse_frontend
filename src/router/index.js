import { createRouter, createWebHistory } from 'vue-router';

import auth from '../auth';

async function beforeEnter(_from, _to, next) {
  let authResult = await auth.authenticated();
  if (!authResult) {
    next('/login');
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Auth/HomeView.vue'),
    beforeEnter: beforeEnter,
  },

  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('../views/Analytics/AnalyticsView.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('../views/Inventory/InventoryView.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/AddInventory',
    name: 'AddInventory',
    component: () => import('../views/Inventory/AddInventory.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/editInventory/:id',
    name: 'EditInventory',
    component: () => import('../views/Inventory/editInventory.vue'),
    beforeEnter: beforeEnter,
  },

  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Orders/OrderView.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/customer',
    name: 'Customer',
    component: () => import('../views/Customer/CustomerView.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/shipment',
    name: 'Shipment',
    component: () => import('../views/Shipment/ShipmentView.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/addShipment',
    name: 'AddShipment',
    component: () => import('../views/Shipment/AddShipment.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/editShipment/:id',
    name: 'EditShipment',
    component: () => import('../views/Shipment/EditShipment.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/supplier',
    name: 'Supplier',
    component: () => import('../views/Supplier/SupplierView.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/AddSupplier',
    name: 'AddSupplier',
    component: () => import('../views/Supplier/AddSupplier.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/notification',
    name: 'Notification',
    component: () => import('../views/Notification/NotificationView.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/allcustomer',
    name: 'Allcustomer',
    component: () => import('../views/Customer/AllCustomer.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/editcustomer/:id',
    name: 'Editcustomer',
    component: () => import('../views/Customer/EditCustomer.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/addcustomer',
    name: 'AddCustomer',
    component: () => import('../views/Customer/AddCustomer.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/allorder',
    name: 'AllOrder',
    component: () => import('../views/Orders/AllOrder.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/editorder/:id',
    name: 'EditOrder',
    component: () => import('../views/Orders/EditOrder.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/addorder',
    name: 'AddOrder',
    component: () => import('../views/Orders/AddOrder.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/Auth/SignUp.vue'),
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/Auth/LogIn.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/Auth/LogOut.vue'),
    beforeEnter: beforeEnter,
  },
  {
    path: '/aboutview',
    name: 'AboutView',
    component: () => import('../views/Auth/AboutView.vue'),
    beforeEnter: beforeEnter,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
