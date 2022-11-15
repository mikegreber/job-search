import mutations from "@/store/mutations";
import {
  SET_SELECTED_ORGANIZATIONS,
  SET_SELECTED_JOB_TYPES,
  RECEIVE_JOBS,
  RECEIVE_DEGREES,
  LOGOUT_USER,
  LOGIN_USER,
  SET_SELECTED_DEGREES,
  CLEAR_JOB_FILTERS,
} from "@/store/constants";
import { GlobalState } from "@/store/types";
import { Degree, Job } from "@/api/types";
import { createState, createJob, createDegree } from "./utils";

describe("mutations", () => {
  describe(LOGIN_USER, () => {
    it("it logs the user in", () => {
      const state = createState({ isLoggedIn: false });
      mutations.LOGIN_USER(state);
      expect(state.isLoggedIn).toEqual(true);
    });
  });

  describe(LOGOUT_USER, () => {
    it("it logs the user out", () => {
      const state = createState({ isLoggedIn: true });
      mutations.LOGOUT_USER(state);
      expect(state.isLoggedIn).toEqual(false);
    });
  });

  describe(RECEIVE_JOBS, () => {
    it("receives jobs from api", () => {
      const state = createState({ jobs: [] });
      const jobs: Job[] = [
        createJob({ title: "Job1" }),
        createJob({ title: "Job2" }),
      ];
      mutations.RECEIVE_JOBS(state, jobs);
      expect(state.jobs).toEqual(jobs);
    });
  });

  describe(RECEIVE_DEGREES, () => {
    it("receives jobs from api", () => {
      const state = createState({ degrees: [] });
      const degrees: Degree[] = [
        createDegree({ degree: "Master's" }),
        createJob({ degree: "Bachelor's" }),
      ];
      mutations.RECEIVE_DEGREES(state, degrees);
      expect(state.degrees).toEqual(degrees);
    });
  });

  describe(SET_SELECTED_ORGANIZATIONS, () => {
    it("updates organizations that the user as chosen to filter jobs by", () => {
      const state = createState({ selectedOrganizations: [] });
      const selected = ["Org 1", "Org 2"];
      mutations.SET_SELECTED_ORGANIZATIONS(state, selected);
      expect(state.selectedOrganizations).toEqual(selected);
    });
  });

  describe(SET_SELECTED_JOB_TYPES, () => {
    it("updates organizations that the user as chosen to filter jobs by", () => {
      const state = createState({ selectedJobTypes: [] });
      const selected = ["Full=time", "Part-time"];
      mutations.SET_SELECTED_JOB_TYPES(state, selected);
      expect(state.selectedJobTypes).toEqual(selected);
    });
  });

  describe(SET_SELECTED_DEGREES, () => {
    it("updates degrees that the user as chosen to filter jobs by", () => {
      const state = createState({ selectedDegrees: [] });
      const selected = ["Master's", "Bachelor's"];
      mutations.SET_SELECTED_DEGREES(state, selected);
      expect(state.selectedDegrees).toEqual(selected);
    });
  });

  describe(CLEAR_JOB_FILTERS, () => {
    it("removes all selected filters", () => {
      const state = createState({
        selectedOrganizations: ["Google", "Amazon"],
        selectedJobTypes: ["Full-time", "Part-time"],
        selectedDegrees: ["Master's", "Bachelor's"],
      });

      mutations.CLEAR_JOB_FILTERS(state);
      expect(state.selectedOrganizations).toEqual([]);
      expect(state.selectedJobTypes).toEqual([]);
      expect(state.selectedDegrees).toEqual([]);
    });
  });
});
