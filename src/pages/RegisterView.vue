<script>
import axios from "axios";
import { resetForm, store } from "../store";
import AppLoader from "../components/AppLoader.vue";

export default {
  name: "RegisterView",
  components: {
    AppLoader,
  },
  data() {
    return {
      store,
      resetForm,
      formData: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
      formErrors: null,
      error: null,
      registered: null,
      isLoading: false,
    };
  },

  computed: {
    user() {
      return store.user;
    },
  },

  methods: {
    async register() {
      this.isLoading = true;
      this.registered = null;
      this.error = null;
      this.formErrors = null;

      try {
        await axios.get(`${store.backendUrl}/sanctum/csrf-cookie`);
        let res = await axios.post(
          `${store.backendUrl}/api/register`,
          this.formData
        );

        if (res.data.success) {
          this.registered = true;
          store.setAuthStatus(res.data.user, true, false);
          resetForm(this.formData);
        }
      } catch (err) {
        console.error(err);
        store.setAuthStatus(null, false, false);
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

  mounted() {},
};
</script>
<template>
  <main class="container mx-auto pt-12 pb-24">
    <div v-if="!user" class="text-center">
      <h2 class="font-medium text-5xl mb-12">
        Register to add and manage your trips!
      </h2>
      <div
        class="register-box bg-white border-y-4 border-orange-500 w-full md:w-1/3 max-w-lg mx-auto"
      >
        <form
          v-if="!isLoading"
          class="flex flex-col items-center"
          @submit.prevent="register"
        >
          <p class="text-red-500 text-2xl mb-6 font-medium">{{ error }}</p>
          <div class="flex flex-col items-center mb-8">
            <label class="text-2xl mb-4" for="name">Type your name</label>
            <input
              class="bg-orange-50 p-2 rounded-lg text-lg"
              v-model="formData.name"
              type="text"
              name="name"
              placeholder="name"
            />
            <p v-if="formErrors?.name" class="text-red-500">
              {{ formErrors.name[0] }}
            </p>
          </div>
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
          <div class="flex flex-col items-center mb-8">
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

          <div class="flex flex-col items-center mb-8">
            <label class="text-2xl mb-4" for="password_confirmation"
              >Confirm your password</label
            >
            <input
              class="bg-orange-50 p-2 rounded-lg text-lg"
              v-model="formData.password_confirmation"
              type="text"
              name="password_confirmation"
              placeholder="confirm password"
            />
            <p v-if="formErrors?.password_confirmation" class="text-red-500">
              {{ formErrors.password_confirmation[0] }}
            </p>
          </div>
          <button
            class="bg-orange-500 text-lg font-medium text-white p-3 rounded-lg mb-3"
            type="submit"
          >
            Confirm
          </button>

          <p class="text-orange-600 text-lg">
            Already registered?
            <RouterLink :to="{ name: 'login' }" class="underline"
              >Login here</RouterLink
            >
          </p>
        </form>
        <p class="text-red-500 text-xl">{{ error }}</p>
        <h2 class="text-3xl font-bold" v-if="store.user">
          hello {{ store.user.name }}
        </h2>

        <AppLoader v-if="isLoading" :minHeight="600" />
      </div>
    </div>

    <div class="py-12" v-else>
      <h2 class="text-center font-semibold text-7xl">
        Welcome {{ user.name }}!
      </h2>
    </div>
  </main>
</template>
<style scoped>
.register-box {
  box-shadow: 0 0 10px -2px;
  border-radius: 20px;
  padding: 3rem 1rem;

  & input {
    width: 300px;
  }
}
</style>
