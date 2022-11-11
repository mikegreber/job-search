<template>
  <form
    class="flex items-center w-full h-12 mt-14 border border-solid border-brand-gray-3 rounded-3xl"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />
    <div class="flex flex-nowrap flex-1 h-full text-base font-light">
      <div class="relative flex items-center flex-1 h-full pr-3">
        <label class="absolute left-0 -top-10">Role</label>
        <text-input v-model="role" placeholder="Software engineer" />
      </div>
      <span
        class="flex items-center h-full px-3 border-l border-r border-brand-gray-3 bg-brand-gray-2"
        >in</span
      >
      <div class="relative flex items-center flex-1 h-full ml-3">
        <label class="absolute left-0 -top-10">Where?</label>
        <text-input v-model="location" placeholder="Edmonton, AB" />
        <action-button text="Search" type="secondary" class="rounded-r-3xl" />
      </div>
    </div>
  </form>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ActionButton from "@/components/Shared/ActionButton";
import TextInput from "../Shared/TextInput";
export default {
  name: "JobSearchForm",
  components: { TextInput, ActionButton, FontAwesomeIcon },
  data() {
    return {
      role: "",
      location: "",
    };
  },
};
</script>

<style scoped></style>
