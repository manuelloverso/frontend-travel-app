<script>
import axios from "axios";
import { store } from "../store";
import OrangeBtn from "./OrangeBtn.vue";
import StopCard from "./StopCard.vue";
import AddDayModal from "./AddDayModal.vue";

export default {
  name: "DayCard",
  props: {
    tripDay: Object,
    dayNumber: Number,
  },
  components: {
    StopCard,
    OrangeBtn,
    AddDayModal,
  },
  data() {
    return {
      store,
      isModalOpen: true,
    };
  },
};
</script>
<template>
  <div class="day-card" v-if="tripDay">
    <h4 class="text-center text-4xl font-medium mb-12">
      Here's your day <span class="text-orange-500">{{ dayNumber }}</span>
    </h4>
    <p class="text-lg mb-8" v-if="tripDay?.notes">
      <span class="text-orange-600">Notes: </span>{{ tripDay.notes }}
    </p>

    <!-- Handle day stops -->
    <div class="stops mb-8">
      <h5 class="text-2xl mb-4 text-center text-orange-500">
        Stops for this day:
      </h5>
      <div class="row flex flex-wrap gap-y-8">
        <div class="my-col w-1/4 p-4" v-for="stop in tripDay.stops">
          <StopCard class="h-full" :stop="stop" />
        </div>
        <div class="add-stop" @click="store.setStopModal(true, tripDay.id)">
          <img class="w-8" src="/public/img/plus-solid.svg" alt="plus-solid" />
        </div>
      </div>
    </div>

    <p v-if="tripDay?.rating">You rated this day with {{ tripDay.rating }}⭐</p>
    <p v-else>
      <OrangeBtn :isOutline="false" :isSubmit="false" text="Rate this day" />
    </p>
  </div>

  <div class="empty-day-card text-center" v-else>
    <h4 class="text-4xl font-medium mb-6">
      You've nothing planned for day
      <span class="text-orange-500">{{ dayNumber }}</span> yet.
    </h4>
    <OrangeBtn
      @click="store.setDayModal(true, dayNumber, $route.params.id)"
      :isOutline="true"
      :isSubmit="false"
      text="Handle your day"
    />
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

.add-stop {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  margin: 20px;
  width: calc(100% / 4);
  border: 1px solid var(--accent);
  border-radius: 20px;

  & > img {
    transition: transform 0.2s ease;
  }

  &:hover {
    & > img {
      transform: scale(1.4);
    }
  }
}
</style>
