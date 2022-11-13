import mutations from "@/store/mutations";
import { SET_SELECTED_ORGANIZATIONS} from "@/store/constants";

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
      expect(state.jobs).toEqual(jobs);
    });
  });

  describe(SET_SELECTED_ORGANIZATIONS, () => {
    it("updates organizations that the user as chosen to filter jobs by", () => {
      const state = { selectedOrganizations: [] };
      const selected = ["Org 1", "Org 2"];
      mutations.SET_SELECTED_ORGANIZATIONS(state, selected);
      expect(state.selectedOrganizations).toEqual(selected);
    });
  });
});
