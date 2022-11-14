import { GlobalState } from "@/store/types";
import { Job } from "@/api/types";

import {
  LOGIN_USER,
  LOGOUT_USER,
  RECEIVE_JOBS,
  SET_SELECTED_ORGANIZATIONS,
  SET_SELECTED_JOB_TYPES,
} from "./constants";

const mutations = {
  [LOGIN_USER](state: GlobalState) {
    state.isLoggedIn = true;
  },
  [LOGOUT_USER](state: GlobalState) {
    state.isLoggedIn = false;
  },
  [RECEIVE_JOBS](state: GlobalState, jobs: Job[]) {
    state.jobs = jobs;
  },
  [SET_SELECTED_ORGANIZATIONS](state: GlobalState, organizations: string[]) {
    state.selectedOrganizations = organizations;
  },
  [SET_SELECTED_JOB_TYPES](state: GlobalState, types: string[]) {
    state.selectedJobTypes = types;
  },
};

export default mutations;
