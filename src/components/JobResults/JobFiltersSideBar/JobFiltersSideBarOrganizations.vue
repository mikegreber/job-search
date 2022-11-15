<template>
  <job-filters-side-bar-checkbox-group
    :values="organizations"
    :mutation="SET_SELECTED_ORGANIZATIONS"
    data-test="organizations-filter"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useOrganizations } from "@/store/composables";
import { SET_SELECTED_ORGANIZATIONS } from "@/store/constants";
import JobFiltersSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarCheckboxGroup.vue";

export default defineComponent({
  name: "JobFiltersSideBarOrganizations",
  components: { JobFiltersSideBarCheckboxGroup },
  setup() {
    const organizations = useOrganizations();

    return { organizations, SET_SELECTED_ORGANIZATIONS };
  },
});
</script>

<style scoped></style>
