<template>
  <job-filters-side-bar-checkbox-group
    :values="jobTypes"
    :mutation="SET_SELECTED_JOB_TYPES"
    data-test="job-types-filter"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useJobTypes } from "@/store/composables";
import { SET_SELECTED_JOB_TYPES } from "@/store/constants";
import JobFiltersSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarCheckboxGroup.vue";

export default defineComponent({
  name: "JobFiltersSideBarJobTypes",
  components: { JobFiltersSideBarCheckboxGroup },
  setup() {
    const jobTypes = useJobTypes();
    return { jobTypes, SET_SELECTED_JOB_TYPES };
  },
});
</script>

<style scoped></style>
