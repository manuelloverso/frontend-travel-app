<script>
import axios from "axios";
import { store } from "../store";
import OrangeBtn from "./OrangeBtn.vue";
import AppLoader from "./AppLoader.vue";

export default {
  name: "DeleteStopModal",
  components: {
    OrangeBtn,
    AppLoader,
  },
  emits: ["stopDeleted"],

  data() {
    return {
      store,
      success: null,
      error: null,
      isLoading: false,
    };
  },

  methods: {
    async deleteStop() {
      this.isLoading = true;
      this.error = null;
      this.success = null;
      try {
        const res = await axios.delete(
          `${store.backendUrl}/api/delete/stop/${store.deleteStopModal.stopId}`
        );
        if (res.data.success) {
          this.success = true;
          this.$emit("stopDeleted");
          store.toastNotify = {
            isShowing: true,
            text: "Stop deleted with success!",
            success: false,
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
        } else {
          this.error = err.message;
        }
      } finally {
        this.isLoading = false;
      }
    },

    closeModal() {
      store.setDeleteStopModal(false, null);
    },
  },
};
</script>
<template>
  <div @click="closeModal" class="backdrop"></div>
  <div class="delete-stop-modal puff-in-center">
    <AppLoader v-if="isLoading" :minHeight="300" />
    <div v-else>
      <h3 class="text-green-500 text-2xl py-16" v-if="success">
        Stop deleted successfully
      </h3>

      <template v-else>
        <h3 class="text-red-500 text-2xl mb-4" v-if="error">{{ error }}</h3>
        <h2 class="text-3xl mb-6">You're about to delete this stop.</h2>
        <p class="text-xl mb-6">
          Are you sure? Stop will be permanently deleted.
        </p>

        <div class="actions flex items-center justify-between">
          <button
            class="bg-red-500 text-white p-3 text-lg rounded-lg hover:bg-red-700 transition-colors"
            @click="deleteStop"
          >
            Confirm
          </button>
          <OrangeBtn
            @click="closeModal"
            :isSubmit="false"
            :isOutline="true"
            text="Close"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.542);
  z-index: 3;
}

.delete-stop-modal {
  padding: 2rem;
  border-radius: 10px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
}
</style>
