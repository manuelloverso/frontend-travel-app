<script>
import AddTripForm from "../components/AddTripForm.vue";
import { store } from "../store";
export default {
  name: "TripsView",
  components: {
    AddTripForm,
  },
  data() {
    return {
      store,
      authorized: false,
    };
  },

  mounted() {
    if (store.user) {
      this.authorized = true;
    }
  },
};
</script>
<template>
  <main class="container mx-auto py-12">
    <div v-if="!authorized">
      <h2 class="text-4xl font-semibold">You're not logged in 😞</h2>
      <RouterLink
        class="text-lg text-orange-700 font-medium underline"
        :to="{ name: 'login' }"
        >Login or register here</RouterLink
      >
    </div>

    <!-- showed if the user is logged in -->
    <div v-else>
      <template v-if="!trips">
        <div>
          <AddTripForm />
        </div>
      </template>
    </div>
  </main>
</template>
<style scoped></style>
