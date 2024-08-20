<script>
export default {
  name: "AppHeader",
  data() {
    return {};
  },
};
</script>
<template>
  <header class="text-red-900 py-6 flex flex-col gap-3 items-center">
    <div class="logo font-bold text-4xl cursor-pointer">TriPlanner</div>
    <button
      class="bg-red-900 text-gray-100 p-2 text-lg font-semibold rounded-lg"
    >
      Login
    </button>
  </header>
</template>
<style scoped></style>
