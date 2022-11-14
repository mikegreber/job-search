<template>
  <section class="mb-16">
    <h1
      class="font-bold tracking-tighter text-8xl mb-14"
      data-test="action-phrase"
    >
      <span :class="actionClass">{{ action }}</span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job.</h2>
  </section>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  Ref,
  ref,
} from "vue";
import nextElementInList from "@/utils/nextElementInList";

export default defineComponent({
  name: "HeadlineComponent",
  setup() {
    const action: Ref<string> = ref("Build");
    const actionClass = computed(() => ({
      [action.value.toLowerCase()]: true,
    }));

    const interval: Ref<number | undefined> = ref(undefined);

    onMounted(() => {
      interval.value = setInterval(() => {
        const actions = ["Build", "Create", "Design", "Code"];
        action.value = nextElementInList(actions, action.value);
      }, 3000);
    });

    onBeforeUnmount(() => {
      clearInterval(interval.value);
    });

    return { action, interval, actionClass };
  },
});
</script>

<style scoped>
.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}
.design {
  color: #f9ab00;
}
.code {
  color: #d93025;
}
</style>
