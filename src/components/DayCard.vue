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

  methods: {
    openEditModal(dayObj) {
      store.setEditDayModal(true, dayObj);
    },
  },
};
</script>
<template>
  <div class="day-card relative" v-if="tripDay">
    <button
      class="edit-day-btn p-3 bg-emerald-600 flex items-center rounded-lg hover:bg-emerald-800 transition-colors"
      @click="openEditModal(tripDay)"
    >
      <img class="w-6" src="/public/img/pen-solid.svg" alt="edit pen" />
    </button>
    <h4 class="text-center text-4xl font-medium mb-12">
      Here's your day <span class="text-emerald-600">{{ dayNumber }}</span>
    </h4>

    <p class="text-xl mb-8" v-if="tripDay?.title">
      <span class="text-emerald-600">Day Title: </span>{{ tripDay.title }}
    </p>

    <p class="text-xl mb-8" v-if="tripDay?.notes">
      <span class="text-emerald-600">Notes: </span>{{ tripDay.notes }}
    </p>

    <!-- Handle day stops -->
    <div class="stops mb-8">
      <h5 class="text-2xl mb-4 text-center text-emerald-600">
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
      <span class="text-emerald-600">{{ dayNumber }}</span> yet.
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

.edit-day-btn {
  position: absolute;
  right: 40px;
  top: 40px;
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
