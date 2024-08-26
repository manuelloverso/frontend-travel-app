import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./pages/HomeView.vue";
import LoginView from "./pages/LoginView.vue";
import RegisterView from "./pages/RegisterView.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/login",
    name: "login",
    component: LoginView,
  },

  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
