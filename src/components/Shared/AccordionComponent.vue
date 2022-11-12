<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      @click="toggle"
      data-test="clickable-area"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>

    <div v-if="isOpen" class="w-full mt-5">
      <slot>
        <p>slot empty</p>
      </slot>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "AccordionComponent",
  components: { FontAwesomeIcon },
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    caretIcon() {
      return this.isOpen ? ["fas", "angle-up"] : ["fas", "angle-down"];
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped></style>
