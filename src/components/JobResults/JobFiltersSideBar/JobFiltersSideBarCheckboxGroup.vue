<template>
  <accordion-component :header="header">
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
  </accordion-component>
</template>

<script>
import AccordionComponent from "@/components/Shared/AccordionComponent";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "JobFiltersSideBarCheckboxGroup",
  components: { AccordionComponent },
  props: {
    header: {
      type: String,
      required: true,
    },
    mutation: {
      type: String,
      required: true,
    },
    values: {
      type: Set,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const selectedValues = ref([]);

    const selectValue = () => {
      store.commit(props.mutation, selectedValues.value);
      router.push({ name: "JobResults" });
    };

    return { selectedValues, selectValue };
  },
};
</script>

<style scoped></style>
