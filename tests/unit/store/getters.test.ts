import getters from "@/store/getters";
import {
  ORGANIZATIONS,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
  FILTERED_JOBS,
  DEGREES,
  JOB_TYPES,
  INCLUDE_JOB_BY_DEGREE,
  INCLUDE_JOB_BY_SKILL,
} from "@/store/constants";
import { createState, createJob, createDegree } from "./utils";

describe("getters", () => {
  describe(ORGANIZATIONS, () => {
    it("finds unique organizations from list of jobs", () => {
      const state = createState({
        jobs: [
          createJob({ organization: "Google" }),
          createJob({ organization: "Amazon" }),
          createJob({ organization: "Google" }),
        ],
      });
      const result = getters.ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe(JOB_TYPES, () => {
    it("finds unique job types from list of jobs", () => {
      const state = createState({
        jobs: [
          createJob({ jobType: "Full-time" }),
          createJob({ jobType: "Part-time" }),
          createJob({ jobType: "Full-time" }),
        ],
      });
      const result = getters.JOB_TYPES(state);
      expect(result).toEqual(new Set(["Full-time", "Part-time"]));
    });
  });

  describe(DEGREES, () => {
    it("gets unique degree values", () => {
      const degrees = [
        createDegree({ degree: "Master's" }),
        createDegree({ degree: "Bachelor's" }),
      ];
      const state = createState({ degrees });
      const result = getters.DEGREES(state);
      expect(result).toEqual(["Master's", "Bachelor's"]);
    });
  });

  describe(INCLUDE_JOB_BY_ORGANIZATION, () => {
    describe("when the user has not selected any organizations", () => {
      it("includes job", () => {
        const state = createState({ selectedOrganizations: [] });
        const job = createJob({ organization: "Google" });
        const result = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with a selected organization", () => {
      const state = createState({
        selectedOrganizations: ["Google", "Microsoft"],
      });
      const job = createJob({ organization: "Google" });
      const result = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
      expect(result).toBe(true);
    });
  });

  describe(INCLUDE_JOB_BY_JOB_TYPE, () => {
    describe("when the user has not selected any job types", () => {
      it("includes job", () => {
        const state = createState({ selectedJobTypes: [] });
        const job = createJob({ jobType: "Full-time" });
        const result = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with a selected job type", () => {
      const state = createState({
        selectedJobTypes: ["Full-time", "Part-time"],
      });
      const job = createJob({ jobType: "Full-time" });
      const result = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
      expect(result).toBe(true);
    });
  });

  describe(INCLUDE_JOB_BY_DEGREE, () => {
    describe("when the user has not selected any degrees", () => {
      it("includes degree", () => {
        const state = createState({ selectedDegrees: [] });
        const job = createJob({ degree: "Master's" });
        const result = getters.INCLUDE_JOB_BY_DEGREE(state)(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with a selected degrees", () => {
      const state = createState({
        selectedDegrees: ["Master's", "Bachelor's"],
      });
      const job = createJob({ degree: "Master's" });
      const result = getters.INCLUDE_JOB_BY_DEGREE(state)(job);
      expect(result).toBe(true);
    });
  });

  describe(INCLUDE_JOB_BY_SKILL, () => {
    describe("when the not entered a search", () => {
      it("includes all", () => {
        const state = createState({ skillsSearchTerm: "" });
        const job = createJob({ title: "Vue Developer" });
        const result = getters.INCLUDE_JOB_BY_SKILL(state)(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated the search", () => {
      const state = createState({ skillsSearchTerm: "" });
      const job = createJob({ title: "Vue Developer" });
      const result = getters.INCLUDE_JOB_BY_SKILL(state)(job);
      expect(result).toBe(true);
    });

    it("handles inconsistent character casing", () => {
      const state = createState({ skillsSearchTerm: "vuE" });
      const job = createJob({ title: "Vue Developer" });
      const result = getters.INCLUDE_JOB_BY_SKILL(state)(job);
      expect(result).toBe(true);
    });
  });

  describe(FILTERED_JOBS, () => {
    it("filters jobs by organization and job type", () => {
      const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_DEGREE = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_SKILL = jest.fn().mockReturnValue(true);
      const mockGetters = {
        INCLUDE_JOB_BY_ORGANIZATION,
        INCLUDE_JOB_BY_JOB_TYPE,
        INCLUDE_JOB_BY_DEGREE,
        INCLUDE_JOB_BY_SKILL,
      };
      const job = createJob({ id: 1, title: "A Job" });
      const state = createState({
        jobs: [job],
      });

      const result = getters.FILTERED_JOBS(state, mockGetters);
      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_DEGREE).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_SKILL).toHaveBeenCalledWith(job);
    });
  });
});
