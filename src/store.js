import { reactive } from "vue";

export const store = reactive({
  backendUrl: "http://localhost:8000",
  user: null,
  trips: [],
  isAuthorized: false,
  isExpired: false,

  toastNotify: {
    isShowing: false,
    text: null,
    success: null,
  },

  dayModal: {
    isOpen: false,
    dayNumber: null,
    tripId: null,
  },

  stopModal: {
    isOpen: false,
    dayId: null,
  },

  deleteTripModal: {
    isOpen: false,
    tripObj: null,
  },

  deleteStopModal: {
    isOpen: false,
    stopId: null,
  },

  editDayModal: {
    isOpen: false,
    dayObj: null,
  },

  editStopModal: {
    isOpen: false,
    stopObj: null,
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

  /**
   * set modal status and needed info
   * @param {Boolean} isOpen show the modal
   * @param {Object} dayObj day Object
   */
  setEditDayModal(isOpen, dayObj) {
    this.editDayModal.isOpen = isOpen;
    this.editDayModal.dayObj = dayObj;
  },

  /**
   *
   * @param {Boolean} isOpen show the modal
   * @param {Number} dayId the day related to the stop
   */
  setStopModal(isOpen, dayId) {
    this.stopModal.isOpen = isOpen;
    this.stopModal.dayId = dayId;
  },

  /**
   * set modal status and needed info
   * @param {Boolean} isOpen show the modal
   * @param {Object} stopObj stop Object
   */
  setEditStopModal(isOpen, stopObj) {
    this.editStopModal.isOpen = isOpen;
    this.editStopModal.stopObj = stopObj;
  },

  /**
   *
   * @param {Boolean} isOpen show the modal
   * @param {Object} tripObj the trip selected
   */
  setDeleteTripModal(isOpen, tripObj) {
    this.deleteTripModal.isOpen = isOpen;
    this.deleteTripModal.tripObj = tripObj;
  },

  /**
   *
   * @param {Boolean} isOpen show the modal
   * @param {Number} stopId the id of the selected stop
   */
  setDeleteStopModal(isOpen, stopId) {
    this.deleteStopModal.isOpen = isOpen;
    this.deleteStopModal.stopId = stopId;
  },
});

export const resetForm = (formData) => {
  Object.keys(formData).forEach((key) => {
    formData[key] = null;
  });
};
