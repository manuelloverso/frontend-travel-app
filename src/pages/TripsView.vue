<script>
import axios from "axios";
import AddTripForm from "../components/AddTripForm.vue";
import LoginAlertMessage from "../components/LoginAlertMessage.vue";
import OrangeBtn from "../components/OrangeBtn.vue";
import TripCard from "../components/TripCard.vue";
import { store } from "../store";

export default {
  name: "TripsView",
  components: {
    AddTripForm,
    OrangeBtn,
    LoginAlertMessage,
    TripCard,
  },
  data() {
    return {
      store,
      trips: [],
      error: null,
    };
  },

  methods: {
    async fetchTrips() {
      try {
        await axios.get(`${store.backendUrl}/sanctum/csrf-cookie`);

        const res = await axios.get(`${store.backendUrl}/api/trips`);
        console.log(res);

        if (res.data.success) {
          this.trips = res.data.response;
        } else {
          this.error = res.data.response;
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401)
          /* still have to decide wether to set expired on true or not */
          store.setAuthStatus(null, false, true);
      }
    },
  },

  mounted() {
    /* if(store.isAuthorized) this.fetchTrips() */
  },
};
</script>
<template>
  <main class="container mx-auto py-12">
    <button @click="fetchTrips" class="p-3 bg-red-500 text-white text-4xl">
      Fetch trips
    </button>
    <div v-if="!store.isAuthorized">
      <LoginAlertMessage />
    </div>

    <!-- showed if the user is logged in -->
    <div v-else>
      <!-- Show here the trips -->
      <RouterLink :to="{ name: 'add-trip' }">
        <OrangeBtn :isSubmit="false" :isOutline="true" text="Add a new trip" />
      </RouterLink>

      <div class="trips-container flex flex-col gap-24">
        <TripCard v-for="trip in trips" :tripObj="trip" />
      </div>
    </div>
  </main>
</template>
<style scoped></style>
