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

      <accordion-component header="Degree"></accordion-component>
      <accordion-component header="Job types"></accordion-component>
      <job-filters-side-bar-organizations />
    </section>
  </div>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton";
import AccordionComponent from "@/components/Shared/AccordionComponent";
import JobFiltersSideBarOrganizations from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarOrganizations";
export default {
  name: "JobFiltersSideBar",
  components: {
    JobFiltersSideBarOrganizations,
    AccordionComponent,
    ActionButton,
  },
};
</script>

<style scoped></style>
