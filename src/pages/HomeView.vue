<script>
import AddTripForm from "../components/AddTripForm.vue";
import LoginForm from "../components/LoginForm.vue";

export default {
  name: "HomeView",
  components: {
    AddTripForm,
    LoginForm,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <main>
    <LoginForm />
  </main>
</template>
<style scoped></style>
