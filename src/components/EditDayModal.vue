<script>
import axios from "axios";
import { store } from "../store";
import AppLoader from "./AppLoader.vue";
import OrangeBtn from "./OrangeBtn.vue";

export default {
  name: "EditDayModal",
  components: {
    OrangeBtn,
    AppLoader,
  },
  emits: ["dayEdited"],
  data() {
    return {
      store,
      day: null,
      isLoading: false,
      formErrors: null,
      error: null,
      isDayUpdated: false,
    };
  },

  methods: {
    async editDay() {
      this.isLoading = true;
      this.error = null;
      this.formErrors = null;
      this.isDayUpdated = false;

      try {
        const res = await axios.put(
          `${store.backendUrl}/api/day/${this.day.id}`,
          this.day
        );
        console.log(res);

        if (res.data.success) {
          /* do something (probably close the modal with a toast success message)  */
          this.isDayUpdated = true;
          this.$emit("dayEdited");
          this.closeModal();
        } else {
          this.error = res.data.response;
        }
      } catch (err) {
        console.error(err);
        if (err.response.status === 401 || err.response.status === 419) {
          store.setAuthStatus(null, false, true);
          this.closeModal();
        } else if (err.response?.status === 422) {
          this.formErrors = err.response.data.errors;
        } else {
          this.error = err.message;
        }
      } finally {
        this.isLoading = false;
      }
    },

    closeModal() {
      store.setEditDayModal(false, null);
    },
  },

  beforeMount() {
    this.day = store.editDayModal.dayObj;
  },
};
</script>
<template>
  <div @click="closeModal" class="backdrop"></div>
  <div v-if="day" class="modal puff-in-center">
    <h3 class="text-3xl font-medium mb-6 text-center">
      Edit your day {{ day.day_number }} here
    </h3>

    <h4 class="text-red-500 text-2xl mb-6" v-if="error">{{ error }}</h4>

    <!-- Handle this case in a different way! -->
    <h4 class="text-green-500 text-2xl mb-6" v-if="isDayUpdated">
      Day created with success
    </h4>

    <AppLoader v-if="isLoading" :minHeight="500" />

    <form v-else @submit.prevent="editDay">
      <div class="flex flex-col gap-2 mb-6">
        <label for="title" class="text-xl">Add a title for this day</label>
        <input
          v-model="day.title"
          class="bg-emerald-50 p-2 rounded-lg text-lg"
          type="text"
          name="title"
          id="title"
          placeholder="A day in the suburbs"
        />
        <p class="text-red-500 text-xl" v-if="formErrors?.title">
          {{ formErrors.title[0] }}
        </p>
      </div>

      <div class="flex flex-col gap-2 mb-6">
        <label for="weather" class="text-xl"
          >What will the weather be like?</label
        >
        <input
          v-model="day.weather"
          class="bg-emerald-50 p-2 rounded-lg text-lg"
          type="text"
          name="weather"
          id="weather"
          placeholder="It'll be a cloudy day"
        />
        <p class="text-red-500 text-xl" v-if="formErrors?.weather">
          {{ formErrors.weather[0] }}
        </p>
      </div>

      <div class="flex flex-col gap-2 mb-6">
        <label class="text-xl" for="notes">Notes:</label>
        <textarea
          v-model="day.notes"
          class="bg-emerald-50 p-2 rounded-lg text-lg"
          name="notes"
          type="text"
          placeholder="Add some notes.."
        >
        </textarea>
        <p class="text-red-500 text-xl" v-if="formErrors?.notes">
          {{ formErrors.notes[0] }}
        </p>
      </div>

      <div class="flex flex-col gap-2 mb-6">
        <label for="rating" class="text-xl"
          >Do you wanna rate this already? You can change this later</label
        >
        <input
          v-model="day.rating"
          class="bg-emerald-50 p-2 rounded-lg text-lg"
          type="number"
          name="rating"
          id="rating"
          placeholder="4"
        />
        <p class="text-red-500 text-xl" v-if="formErrors?.rating">
          {{ formErrors.rating[0] }}
        </p>
      </div>

      <div class="flex justify-between">
        <OrangeBtn :isSubmit="true" :isOutline="false" text="Edit day" />
        <button
          @click="closeModal"
          type="button"
          class="border text-lg rounded-lg border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>
.modal {
  width: 70vw;
  padding: 2rem;
  border-radius: 10px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  max-height: 90vh;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.backdrop {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.542);
  z-index: 2;
}
</style>
