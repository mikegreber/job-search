<template>
  <div class="mt-5">
    <input
      v-model.lazy.trim="skillSearchTerm"
      class="p-3 h-12 border border-solid border-brand-gray-1 shadow-gray rounded w-full text-base focus:outline-brand-blue-2"
      placeholder="Computer programming, Finance degree"
      data-test="skills-search-input"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { SET_SKILLS_SEARCH_TERM } from "@/store/constants";
export default defineComponent({
  name: "JobFiltersSideBarSkills",
  setup() {
    const store = useStore(key);

    const skillSearchTerm = computed({
      get: () => store.state.skillsSearchTerm,
      set: (value: string) => {
        store.commit(SET_SKILLS_SEARCH_TERM, value);
      },
    });

    return { skillSearchTerm };
  },
});
</script>

<style scoped></style>
