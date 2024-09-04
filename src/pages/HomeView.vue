<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {};
  },
};
</script>
<template>
  <div class="hero">
    <img src="/public/img/hero-img.jpg" alt="flight pic" />
  </div>
  <main></main>
</template>
<style scoped>
.hero {
  & img {
    min-height: 70vh;
    max-height: 100vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
