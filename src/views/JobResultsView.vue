<template>
  <div class="flex flex-row flex-nowrap w-full">
    <job-filters-side-bar class="" />
    <job-listings />
  </div>
</template>

<script>
import JobFiltersSideBar from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBar";
import JobListings from "@/components/JobResults/JobListings";
export default {
  name: "JobResultsView",
  components: { JobListings, JobFiltersSideBar },
};
</script>
