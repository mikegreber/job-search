<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, Ref } from "vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import { Spotlight } from "@/api/types";
export default defineComponent({
  name: "SpotlightComponent",
  setup() {
    const spotlights: Ref<Spotlight[]> = ref([]);

    const getSpotlights = async () => {
      const baseUrl = process.env.VUE_APP_API_URL;
      const url = `${baseUrl}/spotlights`;
      const response = await axios.get<Spotlight[]>(url);
      spotlights.value = response.data;
    };

    onMounted(getSpotlights);

    return { spotlights };
  },
});
</script>

<style scoped></style>
