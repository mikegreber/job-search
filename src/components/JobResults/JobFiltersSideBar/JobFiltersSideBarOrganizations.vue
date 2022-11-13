<template>
  <accordion-component header="Organization">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization in ORGANIZATIONS"
            :key="organization"
            class="w-1/2 h-8"
          >
            <input
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              class="mr-3"
              type="checkbox"
              :data-test="organization"
              @change="selectOrganization"
            />
            <label :for="organization" data-test="organization">
              {{ organization }}
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
import { ORGANIZATIONS, SET_SELECTED_ORGANIZATIONS } from "@/store/constants";
export default {
  name: "JobFiltersSideBarOrganizations",
  components: { AccordionComponent },
  data() {
    return {
      selectedOrganizations: [],
    };
  },
  computed: {
    ...mapGetters([ORGANIZATIONS]),
  },
  methods: {
    ...mapMutations([SET_SELECTED_ORGANIZATIONS]),
    selectOrganization() {
      this.SET_SELECTED_ORGANIZATIONS(this.selectedOrganizations);
    },
  },
};
</script>

<style scoped></style>
