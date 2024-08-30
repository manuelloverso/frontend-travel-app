<script>
import { store } from "../store.js";
import axios from "axios";
import AppLoader from "../components/AppLoader.vue";
import LoginAlertMessage from "../components/LoginAlertMessage.vue";
import TripShow from "../components/TripShow.vue";
import TripDays from "../components/TripDays.vue";

export default {
  name: "SingleTripView",
  components: {
    AppLoader,
    LoginAlertMessage,
    TripShow,
    TripDays,
  },
  data() {
    return {
      store,
      tripId: null,
      trip: null,
      isLoading: true,
      failed: false,
      error: null,
    };
  },

  computed: {
    isAuthorized() {
      return store.isAuthorized;
    },
  },

  methods: {
    async fetchTrip() {
      try {
        const res = await axios.get(
          `${store.backendUrl}/api/trips/${this.tripId}`
        );
        console.log(res);
        if (res.data.success) {
          this.trip = res.data.response;
        } else {
          this.$router.push({ name: "NotFound" });
        }
      } catch (err) {
        console.error(err);
        this.failed = true;
        if (err.response?.status === 401) {
          store.setAuthStatus(null, false, true);
        } else {
          this.error = err.message;
        }
      } finally {
        this.isLoading = false;
      }
    },
  },

  mounted() {
    this.tripId = this.$route.params.id;
    this.fetchTrip();
  },
};
</script>
<template>
  <main class="py-24">
    <h3
      class="text-red-500 text-4xl font-semibold py-8 text-center"
      v-if="error"
    >
      {{ error }}
    </h3>
    <AppLoader v-if="isLoading" :minHeight="500" />
    <div v-else>
      <div v-if="!isAuthorized"><LoginAlertMessage /></div>
      <div v-if="isAuthorized && trip" class="trip">
        <TripShow :trip="trip" />

        <TripDays :trip="trip" />
      </div>
    </div>
  </main>
</template>
<style scoped></style>
