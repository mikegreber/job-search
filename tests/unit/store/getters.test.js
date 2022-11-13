import getters from "@/store/getters";
import {
  ORGANIZATIONS,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
  FILTERED_JOBS,
} from "@/store/constants";

describe("getters", () => {
  describe(ORGANIZATIONS, () => {
    it("finds unique organizations from list of jobs", () => {
      const state = {
        jobs: [
          {
            organization: "Google",
          },
          {
            organization: "Amazon",
          },
          {
            organization: "Google",
          },
        ],
      };
      const result = getters.ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe(INCLUDE_JOB_BY_ORGANIZATION, () => {
    describe("when the user has not selected any organizations", () => {
      it("includes job", () => {
        const state = { selectedOrganizations: [] };
        const job = { organization: "Google" };
        const result = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with a selected organization", () => {
      const state = { selectedOrganizations: ["Google", "Microsoft"] };
      const job = { organization: "Google" };
      const result = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
      expect(result).toBe(true);
    });
  });

  describe(INCLUDE_JOB_BY_JOB_TYPE, () => {
    describe("when the user has not selected any job types", () => {
      it("includes job", () => {
        const state = { selectedJobTypes: [] };
        const job = { jobType: "Full-time" };
        const result = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with a selected job type", () => {
      const state = { selectedJobTypes: ["Full-time", "Part-time"] };
      const job = { jobType: "Full-time" };
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
      const job = { id: 1, title: "A Job" };
      const state = {
        jobs: [job],
      };

      const result = getters.FILTERED_JOBS(state, mockGetters);
      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
    });
  });
});
