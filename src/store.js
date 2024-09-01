import { reactive } from "vue";

export const store = reactive({
  backendUrl: "http://localhost:8000",
  user: null,
  trips: [],
  isAuthorized: false,
  isExpired: false,
  dayModal: {
    isOpen: false,
    dayNumber: null,
    tripId: null,
  },

  /**
   * save user data and set auth status
   * @param {object} user save user data
   * @param {boolean} isAuthorized set auth status
   * @param {boolean} isExpired set isExpired status
   *
   */
  setAuthStatus(user, isAuthorized, isExpired) {
    this.user = user;
    this.isAuthorized = isAuthorized;
    this.isExpired = isExpired;
  },

  /**
   * set modal status and needed info
   * @param {Boolean} isOpen show the modal
   * @param {Number} dayNumber modal that handles the day number x
   * @param {Number} tripId the trip related to the day
   */
  setDayModal(isOpen, dayNumber, tripId) {
    this.dayModal.isOpen = isOpen;
    this.dayModal.dayNumber = dayNumber;
    this.dayModal.tripId = tripId;
  },
});

export const resetForm = (formData) => {
  Object.keys(formData).forEach((key) => {
    formData[key] = null;
  });
};
