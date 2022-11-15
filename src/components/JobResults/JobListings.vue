<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>
    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>
        <router-link
          v-if="previousPage"
          :to="{ name: 'JobResults', query: { page: previousPage } }"
          class="mx-3 text-sm font-semibold text-brand-blue-1"
          data-test="previous-page-link"
          >Previous</router-link
        >
        <router-link
          v-if="nextPage"
          :to="{ name: 'JobResults', query: { page: nextPage } }"
          class="mx-3 text-sm font-semibold text-brand-blue-1"
          data-test="next-page-link"
          >Next</router-link
        >
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import {
  useFilteredJobs,
  useFetchJobsDispatch,
  useFetchDegreesDispatch,
} from "@/store/composables";
import useCurrentPage from "@/composables/useCurrentPage";
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

export default defineComponent({
  name: "JobListings",
  components: { JobListing },
  setup() {
    onMounted(() => {
      useFetchJobsDispatch();
      useFetchDegreesDispatch();
    });

    const filteredJobs = useFilteredJobs();
    const currentPage = useCurrentPage();

    const maxPage = computed(() => Math.ceil(filteredJobs.value.length / 10.0));

    const { previousPage, nextPage } = usePreviousAndNextPages(
      currentPage,
      maxPage
    );

    const displayedJobs = computed(() => {
      const begin = (currentPage.value - 1) * 10;
      const end = currentPage.value * 10;
      return filteredJobs.value.slice(begin, end);
    });

    return { filteredJobs, currentPage, previousPage, nextPage, displayedJobs };
  },
});
</script>

<style scoped></style>
