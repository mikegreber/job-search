<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="bp-5">
      <job-filters-side-bar-prompt />
      <accordion-component header="Skills and Qualifications">
        <job-filters-side-bar-skills />
      </accordion-component>
      <accordion-component header="Degree">
        <job-filters-side-bar-degrees />
      </accordion-component>
      <accordion-component header="Job Types">
        <job-filters-side-bar-job-types />
      </accordion-component>
      <accordion-component header="Organizations">
        <job-filters-side-bar-organizations />
      </accordion-component>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import AccordionComponent from "@/components/Shared/AccordionComponent.vue";
import JobFiltersSideBarDegrees from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarDegrees.vue";
import JobFiltersSideBarOrganizations from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarOrganizations.vue";
import JobFiltersSideBarJobTypes from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarJobTypes.vue";
import JobFiltersSideBarPrompt from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarPrompt.vue";
import JobFiltersSideBarSkills from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarSkills.vue";
import { useStore } from "vuex";
import { SET_SKILLS_SEARCH_TERM } from "@/store/constants";
import { key } from "@/store";
export default defineComponent({
  name: "JobFiltersSideBar",
  components: {
    JobFiltersSideBarSkills,
    JobFiltersSideBarPrompt,
    AccordionComponent,
    JobFiltersSideBarDegrees,
    JobFiltersSideBarOrganizations,
    JobFiltersSideBarJobTypes,
  },
  setup() {
    const parseSkillsSearchTerm = () => {
      const route = useRoute();
      const store = useStore(key);
      const role = route.query.role || "";
      store.commit(SET_SKILLS_SEARCH_TERM, role);
    };

    onMounted(parseSkillsSearchTerm);

    return {};
  },
});
</script>

<style scoped></style>
