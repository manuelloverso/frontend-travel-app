import { reactive } from "vue";

export const store = reactive({
  backendUrl: "http://localhost:8000",
  user: null,
  trips: [],
  isAuthorized: false,
  isExpired: false,

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
});

export const resetForm = (formData) => {
  Object.keys(formData).forEach((key) => {
    formData[key] = null;
  });
};
