<script>
import { RouterLink } from "vue-router";
import OrangeBtn from "./OrangeBtn.vue";
import { store } from "../store";

export default {
  name: "TripCard",
  components: {
    OrangeBtn,
  },
  props: {
    tripObj: Object,
  },
  data() {
    return {
      store,
    };
  },

  methods: {
    openModal() {
      store.setDeleteTripModal(true, this.tripObj);
    },
  },
};
</script>
<template>
  <div class="trip-card flex bg-white rounded-xl">
    <div class="bg-emerald-600 rounded-xl img-box w-1/2">
      <img
        class="w-full rounded-xl h-full object-cover"
        :src="`${store.backendUrl}/${tripObj.image}`"
        :alt="tripObj.name"
      />
    </div>
    <div class="card-body w-1/2 p-10 flex flex-col justify-between">
      <div class="info">
        <h3 class="text-4xl font-semibold mb-6">{{ tripObj.name }}</h3>
        <p v-if="tripObj.destination" class="text-lg mb-6">
          Destination:
          <span class="text-emerald-600"> {{ tripObj.destination }}</span>
        </p>

        <p v-if="tripObj.departure_date" class="text-lg mb-6">
          Departure Date:
          <span class="text-emerald-600"> {{ tripObj.departure_date }}</span>
        </p>

        <p v-if="tripObj.number_of_people" class="text-lg mb-6">
          Number of people:
          <span class="text-emerald-600"> {{ tripObj.number_of_people }}</span>
        </p>

        <p v-if="tripObj.duration" class="text-lg mb-6">
          Duration:
          <span class="text-emerald-600"> {{ tripObj.duration }}</span>
        </p>

        <p v-if="tripObj.available_budget" class="text-lg mb-6">
          Available Budget:
          <span class="text-emerald-600"> {{ tripObj.available_budget }}€</span>
        </p>
      </div>

      <div class="actions flex items-center justify-between">
        <RouterLink :to="'trips/' + tripObj.id">
          <OrangeBtn :isOutline="true" :isSubmit="false" text="See More" />
        </RouterLink>

        <div class="edit-delete flex gap-3">
          <RouterLink
            :to="'edit-trip/' + tripObj.id"
            class="p-3 bg-emerald-600 flex items-center rounded-lg hover:bg-emerald-800 transition-colors"
          >
            <img class="w-4" src="/public/img/pen-solid.svg" alt="edit pen" />
          </RouterLink>
          <button
            @click="openModal"
            class="bg-red-500 text-white p-3 text-lg rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete trip
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.trip-card {
  box-shadow: 0 0 10px -4px;
}
</style>
