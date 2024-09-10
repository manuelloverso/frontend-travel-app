<script>
import { store } from "../store";
import AppLoader from "./AppLoader.vue";
import OrangeBtn from "./OrangeBtn.vue";
import axios from "axios";

export default {
  name: "EditStopModal",
  components: {
    AppLoader,
    OrangeBtn,
  },
  emits: ["stopEdited"],

  data() {
    return {
      store,
      stop: null,
      error: null,
      isStopUpdated: false,
      isLoading: false,
      formErrors: null,
    };
  },

  methods: {
    async editStop() {
      this.isLoading = true;
      this.error = null;
      this.formErrors = null;
      this.isStopUpdated = false;

      try {
        const res = await axios.put(
          `${store.backendUrl}/api/stop/${this.stop.id}`,
          this.stop
        );
        console.log(res);

        if (res.data.success) {
          this.isStopUpdated = true;
          this.$emit("stopEdited");
          store.toastNotify = {
            isShowing: true,
            text: "Stop updated with success!",
            success: true,
          };
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
      store.setEditStopModal(false, null);
    },
  },

  beforeMount() {
    this.stop = store.editStopModal.stopObj;
  },
};
</script>
<template>
  <div @click="closeModal" class="backdrop"></div>
  <div v-if="stop" class="modal puff-in-center">
    <h3 class="text-3xl font-medium mb-6 text-center">
      Edit your stop to {{ stop.location }} here
    </h3>

    <h4 class="text-red-500 text-2xl mb-6" v-if="error">{{ error }}</h4>

    <!-- Handle this case in a different way! -->
    <h4 class="text-green-500 text-2xl mb-6" v-if="isStopUpdated">
      Stop updated with success
    </h4>

    <AppLoader v-if="isLoading" :minHeight="500" />

    <form v-else @submit.prevent="editStop">
      <div class="flex flex-col gap-2 mb-4">
        <label class="text-xl" for="location">Location:</label>
        <input
          v-model="stop.location"
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
          v-model="stop.address"
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
          v-model="stop.type"
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
          v-model="stop.notes"
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
        <OrangeBtn :isSubmit="true" :isOutline="false" text="Edit stop" />

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
