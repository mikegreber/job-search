import actions from "@/store/actions";
import getJobs from "@/api/getJobs";
import { RECEIVE_JOBS } from "@/store/constants";
import { createJob } from "./utils";
jest.mock("@/api/getJobs");

describe("actions", () => {
  describe("FETCH_JOBS", () => {
    beforeEach(() => {
      (getJobs as jest.Mock).mockResolvedValue([createJob()]);
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
});
