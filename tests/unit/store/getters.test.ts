import getters from "@/store/getters";
import {
  ORGANIZATIONS,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
  FILTERED_JOBS,
} from "@/store/constants";
import { createState, createJob } from "./utils";

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

  describe(FILTERED_JOBS, () => {
    it("filters jobs by organization and job type", () => {
      const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true);
      const mockGetters = {
        INCLUDE_JOB_BY_ORGANIZATION,
        INCLUDE_JOB_BY_JOB_TYPE,
      };
      const job = createJob({ id: 1, title: "A Job" });
      const state = createState({
        jobs: [job],
      });

      const result = getters.FILTERED_JOBS(state, mockGetters);
      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
    });
  });
});
