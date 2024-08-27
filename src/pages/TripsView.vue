<script>
import AddTripForm from "../components/AddTripForm.vue";
import LoginAlertMessage from "../components/LoginAlertMessage.vue";
import OrangeBtn from "../components/OrangeBtn.vue";
import { store } from "../store";
export default {
  name: "TripsView",
  components: {
    AddTripForm,
    OrangeBtn,
    LoginAlertMessage,
  },
  data() {
    return {
      store,
    };
  },

  mounted() {
    if (store.isAuthorized && store.trips.length === 0)
      this.$router.push({ name: "add-trip" });
  },
};
</script>
<template>
  <main class="container mx-auto py-12">
    <div v-if="!store.isAuthorized">
      <LoginAlertMessage />
    </div>

    <!-- showed if the user is logged in -->
    <div v-else>
      <!-- Show here the trips -->
      <h1>trips</h1>
      <RouterLink :to="{ name: 'add-trip' }">
        <OrangeBtn :isSubmit="false" :isOutline="true" text="Add a new trip" />
      </RouterLink>
    </div>
  </main>
</template>
<style scoped></style>
