<script>
import axios from "axios";
import { resetForm, store } from "../store.js";
import AppLoader from "../components/AppLoader.vue";
import { RouterLink } from "vue-router";
export default {
  name: "LoginView",
  components: {
    AppLoader,
  },
  data() {
    return {
      resetForm,
      store,
      formData: {
        email: null,
        password: null,
      },
      formErrors: null,
      error: null,
      isLoading: null,
    };
  },

  computed: {
    user() {
      return store.user;
    },
  },

  methods: {
    async login() {
      this.isLoading = true;
      this.formErrors = null;

      try {
        await axios.get(`${store.backendUrl}/sanctum/csrf-cookie`);
        let res = await axios.post(
          `${store.backendUrl}/api/login`,
          this.formData
        );
        if (res.data.success) {
          resetForm(this.formData);
          store.user = res.data.user;
        }
      } catch (err) {
        console.error(err);
        store.user = null;
        if (err.response?.status === 422) {
          this.formErrors = err.response.data.errors;
        } else {
          this.error = err.message;
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
<template>
  <main class="container mx-auto pt-12 pb-24">
    <div v-if="!user" class="text-center">
      <h2 class="font-medium text-5xl mb-12">
        Login to see and manage your trips!
      </h2>
      <div
        class="login-box border-y-4 border-orange-500 w-full bg-white md:w-1/3 max-w-lg mx-auto"
      >
        <form
          v-if="!isLoading"
          class="flex flex-col items-center"
          @submit.prevent="login"
        >
          <p class="text-red-500 text-2xl mb-6 font-medium">{{ error }}</p>

          <div class="flex flex-col items-center mb-8">
            <label class="text-2xl mb-4" for="email">Type your email</label>
            <input
              class="bg-orange-50 p-2 rounded-lg text-lg"
              v-model="formData.email"
              type="text"
              name="email"
              placeholder="email"
            />
            <p v-if="formErrors?.email" class="text-red-500">
              {{ formErrors.email[0] }}
            </p>
          </div>
          <div class="flex flex-col items-center mb-6">
            <label class="text-2xl mb-4" for="password"
              >Type your password</label
            >
            <input
              class="bg-orange-50 p-2 rounded-lg text-lg"
              v-model="formData.password"
              type="text"
              name="password"
              placeholder="password"
            />
            <p v-if="formErrors?.password" class="text-red-500">
              {{ formErrors.password[0] }}
            </p>
          </div>
          <button
            class="bg-orange-500 text-lg font-medium text-white p-3 rounded-lg mb-3"
            type="submit"
          >
            Login
          </button>
          <p class="text-orange-600 text-lg">
            Not registered?
            <RouterLink :to="{ name: 'register' }" class="underline"
              >Click here</RouterLink
            >
          </p>
        </form>

        <AppLoader v-if="isLoading" :minHeight="400" />
      </div>
    </div>

    <div class="py-12" v-else>
      <h2 class="text-center font-semibold text-7xl">Hello {{ user.name }}!</h2>
    </div>
  </main>
</template>
<style scoped>
.login-box {
  box-shadow: 0 0 10px -2px;
  border-radius: 20px;
  padding: 3rem 1rem;

  & input {
    width: 300px;
  }
}
</style>
