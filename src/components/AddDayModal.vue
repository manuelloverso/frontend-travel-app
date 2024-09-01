<script>
import axios from "axios";
import { store, resetForm } from "../store";
import AppLoader from "./AppLoader.vue";

export default {
  name: "AddDayModal",
  components: {
    AppLoader,
  },
  data() {
    return {
      store,
      resetForm,

      isDayCreated: false,
      isLoading: false,
      error: null,
      formErrors: null,

      inputFields: {
        notes: null,
        rating: null,
      },
    };
  },

  computed: {
    isOpen() {
      return store.dayModal.isOpen;
    },

    dayNumber() {
      return store.dayModal.dayNumber;
    },
  },

  methods: {
    async addDay() {
      this.isLoading = true;
      this.error = null;
      this.formErrors = null;
      this.isDayCreated = false;

      let data = {
        ...this.inputFields,
        trip_id: Number(store.dayModal.tripId),
        day_number: Number(store.dayModal.dayNumber),
      };
      try {
        const res = await axios.post(`${store.backendUrl}/api/day`, data);
        console.log(res);

        if (res.data.success) {
          /* do something (probably close the modal with a toast success message)  */
          this.isDayCreated = true;
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
      store.dayModal = {
        isOpen: false,
        dayNumber: null,
        tripId: null,
      };

      resetForm(this.inputFields);
    },
  },
};
</script>
<template>
  <div @click="closeModal" v-if="isOpen" class="backdrop"></div>
  <div v-if="isOpen" class="modal">
    <h3 class="text-2xl font-medium mb-4">
      Manage your day {{ dayNumber }} here
    </h3>

    <h4 class="text-red-500 text-2xl mb-6" v-if="error">{{ error }}</h4>

    <!-- Handle this case in a different way! -->
    <h4 class="text-green-500 text-2xl mb-6" v-if="isDayCreated">
      Day created with success
    </h4>

    <AppLoader v-if="isLoading" :minHeight="500" />

    <form v-else @submit.prevent="addDay">
      <div>
        <label for="notes">Notes:</label>
        <input v-model="inputFields.notes" name="notes" type="text" />
        <p class="text-red-500 text-xl" v-if="formErrors?.notes">
          {{ formErrors.notes[0] }}
        </p>
      </div>

      <div>
        <label for="rating"
          >Do you wanna rate this already? You can change this later</label
        >
        <input
          v-model="inputFields.rating"
          type="number"
          name="rating"
          id="rating"
        />
        <p class="text-red-500 text-xl" v-if="formErrors?.rating">
          {{ formErrors.rating[0] }}
        </p>
      </div>

      <div class="flex justify-between">
        <button class="text-white p-2 rounded-lg bg-orange-500" type="submit">
          Add day
        </button>
        <button
          @click="closeModal"
          class="border rounded-lg border-red-500 p-2 text-red-500"
        >
          Close
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>
.modal {
  padding: 2rem;
  border-radius: 10px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
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
