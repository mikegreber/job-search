import { useStore } from "vuex";
jest.mock("vuex");

import {
  useFilteredJobs,
  useJobTypes,
  useOrganizations,
  useFetchJobsDispatch,
  useDegrees,
  useFetchDegreesDispatch,
} from "@/store/composables";

import {
  FILTERED_JOBS,
  ORGANIZATIONS,
  JOB_TYPES,
  DEGREES,
  FETCH_JOBS,
  FETCH_DEGREES,
} from "@/store/constants";

const useStoreMock = useStore as jest.Mock;

describe("composables", () => {
  describe("useFilteredJobs", () => {
    it("retrieves filtered jobs from store", () => {
      const jobs = [{ id: 1 }];

      useStoreMock.mockReturnValue({
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
    useStoreMock.mockReturnValue({
      getters: { [JOB_TYPES]: jobTypes },
    });

    const result = useJobTypes();
    expect(result.value).toEqual(jobTypes);
  });
});

describe("useOrganizations", () => {
  it("retrieves unique organizations from store", () => {
    const organizations = new Set(["Google"]);
    useStoreMock.mockReturnValue({
      getters: { [ORGANIZATIONS]: organizations },
    });

    const result = useOrganizations();
    expect(result.value).toEqual(organizations);
  });
});

describe("useDegrees", () => {
  it("retrieves unique degrees from store", () => {
    const degrees = ["Master's", "Bachelor's"];
    useStoreMock.mockReturnValue({
      getters: { [DEGREES]: degrees },
    });

    const result = useDegrees();
    expect(result.value).toEqual(degrees);
  });
});

describe("useFetchJobsDispatch", () => {
  it("sends call to fetch jobs from api", () => {
    const dispatch = jest.fn();
    useStoreMock.mockReturnValue({
      dispatch,
    });
    useFetchJobsDispatch();
    expect(dispatch).toHaveBeenCalledWith(FETCH_JOBS);
  });
});

describe("useFetchDegreesDispatch", () => {
  it("sends call to fetch degrees from api", () => {
    const dispatch = jest.fn();
    useStoreMock.mockReturnValue({
      dispatch,
    });
    useFetchDegreesDispatch();
    expect(dispatch).toHaveBeenCalledWith(FETCH_DEGREES);
  });
});
