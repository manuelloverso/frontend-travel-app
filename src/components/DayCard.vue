<script>
import OrangeBtn from "./OrangeBtn.vue";
import StopCard from "./StopCard.vue";

export default {
  name: "DayCard",
  props: {
    tripDay: Object,
    dayNumber: Number,
  },
  components: {
    StopCard,
    OrangeBtn,
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.tripDay);
  },
};
</script>
<template>
  <div class="day-card" v-if="tripDay">
    <h4 class="text-center text-4xl font-medium mb-12">
      Here's your day {{ dayNumber }}
    </h4>
    <p class="text-lg mb-8" v-if="tripDay?.notes">
      <span class="text-orange-600">Notes: </span>{{ tripDay.notes }}
    </p>

    <!-- Handle day stops -->
    <div class="stops mb-8">
      <div v-if="tripDay.stops.length === 0">
        <h5 class="text-xl mb-4">
          <span class="text-orange-600">Stops: </span>You haven't added any stop
          yet
        </h5>
        <OrangeBtn
          :isOutline="true"
          :isSubmit="false"
          text="Add your first stop"
        />
      </div>

      <div v-else>
        <h5 class="text-xl mb-4 text-orange-600">Stops:</h5>
        <div class="row flex gap-8">
          <StopCard class="w-1/4" v-for="stop in tripDay.stops" :stop="stop" />
        </div>
      </div>
    </div>

    <p v-if="tripDay?.rating">You rated this day with {{ tripDay.rating }}⭐</p>
    <p v-else>
      <OrangeBtn :isOutline="false" :isSubmit="false" text="Rate this day" />
    </p>
  </div>

  <div class="empty-day-card" v-else>
    <h4 class="text-center text-4xl font-medium">
      You've nothing planned for day {{ dayNumber }} yet.
    </h4>
  </div>
</template>
<style scoped>
.day-card,
.empty-day-card {
  background-color: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: var(--accent) 0 0 10px -4px;
}
</style>
