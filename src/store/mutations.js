import {
  LOGIN_USER,
  LOGOUT_USER,
  RECEIVE_JOBS,
  SET_SELECTED_ORGANIZATIONS,
  SET_SELECTED_JOB_TYPES,
} from "@/store/constants";

const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [LOGOUT_USER](state) {
    state.isLoggedIn = false;
  },
  [RECEIVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
  [SET_SELECTED_ORGANIZATIONS](state, organizations) {
    state.selectedOrganizations = organizations;
  },
  [SET_SELECTED_JOB_TYPES](state, types) {
    state.selectedJobTypes = types;
  },
};

export default mutations;
