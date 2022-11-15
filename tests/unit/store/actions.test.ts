import actions from "@/store/actions";
import getJobs from "@/api/getJobs";
import {
  FETCH_DEGREES,
  FETCH_JOBS,
  RECEIVE_DEGREES,
  RECEIVE_JOBS,
} from "@/store/constants";

import { createDegree, createJob } from "./utils";
jest.mock("@/api/getJobs");

import getDegrees from "@/api/getDegrees";
jest.mock("@/api/getDegrees");

const getJobsMock = getJobs as jest.Mock;
const getDegreesMock = getDegrees as jest.Mock;

describe("actions", () => {
  describe(FETCH_JOBS, () => {
    beforeEach(() => {
      getJobsMock.mockResolvedValue([createJob()]);
    });

    it("makes request to fetch jobs", async () => {
      const context = {
        commit: jest.fn(),
      };
      await actions.FETCH_JOBS(context);
      expect(getJobs).toHaveBeenCalled();
    });

    it("sends message to save received jobs in the store", async () => {
      const commit = jest.fn();
      const context = { commit };
      await actions.FETCH_JOBS(context);
      expect(commit).toHaveBeenCalledWith(RECEIVE_JOBS, [createJob()]);
    });
  });

  describe(FETCH_DEGREES, () => {
    beforeEach(() => {
      getDegreesMock.mockResolvedValue([createDegree()]);
    });

    it("makes request to fetch jobs", async () => {
      const context = {
        commit: jest.fn(),
      };
      await actions.FETCH_DEGREES(context);
      expect(getDegrees).toHaveBeenCalled();
    });

    it("sends message to save received jobs in the store", async () => {
      const commit = jest.fn();
      const context = { commit };
      await actions.FETCH_DEGREES(context);
      expect(commit).toHaveBeenCalledWith(RECEIVE_DEGREES, [createDegree()]);
    });
  });
});
