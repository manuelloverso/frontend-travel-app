<script>
export default {
  name: "StopCard",
  props: {
    stop: Object,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div class="stop-card bg-orange-500 text-white rounded-xl p-8">
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

    <p class="text-lg" v-if="stop.rating">
      <span class="text-xl font-medium">Rating⭐:</span> {{ stop.rating }}
    </p>

    <div class="actions"></div>
  </div>
</template>
<style scoped></style>
