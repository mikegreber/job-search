import { computed } from "vue";
import { useStore } from "vuex";

import {
  FETCH_JOBS,
  FILTERED_JOBS,
  JOB_TYPES,
  ORGANIZATIONS,
} from "@/store/constants";

/* GETTERS */
export const useFilteredJobs = () => {
  const store = useStore();
  return computed(() => store.getters[FILTERED_JOBS]);
};

export const useJobTypes = () => {
  const store = useStore();
  return computed(() => store.getters[JOB_TYPES]);
};

export const useOrganizations = () => {
  const store = useStore();
  return computed(() => store.getters[ORGANIZATIONS]);
};

/* ACTIONS */
export const useFetchJobsDispatch = () => {
  const store = useStore();
  store.dispatch(FETCH_JOBS);
};
