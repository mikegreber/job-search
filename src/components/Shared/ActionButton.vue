<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<script>
import { computed } from "vue";

export default {
  name: "ActionButton",
  props: {
    type: {
      type: String,
      default: "primary",
      validator(value) {
        return ["primary", "secondary"].includes(value);
      },
    },
    text: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const buttonClass = computed(() => ({ [props.type]: true }));
    return { buttonClass };
  },
};
</script>

<style scoped>
button {
  @apply px-5 py-3 font-medium;
}
.primary {
  @apply rounded text-white bg-brand-blue-1 hover:shadow-blue;
}
.secondary {
  @apply text-brand-blue-1 bg-transparent hover:text-white hover:bg-brand-blue-2;
}
</style>
