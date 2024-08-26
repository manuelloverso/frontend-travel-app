<script>
import AddTripForm from "../components/AddTripForm.vue";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";

export default {
  name: "HomeView",
  components: {
    AddTripForm,
    LoginForm,
    RegisterForm,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <main class="container mx-auto">
    <RegisterForm />
    <LoginForm />
    <AddTripForm />
  </main>
</template>
<style scoped></style>
