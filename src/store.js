import { reactive } from "vue";

export const store = reactive({
  user: null,
});

export const resetForm = (formData) => {
  Object.keys(formData).forEach((key) => {
    formData[key] = null;
  });
};
