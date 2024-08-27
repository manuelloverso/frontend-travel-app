<script>
import axios from "axios";
import { store } from "../store";
import AppLoader from "./AppLoader.vue";

export default {
  name: "AddTripForm",
  components: { AppLoader },
  data() {
    return {
      store,
      trips: null,
      tripForm: {
        name: null,
        destination: null,
        departure_date: null,
        trip_duration: null,
        number_of_people: null,
        available_budget: null,
      },
      error: null,
      formErrors: null,
      isLoading: null,
    };
  },

  computed: {
    isFirstTrip() {
      return store.trips.length === 0;
    },
  },

  methods: {
    async submitTrip() {
      this.isLoading = true;
      this.formErrors = null;
      this.error = null;
      try {
        await axios.get(`${store.backendUrl}/sanctum/csrf-cookie`);

        const res = await axios.post(
          `${store.backendUrl}/api/trip`,
          this.tripForm
        );
        if (res.data.success) {
          this.$router.push({ name: "trips" });
          /* add a toast notification */
        } else {
          this.error = res.data.message;
          store.setAuthStatus(null, false, true);
        }
      } catch (err) {
        store.setAuthStatus(null, false, true);
        console.error(err);
        if (err.response?.status === 422) {
          this.formErrors = err.response.data.errors;
        } else if (err.response?.status === 401) {
          this.error = err.response.data.message;
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
  <h2 class="text-5xl font-semibold text-center mb-12">
    {{ isFirstTrip ? "Add your first trip here." : "Add another trip here." }}
  </h2>
  <div class="form-box bg-white rounded-xl">
    <div v-if="isLoading"><AppLoader :minHeight="800" /></div>
    <div v-else class="flex flex-wrap">
      <div class="w-1/3 bg-orange-500 text-white rounded-xl px-8 pt-24">
        <h3 class="text-4xl font-medium mb-2 leading-snug">
          Craft Your Adventure, Day by Day.
        </h3>
        <div class="icon-box mx-auto p-8 bg-white rounded-3xl w-32 mb-16">
          <img class="w-full" src="/public/img/plane-solid.svg" alt="" />
        </div>
        <h4 class="text-4xl font-medium mb-2 leading-snug">
          Create, Share, and Embark on the Perfect Trip.
        </h4>
        <div class="icon-box mx-auto p-8 bg-white rounded-3xl w-32 mb-16">
          <img
            class="w-full"
            src="/public/img/umbrella-beach-solid.svg"
            alt=""
          />
        </div>

        <h4 class="text-4xl font-medium mb-2 leading-snug">
          Let your family or friends know what's in your mind for this amazing
          experience
        </h4>
        <div class="icon-box mx-auto p-8 bg-white rounded-3xl w-32 mb-16">
          <img
            class="w-full"
            src="/public/img/people-arrows-solid.svg"
            alt=""
          />
        </div>
      </div>

      <form
        class="w-2/3 trip-form container mx-auto p-12"
        @submit.prevent="submitTrip"
      >
        <h4 class="text-xl mb-8">
          Fields marked with an asterisk (*) are required.
        </h4>

        <p v-if="error" class="text-2xl py-4 font-semibold text-red-500">
          {{ error }}
        </p>
        <div class="input-group">
          <!-- Name -->
          <label for="name">Add a name for the trip*:</label>
          <input
            v-model="tripForm.name"
            name="name"
            type="text"
            placeholder="Trip to London"
          />
          <p class="text-red-500 text-xl" v-if="formErrors?.name">
            {{ formErrors.name[0] }}
          </p>
        </div>

        <div class="input-group">
          <!-- Destination -->
          <label for="destination">Add a destination*:</label>
          <input
            v-model="tripForm.destination"
            name="destination"
            type="text"
            placeholder="London/England"
          />
          <p class="text-red-500 text-xl" v-if="formErrors?.destination">
            {{ formErrors.destination[0] }}
          </p>
        </div>

        <div class="input-group">
          <!-- Departure date -->
          <label for="departure_date">Departure Date:</label>
          <input
            v-model="tripForm.departure_date"
            name="departure_date"
            type="date"
          />
          <p class="text-red-500 text-xl" v-if="formErrors?.departure_date">
            {{ formErrors.departure_date[0] }}
          </p>
        </div>

        <div class="input-group">
          <!-- Trip Duration -->
          <label for="trip_duration">Days on trip:</label>
          <input
            class="w-20"
            v-model="tripForm.trip_duration"
            name="trip_duration"
            type="number"
            placeholder="7"
          />
          <p class="text-red-500 text-xl" v-if="formErrors?.trip_duration">
            {{ formErrors.trip_duration[0] }}
          </p>
        </div>

        <div class="input-group">
          <!-- Number of people on trip -->
          <label for="number_of_people">Number of people on trip:</label>
          <input
            class="w-20"
            v-model="tripForm.number_of_people"
            name="number_of_people"
            type="number"
            placeholder="4"
          />
          <p class="text-red-500 text-xl" v-if="formErrors?.number_of_people">
            {{ formErrors.number_of_people[0] }}
          </p>
        </div>

        <div class="input-group">
          <!-- Budget -->
          <label for="available_budget">Available budget (€):</label>
          <input
            class="w-20"
            v-model="tripForm.available_budget"
            name="available_budget"
            type="number"
            placeholder="500"
          />
          <p class="text-red-500 text-xl" v-if="formErrors?.available_budget">
            {{ formErrors.available_budget[0] }}
          </p>
        </div>

        <div class="input-group">
          <!-- Image -->
          <label for="image">Add an image (max 4MB):</label>
          <input name="image" type="file" />
          <p class="text-red-500 text-xl" v-if="formErrors?.image">
            {{ formErrors.image[0] }}
          </p>
        </div>

        <button type="submit" class="submit-btn">Add trip</button>
      </form>
    </div>
  </div>
</template>
<style scoped>
.icon-box {
  & img {
    transition: transform 0.3s ease-in-out;
  }
  &:hover {
    & img {
      transform: scale(1.2) rotateY(180deg);
    }
  }
}

.form-box {
  box-shadow: 0 0 10px -4px;
  .input-group {
    margin-bottom: 2rem;
    & label {
      display: block;
      margin-bottom: 5px;
      font-size: 1.2rem;
    }
    & input {
      border: 1px solid rgb(192, 192, 192);
      border-radius: 10px;
      padding: 10px;
      font-size: 1.2rem;
    }
  }

  .submit-btn {
    background-color: var(--accent);
    border: 1px solid var(--accent);

    border-radius: 15px;
    color: white;
    padding: 10px 40px;
    font-size: 1.3rem;
    transition: 0.3s ease;

    &:hover {
      background-color: white;
      color: var(--accent);
    }
  }
}
</style>
