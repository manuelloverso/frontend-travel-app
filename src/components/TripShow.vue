<script>
export default {
  name: "TripShow",
  props: {
    trip: Object,
  },
  data() {
    return {
      daysDifferenceClass: null,
    };
  },

  methods: {
    getDaysDifference() {
      const today = new Date();
      const formattedToday = today.toISOString().split("T")[0]; /* YYYY-MM-DD */

      if (this.trip.departure_date > formattedToday) {
        /* trip is in the future */
        const timeDifference =
          new Date(this.trip.departure_date) - new Date(formattedToday);
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24)
        );
        return `Do you have everything ready? You'll take off in ${daysDifference} days.`;
      } else {
        /* trip is in the past or is happening */
        const timeDifference =
          new Date(formattedToday) - new Date(this.trip.departure_date);
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24)
        );
        if (daysDifference === 0) {
          /* the trip starts today */
          this.daysDifferenceClass = "text-red-600";

          return `You're traveling today! Have you left yet?`;
        } else if (
          daysDifference > 0 &&
          daysDifference < this.trip.trip_duration
        ) {
          /* the trip is currently happening */
          this.daysDifferenceClass = "text-green-600";
          const daysLeft = this.trip.trip_duration - daysDifference;
          return `This is day ${daysDifference} on the trip, you still have ${daysLeft} days left.`;
        } else if (daysDifference === this.trip.trip_duration) {
          /* last day of the trip */
          this.daysDifferenceClass = "text-green-700";
          return "This is your last day of the trip, enjoy it to the fullest!";
        } else {
          /* trip is over */
          this.daysDifferenceClass = "text-red-700";

          return "Your trip is over! Did you enjoy it?";
        }
      }
    },
  },
};
</script>
<template>
  <div class="container mx-auto trip-show mb-32">
    <h2 class="text-center text-5xl font-semibold mb-8">{{ trip.name }}</h2>

    <div class="map-destination flex gap-3 items-center mb-12">
      <h5 class="w-1/2 text-3xl text-center">
        Your destination: <br /><span class="text-emerald-600">{{
          trip.destination
        }}</span>
      </h5>

      <div class="map-box w-1/2 h-80 p-8">
        <div class="map bg-zinc-300 h-full"></div>
      </div>
    </div>

    <div
      v-if="trip.departure_date"
      class="departure_date flex flex-col items-center gap-3 text-xl mb-24"
    >
      <span class="me-4">
        <span class="text-emerald-600">Departure Date: </span>
        <span class="border-b border-emerald-600">
          {{ trip.departure_date }}</span
        >
      </span>
      <span :class="daysDifferenceClass">{{ getDaysDifference() }}</span>
    </div>

    <div
      v-if="trip.available_budget"
      class="budget flex justify-evenly items-center"
    >
      <h5 class="text-3xl w-1/3 text-center">Available budget:</h5>
      <div class="graph bg-green-700 w-1/3 h-80">
        <h3 class="text-white font-semibold text-4xl">
          Graph {{ trip.available_budget }}€
        </h3>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
