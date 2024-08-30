<script>
import { RouterLink } from "vue-router";
import OrangeBtn from "./OrangeBtn.vue";

export default {
  name: "TripCard",
  components: {
    OrangeBtn,
  },
  props: {
    tripObj: Object,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div class="trip-card flex bg-white rounded-xl">
    <div class="bg-orange-600 rounded-xl img-box w-1/3">
      <img class="w-full rounded-xl" :src="tripObj.image" :alt="tripObj.name" />
    </div>
    <div class="card-body w-2/3 p-10">
      <h3 class="text-4xl font-semibold mb-6">{{ tripObj.name }}</h3>
      <p v-if="tripObj.destination" class="text-lg mb-6">
        Destination:
        <span class="text-orange-600"> {{ tripObj.destination }}</span>
      </p>

      <p v-if="tripObj.departure_date" class="text-lg mb-6">
        Departure Date:
        <span class="text-orange-600"> {{ tripObj.departure_date }}</span>
      </p>

      <p v-if="tripObj.number_of_people" class="text-lg mb-6">
        Number of people:
        <span class="text-orange-600"> {{ tripObj.number_of_people }}</span>
      </p>

      <p v-if="tripObj.duration" class="text-lg mb-6">
        Duration:
        <span class="text-orange-600"> {{ tripObj.duration }}</span>
      </p>

      <p v-if="tripObj.available_budget" class="text-lg mb-6">
        Available Budget:
        <span class="text-orange-600"> {{ tripObj.available_budget }}€</span>
      </p>

      <RouterLink :to="'trips/' + tripObj.id">
        <OrangeBtn :isOutline="true" :isSubmit="false" text="See More" />
      </RouterLink>
    </div>
  </div>
</template>
<style scoped>
.trip-card {
  box-shadow: 0 0 10px -4px;
}
</style>
