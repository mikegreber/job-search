<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      data-test="clickable-area"
      @click="toggle"
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
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "AccordionComponent",
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const toggle = () => (isOpen.value = !isOpen.value);
    const caretIcon = computed(() =>
      isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"]
    );

    return { isOpen, caretIcon, toggle };
  },
});
</script>

<style scoped></style>
