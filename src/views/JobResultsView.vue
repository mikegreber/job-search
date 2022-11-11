<template>
  <div>
    <h1 class="text-6xl font-bold">About View</h1>
    <button @click="goToHome">Go to Home Page</button>
  </div>
</template>

<script>
export default {
  name: "JobResultsView",
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>
