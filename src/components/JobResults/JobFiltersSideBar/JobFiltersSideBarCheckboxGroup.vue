<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="value in values" :key="value" class="w-1/2 h-8">
          <input
            :id="value"
            v-model="selectedValues"
            :value="value"
            class="mr-3"
            type="checkbox"
            :data-test="value"
            @change="selectValue"
          />
          <label :for="value" data-test="label">
            {{ value }}
          </label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { key } from "@/store";
import { CLEAR_JOB_FILTERS } from "@/store/constants";
export default defineComponent({
  name: "JobFiltersSideBarCheckboxGroup",
  props: {
    mutation: {
      type: String,
      required: true,
    },
    values: {
      type: [Array, Set] as PropType<string[] | Set<string>>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore(key);
    const router = useRouter();

    const selectedValues: Ref<string[]> = ref([]);

    store.subscribe((mutation) => {
      if (mutation.type === CLEAR_JOB_FILTERS) {
        selectedValues.value = [];
      }
    });

    const selectValue = () => {
      store.commit(props.mutation, selectedValues.value);
      router.push({ name: "JobResults" });
    };

    return { selectedValues, selectValue };
  },
});
</script>

<style scoped></style>
