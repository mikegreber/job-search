import { Job } from "@/api/types";
// import {
//   LOGIN_USER,
//   LOGOUT_USER,
//   RECEIVE_JOBS,
//   SET_SELECTED_JOB_TYPES,
//   SET_SELECTED_ORGANIZATIONS,
// } from "@/store/constants";

export interface GlobalState {
  isLoggedIn: boolean;
  jobs: Job[];
  selectedOrganizations: string[];
  selectedJobTypes: string[];
}
