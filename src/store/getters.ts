import {
  ORGANIZATIONS,
  JOB_TYPES,
  FILTERED_JOBS,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
} from "./constants";
import { GlobalState } from "@/store/types";
import { Job } from "@/api/types";

interface IncludeJobGetters {
  [INCLUDE_JOB_BY_JOB_TYPE]: (job: Job) => boolean;
  [INCLUDE_JOB_BY_ORGANIZATION]: (job: Job) => boolean;
}

const getters = {
  [ORGANIZATIONS]: (state: GlobalState) => {
    const organizations = new Set<string>();
    state.jobs.forEach((job) => organizations.add(job.organization));
    return organizations;
  },
  [JOB_TYPES]: (state: GlobalState) => {
    const types = new Set<string>();
    state.jobs.forEach((job) => types.add(job.jobType));
    return types;
  },
  [FILTERED_JOBS]: (state: GlobalState, getters: IncludeJobGetters) => {
    return state.jobs
      .filter((job) => getters.INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter((job) => getters.INCLUDE_JOB_BY_JOB_TYPE(job));
  },
  [INCLUDE_JOB_BY_JOB_TYPE]: (state: GlobalState) => (job: Job) => {
    return (
      state.selectedJobTypes === undefined ||
      state.selectedJobTypes.length === 0 ||
      state.selectedJobTypes.includes(job.jobType)
    );
  },
  [INCLUDE_JOB_BY_ORGANIZATION]: (state: GlobalState) => (job: Job) => {
    return (
      state.selectedOrganizations === undefined ||
      state.selectedOrganizations.length === 0 ||
      state.selectedOrganizations.includes(job.organization)
    );
  },
};

export default getters;
