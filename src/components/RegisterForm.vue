<script>
import axios from "axios";
import { store } from "../store";

export default {
  name: "RegisterForm",
  data() {
    return {
      store,
      data: {
        name: "chicco",
        email: "chicco@gmail.com",
        password: "password",
        password_confirmation: "password",
      },
      formErrors: null,
      error: null,
      registered: null,
    };
  },

  methods: {
    async register() {
      this.registered = null;
      this.error = null;
      this.formErrors = null;

      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");
        let res = await axios.post(
          "http://localhost:8000/api/register",
          this.data
        );

        if (res.data.success) {
          this.registered = true;
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
      }
    },
  },
};
</script>
<template>
  <h2 class="font-medium text-2xl">Register form</h2>
  <form @submit.prevent="register">
    <div>
      <label for="name">Type your name</label>
      <input v-model="data.name" type="text" name="name" placeholder="name" />
      <p v-if="formErrors?.name" class="text-red-500">
        {{ formErrors.name[0] }}
      </p>
    </div>
    <div>
      <label for="email">Type your email</label>
      <input
        v-model="data.email"
        type="text"
        name="email"
        placeholder="email"
      />
      <p v-if="formErrors?.email" class="text-red-500">
        {{ formErrors.email[0] }}
      </p>
    </div>
    <div>
      <label for="password">Type your password</label>
      <input
        v-model="data.password"
        type="text"
        name="password"
        placeholder="password"
      />
      <p v-if="formErrors?.password" class="text-red-500">
        {{ formErrors.password[0] }}
      </p>
    </div>

    <div>
      <label for="password_confirmation">Type your password_confirmation</label>
      <input
        v-model="data.password_confirmation"
        type="text"
        name="password_confirmation"
        placeholder="password_confirmation"
      />
      <p v-if="formErrors?.password_confirmation" class="text-red-500">
        {{ formErrors.password_confirmation[0] }}
      </p>
    </div>
    <button class="bg-red-800 text-white p-2 rounded-lg" type="submit">
      Confirm
    </button>
  </form>
  <p class="text-red-500 text-xl">{{ error }}</p>
  <h2 class="text-3xl font-bold" v-if="store.user">
    hello {{ store.user.name }}
  </h2>
</template>
<style scoped></style>
