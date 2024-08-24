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
      errors: null,
      success: null,
    };
  },

  methods: {
    submitTrip() {
      this.errors = null;
      this.success = null;
      axios
        .post("http://127.0.0.1:8000/api/trips/create", this.tripForm)
        .then((res) => {
          {
            console.log(res);
            if (res.data.success) this.success = true;
          }
        })
        .catch((err) => {
          console.error(err);
          this.errors = err.response.data.errors;
        });
    },

    justTest() {
      axios
        .get("http://localhost:8000/sanctum/csrf-cookie")
        .then((response) => {
          console.log(response);
          axios.get("http://localhost:8000/api/user").then((response) => {
            console.log(response);
          });
        });
    },
  },
};
</script>
<template>
  <button @click="justTest" class="bg-black">cliccami</button>
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
    </div>

    <div>
      <!-- Departure date -->
      <label for="departure_date">Departure Date</label>
      <input
        v-model="tripForm.departure_date"
        name="departure_date"
        type="date"
      />
    </div>

    <div>
      <!-- Trip Duration -->
      <label for="trip_duration">Days on trip</label>
      <input
        v-model="tripForm.trip_duration"
        name="trip_duration"
        type="number"
      />
    </div>

    <div>
      <!-- Number of people on trip -->
      <label for="number_of_people">Number of people on trip</label>
      <input
        v-model="tripForm.number_of_people"
        name="number_of_people"
        type="number"
      />
    </div>

    <div>
      <!-- Budget -->
      <label for="available_budget">Available budget</label>
      <input
        v-model="tripForm.available_budget"
        name="available_budget"
        type="number"
      />
    </div>

    <button type="submit" class="bg-red-800 p-2 rounded-xl">Add trip</button>
  </form>

  <p v-if="errors" class="text-xl p-5 font-semibold text-red-500">
    {{ errors }}
  </p>

  <p v-if="success" class="text-xl p-5 font-semibold text-green-500">
    Trip has been saved
  </p>
</template>
<style scoped></style>
