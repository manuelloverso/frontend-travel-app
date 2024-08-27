<script>
import AddTripForm from "../components/AddTripForm.vue";
import LoginAlertMessage from "../components/LoginAlertMessage.vue";
import { store } from "../store";

export default {
  name: "AddTripView",
  components: {
    AddTripForm,
    LoginAlertMessage,
  },
  data() {
    return {
      store,
      authorized: true,
    };
  },
};
</script>
<template>
  <main class="container mx-auto py-12">
    <div v-if="store.isAuthorized">
      <AddTripForm />
    </div>

    <div v-else>
      <LoginAlertMessage />
    </div>
  </main>
</template>
<style scoped></style>
