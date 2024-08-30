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
};
</script>
<template>
  <h2 class="text-5xl font-medium text-center mb-12">Manage your days</h2>

  <div class="container mx-auto flex flex-col gap-24">
    <DayCard
      v-for="n in trip.trip_duration"
      :tripDay="trip.days[n - 1]"
      :dayNumber="n"
    />
  </div>
</template>
<style scoped></style>
