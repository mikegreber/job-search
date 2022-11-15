<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="bp-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filters" type="secondary" />
        </div>
      </div>

      <job-filters-side-bar-checkbox-group
        :values="degrees"
        :mutation="SET_SELECTED_DEGREES"
        data-test="degrees-filter"
        header="Degree"
      />

      <job-filters-side-bar-checkbox-group
        :values="jobTypes"
        :mutation="SET_SELECTED_JOB_TYPES"
        data-test="job-types-filter"
        header="Job Types"
      />

      <job-filters-side-bar-checkbox-group
        :values="organizations"
        :mutation="SET_SELECTED_ORGANIZATIONS"
        data-test="organizations-filter"
        header="Organizations"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ActionButton from "@/components/Shared/ActionButton.vue";
import JobFiltersSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarCheckboxGroup.vue";
import { useDegrees, useJobTypes, useOrganizations } from "@/store/composables";
import {
  SET_SELECTED_DEGREES,
  SET_SELECTED_JOB_TYPES,
  SET_SELECTED_ORGANIZATIONS,
} from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSideBar",
  components: {
    JobFiltersSideBarCheckboxGroup,
    ActionButton,
  },
  setup() {
    const jobTypes = useJobTypes();
    const organizations = useOrganizations();
    const degrees = useDegrees();

    return {
      jobTypes,
      organizations,
      degrees,
      SET_SELECTED_JOB_TYPES,
      SET_SELECTED_ORGANIZATIONS,
      SET_SELECTED_DEGREES,
    };
  },
});
</script>

<style scoped></style>
