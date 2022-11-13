import {
  ORGANIZATIONS,
  JOB_TYPES,
  FILTERED_JOBS,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
} from "@/store/constants";

const getters = {
  [ORGANIZATIONS](state) {
    const organizations = new Set();
    state.jobs.forEach((job) => organizations.add(job.organization));
    return organizations;
  },
  [JOB_TYPES](state) {
    const types = new Set();
    state.jobs.forEach((job) => types.add(job.jobType));
    return types;
  },
  [FILTERED_JOBS](state, getters) {
    return state.jobs
      .filter((job) => getters.INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter((job) => getters.INCLUDE_JOB_BY_JOB_TYPE(job));
  },
  [INCLUDE_JOB_BY_JOB_TYPE]: (state) => (job) => {
    return (
      state.selectedJobTypes === undefined ||
      state.selectedJobTypes.length === 0 ||
      state.selectedJobTypes.includes(job.jobType)
    );
  },
  [INCLUDE_JOB_BY_ORGANIZATION]: (state) => (job) => {
    return (
      state.selectedOrganizations === undefined ||
      state.selectedOrganizations.length === 0 ||
      state.selectedOrganizations.includes(job.organization)
    );
  },
};

export default getters;
