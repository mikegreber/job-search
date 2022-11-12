import { state, mutations, actions, RECEIVE_JOBS } from "@/store";
import getJobs from "@/api/getJobs";
jest.mock("@/api/getJobs");

describe("state", () => {
  it("is not logged in initially", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

  it("stores job listings", () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });
});

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("it logs the user in", () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state);
      expect(state.isLoggedIn).toEqual(true);
    });
  });

  describe("LOGOUT_USER", () => {
    it("it logs the user out", () => {
      const state = { isLoggedIn: true };
      mutations.LOGOUT_USER(state);
      expect(state.isLoggedIn).toEqual(false);
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("receives jobs from api", () => {
      const state = { jobs: [] };
      const jobs = ["Job 1", "Job 2"];
      mutations.RECEIVE_JOBS(state, jobs);
      expect(state).toEqual({ jobs: jobs });
    });
  });

  describe("actions", () => {
    describe("FETCH_JOBS", () => {
      beforeEach(() => {
        getJobs.mockResolvedValue([{ id: 1, title: "Software Developer" }]);
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
        expect(commit).toHaveBeenCalledWith(RECEIVE_JOBS, [
          { id: 1, title: "Software Developer" },
        ]);
      });
    });
  });
});
