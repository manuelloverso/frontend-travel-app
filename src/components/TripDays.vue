<script>
import DayCard from "./DayCard.vue";

export default {
  name: "TripDays",
  props: {
    trip: Object,
  },

  components: {
    DayCard,
  },
  data() {
    return {};
  },

  methods: {
    getCorrectDay(dayNumber) {
      const day = this.trip.days.find((d) => d.day_number === dayNumber);
      // If found, return the day object, otherwise return null
      return day || null;
    },
  },
};
</script>
<template>
  <h2 class="text-5xl font-medium text-center mb-12">Manage your days</h2>

  <div class="container mx-auto flex flex-col gap-24">
    <DayCard
      v-for="n in trip.trip_duration"
      :key="n"
      :tripDay="getCorrectDay(n)"
      :dayNumber="n"
    />
  </div>
</template>
<style scoped></style>
