import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./pages/HomeView.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
