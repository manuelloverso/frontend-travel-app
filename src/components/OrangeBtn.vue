<script>
export default {
  name: "OrangeBtn",
  props: {
    isOutline: Boolean,
    isSubmit: Boolean,
    text: String,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <button
    :class="isOutline ? 'outline-btn' : 'filled-btn'"
    :type="isSubmit ? 'submit' : ''"
  >
    {{ text }}
  </button>
</template>
<style scoped>
button {
  border: 1px solid var(--accent);
  border-radius: 15px;
  padding: 10px 25px;
  transition: 0.2s ease;
  font-size: 1.2rem;
}

.outline-btn {
  color: var(--accent);

  &:hover {
    background-color: var(--accent);
    color: white;
  }
}

.filled-btn {
  background-color: var(--accent);
  color: white;

  &:hover {
    background-color: transparent;
    color: var(--accent);
  }
}
</style>
