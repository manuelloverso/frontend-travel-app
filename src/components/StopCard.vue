<script>
import { store } from "../store";

export default {
  name: "StopCard",
  props: {
    stop: Object,
  },
  data() {
    return {
      store,
    };
  },

  methods: {
    openDeleteModal() {
      store.setDeleteStopModal(true, this.stop.id);
    },

    openEditModal() {
      store.setEditStopModal(true, this.stop);
    },
  },
};
</script>
<template>
  <div class="stop-card bg-emerald-600 text-white rounded-xl p-8">
    <h5 class="text-3xl text-center mb-4">{{ stop.location }}</h5>

    <p class="text-lg mb-4" v-if="stop.address">
      <span class="text-xl font-medium">Address📍:</span> {{ stop.address }}
    </p>

    <p class="text-lg mb-4" v-if="stop.notes">
      <span class="text-xl font-medium">Notes📋:</span> {{ stop.notes }}
    </p>

    <p class="text-lg mb-4" v-if="stop.type">
      <span class="text-xl font-medium">Type🏡:</span> {{ stop.type }}
    </p>

    <p class="text-lg mb-4" v-if="stop.rating">
      <span class="text-xl font-medium">Rating⭐:</span> {{ stop.rating }}
    </p>

    <div class="actions">
      <button
        class="p-3 rounded-lg bg-red-500 hover:bg-red-700 transition-colors"
        @click="openDeleteModal"
      >
        <img class="w-5" src="/public/img/trash-solid.svg" alt="trash can" />
      </button>

      <button
        class="edit-btn bg-white hover:bg-gray-300 transition-colors p-3 rounded-lg"
        @click="openEditModal"
      >
        <svg
          class="w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="rgb(5 150 105)"
            d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<style scoped></style>
