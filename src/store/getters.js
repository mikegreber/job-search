import {
  ORGANIZATIONS,
  FILTERED_JOBS_BY_ORGANIZATIONS,
} from "@/store/constants";

const getters = {
  [ORGANIZATIONS](state) {
    const organizations = new Set();
    state.jobs.forEach((job) => organizations.add(job.organization));
    return organizations;
  },
  [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
    if (state.selectedOrganizations.length === 0) return state.jobs;
    return state.jobs.filter((job) =>
      state.selectedOrganizations.includes(job.organization)
    );
  },
};

export default getters;
