import { GlobalState } from "@/store/types";
import { Degree, Job } from "@/api/types";

import {
  LOGIN_USER,
  LOGOUT_USER,
  RECEIVE_JOBS,
  SET_SELECTED_ORGANIZATIONS,
  SET_SELECTED_JOB_TYPES,
  RECEIVE_DEGREES,
  SET_SELECTED_DEGREES,
  CLEAR_JOB_FILTERS,
} from "./constants";

const mutations = {
  [LOGIN_USER]: (state: GlobalState) => {
    state.isLoggedIn = true;
  },

  [LOGOUT_USER]: (state: GlobalState) => {
    state.isLoggedIn = false;
  },

  [RECEIVE_JOBS]: (state: GlobalState, jobs: Job[]) => {
    state.jobs = jobs;
  },

  [RECEIVE_DEGREES]: (state: GlobalState, degrees: Degree[]) => {
    state.degrees = degrees;
  },

  [SET_SELECTED_ORGANIZATIONS]: (
    state: GlobalState,
    organizations: string[]
  ) => {
    state.selectedOrganizations = organizations;
  },

  [SET_SELECTED_JOB_TYPES]: (state: GlobalState, types: string[]) => {
    state.selectedJobTypes = types;
  },

  [SET_SELECTED_DEGREES]: (state: GlobalState, degrees: string[]) => {
    state.selectedDegrees = degrees;
  },

  [CLEAR_JOB_FILTERS]: (state: GlobalState) => {
    state.selectedJobTypes = [];
    state.selectedOrganizations = [];
    state.selectedDegrees = [];
  },
};

export default mutations;
