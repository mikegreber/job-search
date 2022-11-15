<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
    <div class="flex items-center text-sm">
      <action-button
        text="Clear Filters"
        type="secondary"
        data-test="clear-user-job-filters"
        @click="clearJobFilterSelections"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ActionButton from "@/components/Shared/ActionButton.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { CLEAR_JOB_FILTERS } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSideBarPrompt",
  components: { ActionButton },
  setup() {
    const store = useStore(key);
    const clearJobFilterSelections = () => {
      store.commit(CLEAR_JOB_FILTERS);
    };

    return {
      clearJobFilterSelections,
    };
  },
});
</script>

<style scoped></style>
