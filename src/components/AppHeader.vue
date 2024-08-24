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
    <a
      href="http://localhost:8000/login"
      class="bg-red-900 text-gray-100 p-2 text-lg font-semibold rounded-lg"
    >
      Login
    </a>

    <a
      href="http://localhost:8000/register"
      class="bg-red-900 text-gray-100 p-2 text-lg font-semibold rounded-lg"
    >
      Register
    </a>
  </header>
</template>
<style scoped></style>
