import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import NetworkView from "@/views/NetworkView";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/network",
    name: "NetworkView",
    component: NetworkView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
