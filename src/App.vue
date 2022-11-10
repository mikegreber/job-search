<template>
  <div>
    <main-nav />
    <hero-component />
  </div>
</template>

<script>
import MainNav from "@/components/Navigation/MainNav";
import HeroComponent from "@/components/JobSearch/HeroComponent";
export default {
  name: "App",
  components: {
    MainNav,
    HeroComponent,
  },
};
</script>
