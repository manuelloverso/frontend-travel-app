<script>
import axios from "axios";

export default {
  name: "AddTripForm",
  data() {
    return {
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
      success: null,
    };
  },

  methods: {
    async submitTrip() {
      this.formErrors = null;
      this.error = null;
      this.success = null;
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");

        const res = await axios.post(
          "http://localhost:8000/api/trip",
          this.tripForm
        );
        if (res.data.success) {
          this.success = true;
          this.resetForm();
        } else {
          this.success = false;
          this.error = res.data.message;
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 422) {
          this.formErrors = err.response.data.errors;
        } else if (err.response?.status === 401) {
          this.error = err.response.data.message;
        } else {
          this.error = err.message;
        }
      }
    },

    resetForm() {
      this.tripForm = {
        name: null,
        destination: null,
        departure_date: null,
        trip_duration: null,
        number_of_people: null,
        available_budget: null,
      };
    },
  },
};
</script>
<template>
  <h2 class="font-medium text-2xl">Add Trip Form</h2>
  <form class="container mx-auto" @submit.prevent="submitTrip">
    <div>
      <!-- Name -->
      <label for="name">Add a name for the trip</label>
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

    <div>
      <!-- Destination -->
      <label for="destination">Add a destination</label>
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

    <div>
      <!-- Departure date -->
      <label for="departure_date">Departure Date</label>
      <input
        v-model="tripForm.departure_date"
        name="departure_date"
        type="date"
      />
      <p class="text-red-500 text-xl" v-if="formErrors?.departure_date">
        {{ formErrors.departure_date[0] }}
      </p>
    </div>

    <div>
      <!-- Trip Duration -->
      <label for="trip_duration">Days on trip</label>
      <input
        v-model="tripForm.trip_duration"
        name="trip_duration"
        type="number"
      />
      <p class="text-red-500 text-xl" v-if="formErrors?.trip_duration">
        {{ formErrors.trip_duration[0] }}
      </p>
    </div>

    <div>
      <!-- Number of people on trip -->
      <label for="number_of_people">Number of people on trip</label>
      <input
        v-model="tripForm.number_of_people"
        name="number_of_people"
        type="number"
      />
      <p class="text-red-500 text-xl" v-if="formErrors?.number_of_people">
        {{ formErrors.number_of_people[0] }}
      </p>
    </div>

    <div>
      <!-- Budget -->
      <label for="available_budget">Available budget</label>
      <input
        v-model="tripForm.available_budget"
        name="available_budget"
        type="number"
      />
      <p class="text-red-500 text-xl" v-if="formErrors?.available_budget">
        {{ formErrors.available_budget[0] }}
      </p>
    </div>

    <button type="submit" class="bg-red-800 p-2 rounded-xl text-white">
      Add trip
    </button>
  </form>

  <p v-if="error" class="text-xl p-5 font-semibold text-red-500">
    {{ error }}
  </p>

  <p v-if="success" class="text-xl p-5 font-semibold text-green-500">
    Trip has been saved
  </p>
</template>
<style scoped></style>
