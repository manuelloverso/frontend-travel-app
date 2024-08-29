import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./pages/HomeView.vue";
import LoginView from "./pages/LoginView.vue";
import RegisterView from "./pages/RegisterView.vue";
import TripsView from "./pages/TripsView.vue";
import AddTripView from "./pages/AddTripView.vue";
import SingleTripView from "./pages/SingleTripView.vue";
import NotFound from "./pages/NotFound.vue";

export const routes = [
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },

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

  {
    path: "/trips/:id",
    name: "SingleTrip",
    component: SingleTripView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
