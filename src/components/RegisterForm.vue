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
      errors: null,
    };
  },

  methods: {
    async register() {
      this.errors = null;
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");

      try {
        let res = await axios.post(
          "http://localhost:8000/api/register",
          this.data
        );
        console.log("register response", res);

        store.user = res.data.user;
      } catch (err) {
        console.error(err);
        store.user = null;
        this.errors = err.response.data.errors;
      }
    },
  },
};
</script>
<template>
  <form @submit.prevent="register">
    <div>
      <label for="name">Type your name</label>
      <input v-model="data.name" type="text" name="name" placeholder="name" />
      <p v-if="errors?.name" class="text-red-500">
        {{ errors.name[0] }}
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
      <p v-if="errors?.email" class="text-red-500">
        {{ errors.email[0] }}
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
      <p v-if="errors?.password" class="text-red-500">
        {{ errors.password[0] }}
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
      <p v-if="errors?.password_confirmation" class="text-red-500">
        {{ errors.password_confirmation[0] }}
      </p>
    </div>
    <button type="submit">Send</button>
  </form>
  <h2 class="text-3xl font-bold" v-if="store.user">
    hello {{ store.user.name }}
  </h2>
</template>
<style scoped></style>
