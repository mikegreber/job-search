<template>
  <job-filters-side-bar-checkbox-group
    :values="degrees"
    :mutation="SET_SELECTED_DEGREES"
    data-test="degrees-filter"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDegrees } from "@/store/composables";
import { SET_SELECTED_DEGREES } from "@/store/constants";
import JobFiltersSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarCheckboxGroup.vue";

export default defineComponent({
  name: "JobFiltersSideBarDegrees",
  components: { JobFiltersSideBarCheckboxGroup },
  setup() {
    const degrees = useDegrees();
    return { degrees, SET_SELECTED_DEGREES };
  },
});
</script>

<style scoped></style>
