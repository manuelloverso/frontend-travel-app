<script>
import axios from "axios";
import AddTripForm from "../components/AddTripForm.vue";
import LoginAlertMessage from "../components/LoginAlertMessage.vue";
import OrangeBtn from "../components/OrangeBtn.vue";
import TripCard from "../components/TripCard.vue";
import { store } from "../store";
import AppLoader from "../components/AppLoader.vue";
import DeleteTripModal from "../components/DeleteTripModal.vue";

export default {
  name: "TripsView",
  components: {
    AppLoader,
    AddTripForm,
    OrangeBtn,
    LoginAlertMessage,
    TripCard,
    DeleteTripModal,
  },
  data() {
    return {
      store,
      error: null,
      isLoading: true,
      noTripsFOund: false,
    };
  },

  computed: {
    trips() {
      return store.trips;
    },
  },

  methods: {
    async fetchTrips() {
      try {
        await axios.get(`${store.backendUrl}/sanctum/csrf-cookie`);

        const res = await axios.get(`${store.backendUrl}/api/trips`);
        console.log(res);

        if (res.data.success) {
          store.trips = res.data.response;
        } else {
          /* in the case the user has no trips redirects to the add trip form */
          this.$router.push("add-trip");
        }
      } catch (err) {
        store.trips = [];
        console.error(err);
        if (err.response?.status === 401) {
          /* still have to decide wether to set expired on true or not */
          store.setAuthStatus(null, false, true);
        } else {
          this.error = err.message;
        }
      } finally {
        this.isLoading = false;
      }
    },
  },

  watch: {
    "store.isAuthorized"(newVal) {
      if (newVal) this.fetchTrips();
    },
  },

  mounted() {
    if (store.isAuthorized) this.fetchTrips();
  },
};
</script>
<template>
  <main class="container mx-auto">
    <!-- Handle the case when the user is not authenticated -->
    <div v-if="!store.isAuthorized">
      <LoginAlertMessage />
    </div>

    <!-- Loader -->
    <AppLoader v-else-if="isLoading" :minHeight="500" />

    <!-- showed if the user is logged in -->
    <div v-else>
      <!-- Here handle the case where the trips are fetched correctly and there is at least one trip -->
      <div v-if="trips.length > 0">
        <h2 class="text-center font-medium text-5xl">Here's your Trips!</h2>

        <div class="text-end mb-24">
          <RouterLink :to="{ name: 'add-trip' }">
            <OrangeBtn
              :isSubmit="false"
              :isOutline="true"
              text="Add a new trip"
            />
          </RouterLink>
        </div>

        <div class="trips-container flex flex-col gap-24">
          <TripCard v-for="trip in trips" :tripObj="trip" :key="trip.id" />
        </div>
      </div>

      <!-- Here show an error message if the fetch failed  -->
      <div
        class="text-3xl vh80 flex items-centr justify-center font-semibold text-center text-red-500"
        v-else-if="error"
      >
        <span>{{ error }}</span>
      </div>
    </div>
  </main>

  <!-- confirm modal to delete trip -->
  <template v-if="store.deleteTripModal.isOpen">
    <DeleteTripModal />
  </template>
</template>
<style scoped></style>
