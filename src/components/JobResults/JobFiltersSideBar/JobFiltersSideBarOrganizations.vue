<template>
  <accordion-component header="Organization">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="w-1/2 h-8">
            <input id="VueTube" type="checkbox" class="mr-3" />
            <label for="VueTube">VueTube</label>
          </li>
          <li class="w-1/2 h-8">
            <input id="Between Vue" type="checkbox" class="mr-3" />
            <label for="Between Vue">Between Vue</label>
          </li>
          <li class="w-1/2 h-8">
            <input id="Et Vue Brute" type="checkbox" class="mr-3" />
            <label for="Et Vue Brute">Et Vue Brute</label>
          </li>
          <li class="w-1/2 h-8">
            <input id="View and a Half Men" type="checkbox" class="mr-3" />
            <label for="View and a Half Men">View and a Half Men</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </accordion-component>
</template>

<script>
import AccordionComponent from "@/components/Shared/AccordionComponent";
export default {
  name: "JobFiltersSideBarOrganizations",
  components: { AccordionComponent },
};
</script>

<style scoped></style>
