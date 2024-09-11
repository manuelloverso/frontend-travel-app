<script>
import axios from "axios";
import { resetForm, store } from "../store";
import OrangeBtn from "./OrangeBtn.vue";
import AppLoader from "./AppLoader.vue";

export default {
  name: "AddStopModal",
  components: {
    OrangeBtn,
    AppLoader,
  },
  emits: ["stopAdded"],

  data() {
    return {
      store,
      resetForm,
      formFields: {
        location: null,
        address: null,
        type: null,
        notes: null,
      },
      isLoading: false,
      isStopCreated: false,
      error: null,
      formErrors: null,
    };
  },

  methods: {
    async addStop() {
      this.isLoading = true;

      let data = {
        ...this.formFields,
        day_id: store.stopModal.dayId,
      };
      try {
        const res = await axios.post(`${store.backendUrl}/api/stop`, data);
        console.log(res);
        if (res.data.success) {
          this.isStopCreated = true;
          this.$emit("stopAdded");
          store.toastNotify = {
            isShowing: true,
            text: "Stop created with success!",
            success: true,
          };
          this.closeModal();
        } else {
          this.error = res.data.response;
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401 || err.response?.status === 419) {
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
      store.setStopModal(false, null);
    },
  },
};
</script>
<template>
  <div @click="closeModal" class="backdrop"></div>
  <div class="add-stop-modal puff-in-center">
    <h4 class="text-3xl mb-4 text-center">Add a stop for this day</h4>
    <h4 class="text-red-500 text-2xl mb-6" v-if="error">{{ error }}</h4>

    <!-- Handle this case in a different way! -->
    <h4 class="text-green-500 text-2xl mb-6" v-if="isStopCreated">
      Stop created with success
    </h4>
    <AppLoader v-if="isLoading" :minHeight="500" />
    <form v-else @submit.prevent="addStop">
      <div class="flex flex-col gap-2 mb-4">
        <label class="text-xl" for="location">Location:</label>
        <input
          v-model="formFields.location"
          class="bg-emerald-50 p-2 rounded-lg text-lg"
          type="text"
          placeholder="Sagrada Familia"
          name="location"
        />
        <p class="text-red-500 text-xl" v-if="formErrors?.location">
          {{ formErrors.location[0] }}
        </p>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label class="text-xl" for="address">Address:</label>
        <input
          v-model="formFields.address"
          class="bg-emerald-50 p-2 rounded-lg text-lg"
          type="text"
          placeholder="Eixample, 08013 Barcelona, Spain"
          name="address"
        />
        <p class="text-red-500 text-xl" v-if="formErrors?.address">
          {{ formErrors.address[0] }}
        </p>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label class="text-xl" for="type">Type:</label>
        <input
          v-model="formFields.type"
          class="bg-emerald-50 p-2 rounded-lg text-lg"
          type="text"
          placeholder="Church"
          name="type"
        />
        <p class="text-red-500 text-xl" v-if="formErrors?.type">
          {{ formErrors.type[0] }}
        </p>
      </div>

      <div class="flex flex-col gap-2 mb-8">
        <label class="text-xl" for="notes">Add notes for this stop:</label>
        <textarea
          v-model="formFields.notes"
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

      <div class="actions flex items-center justify-between">
        <OrangeBtn :isSubmit="true" :isOutline="false" text="Add stop" />

        <button
          @click="closeModal"
          type="button"
          class="p-2 text-red-500 border border-red-500 rounded-lg"
        >
          Close
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>
.add-stop-modal {
  width: 70vw;
  padding: 2rem;
  border-radius: 10px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90vh;
  overflow-y: auto;
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
