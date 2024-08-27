import { reactive } from "vue";

export const store = reactive({
  backendUrl: "http://localhost:8000",
  user: null,
});

export const resetForm = (formData) => {
  Object.keys(formData).forEach((key) => {
    formData[key] = null;
  });
};
