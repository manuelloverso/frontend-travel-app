<script>
import { store } from "../store.js";
import axios from "axios";
import AppLoader from "../components/AppLoader.vue";
import LoginAlertMessage from "../components/LoginAlertMessage.vue";
import TripShow from "../components/TripShow.vue";
import TripDays from "../components/TripDays.vue";
import AddDayModal from "../components/AddDayModal.vue";
import AddStopModal from "../components/AddStopModal.vue";
import DeleteStopModal from "../components/deleteStopModal.vue";
import EditDayModal from "../components/EditDayModal.vue";
import EditStopModal from "../components/EditStopModal.vue";

export default {
  name: "SingleTripView",
  components: {
    AppLoader,
    LoginAlertMessage,
    TripShow,
    TripDays,
    AddDayModal,
    AddStopModal,
    DeleteStopModal,
    EditDayModal,
    EditStopModal,
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
      this.isLoading = true;
      try {
        const res = await axios.get(
          `${store.backendUrl}/api/trips/${this.tripId}`
        );
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

  beforeRouteUpdate(to, from, next) {
    this.fetchTrip();
    next();
  },
};
</script>
<template>
  <main>
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

  <!-- Add Day Modal -->
  <template v-if="store.dayModal.isOpen">
    <AddDayModal @dayAdded="fetchTrip" />
  </template>

  <!-- Edit Day Modal -->
  <template v-if="store.editDayModal.isOpen">
    <EditDayModal @dayEdited="fetchTrip" />
  </template>

  <!-- Add stop Modal -->
  <template v-if="store.stopModal.isOpen">
    <AddStopModal @stopAdded="fetchTrip" />
  </template>

  <!-- Edit stop Modal -->
  <template v-if="store.editStopModal.isOpen">
    <EditStopModal @stopEdited="fetchTrip" />
  </template>

  <!-- delete stop Modal -->
  <template v-if="store.deleteStopModal.isOpen">
    <DeleteStopModal @stopDeleted="fetchTrip" />
  </template>
</template>
<style scoped></style>
