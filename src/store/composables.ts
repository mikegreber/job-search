import { computed, ComputedRef } from "vue";
import { useStore } from "vuex";
import { Job } from "@/api/types";
import {
  FETCH_JOBS,
  FILTERED_JOBS,
  JOB_TYPES,
  ORGANIZATIONS,
} from "@/store/constants";
import { key } from "@/store/index";

/* GETTERS */
export const useFilteredJobs = () => {
  const store = useStore(key);
  return computed<Job[]>(() => store.getters[FILTERED_JOBS]);
};

export const useJobTypes = () => {
  const store = useStore(key);
  return computed<Set<string>>(() => store.getters[JOB_TYPES]);
};

export const useOrganizations = () => {
  const store = useStore(key);
  return computed<Set<string>>(() => store.getters[ORGANIZATIONS]);
};

/* ACTIONS */
export const useFetchJobsDispatch = () => {
  const store = useStore(key);
  store.dispatch(FETCH_JOBS);
};
