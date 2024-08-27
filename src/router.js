import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./pages/HomeView.vue";
import LoginView from "./pages/LoginView.vue";
import RegisterView from "./pages/RegisterView.vue";
import TripsView from "./pages/TripsView.vue";
import AddTripView from "./pages/AddTripView.vue";

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

  {
    path: "/trips",
    name: "trips",
    component: TripsView,
  },

  {
    path: "/add-trip",
    name: "add-trip",
    component: AddTripView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
