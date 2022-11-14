import { useStore } from "vuex";
jest.mock("vuex");

import {
  useFilteredJobs,
  useJobTypes,
  useOrganizations,
  useFetchJobsDispatch,
} from "@/store/composables";

import {
  FILTERED_JOBS,
  ORGANIZATIONS,
  JOB_TYPES,
  FETCH_JOBS,
} from "@/store/constants";

describe("composables", () => {
  describe("useFilteredJobs", () => {
    it("retrieves filtered jobs from store", () => {
      const jobs = [{ id: 1 }];

      useStore.mockReturnValue({
        getters: { [FILTERED_JOBS]: jobs },
      });

      const result = useFilteredJobs();
      expect(result.value).toEqual(jobs);
    });
  });
});

describe("useJobTypes", () => {
  it("retrieves unique jobs from store", () => {
    const jobTypes = new Set(["Full-time"]);
    useStore.mockReturnValue({
      getters: { [JOB_TYPES]: jobTypes },
    });

    const result = useJobTypes();
    expect(result.value).toEqual(jobTypes);
  });
});

describe("useOrganizations", () => {
  it("retrieves unique organizations from store", () => {
    const organizations = new Set(["Google"]);
    useStore.mockReturnValue({
      getters: { [ORGANIZATIONS]: organizations },
    });

    const result = useOrganizations();
    expect(result.value).toEqual(organizations);
  });
});

describe("useFetchJobsDispatch", () => {
  it("sends call to fetch jobs from api", () => {
    const dispatch = jest.fn();
    useStore.mockReturnValue({
      dispatch,
    });
    useFetchJobsDispatch();
    expect(dispatch).toHaveBeenCalledWith(FETCH_JOBS);
  });
});
