<template>
  <accordion-component header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="type in JOB_TYPES" :key="type" class="w-1/2 h-8">
            <input
              :id="type"
              v-model="selectedJobTypes"
              :value="type"
              class="mr-3"
              type="checkbox"
              :data-test="type"
              @change="selectJobType"
            />
            <label :for="type" data-test="job-type">
              {{ type }}
            </label>
          </li>
        </ul>
      </fieldset>
    </div>
  </accordion-component>
</template>

<script>
import AccordionComponent from "@/components/Shared/AccordionComponent";
import { mapGetters, mapMutations } from "vuex";
import { JOB_TYPES, SET_SELECTED_JOB_TYPES } from "@/store/constants";
export default {
  name: "JobFiltersSideBarJobTypes",
  components: { AccordionComponent },
  data() {
    return {
      selectedJobTypes: [],
    };
  },
  computed: {
    ...mapGetters([JOB_TYPES]),
  },
  methods: {
    ...mapMutations([SET_SELECTED_JOB_TYPES]),
    selectJobType() {
      this.SET_SELECTED_JOB_TYPES(this.selectedJobTypes);
      this.$router.push({ name: "JobResults" });
    },
  },
};
</script>

<style scoped></style>
