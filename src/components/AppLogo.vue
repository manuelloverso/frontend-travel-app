<script>
export default {
  name: "AppLogo",
  props: {
    withText: Boolean,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div class="logo">
    <div class="square"><span>TP</span></div>
    <h2 v-if="withText">TripPlanner</h2>
  </div>
</template>
<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 5px;
  .square {
    padding: 0.7rem 1.2rem;
    border-radius: 10px;
    background-color: var(--accent);
    & span {
      display: block;
      color: var(--text-white);
      font-size: 2.1rem;
      font-weight: 700;
      font-style: italic;
    }
  }

  & h2 {
    font-weight: 700;
    font-size: 1.8rem;
    font-style: italic;
  }
}
</style>
