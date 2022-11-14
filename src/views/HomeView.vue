<template>
  <hero-component />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeroComponent from "@/components/JobSearch/HeroComponent.vue";
export default defineComponent({
  name: "HomeView",
  components: { HeroComponent },
});
</script>
