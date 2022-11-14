import { shallowMount } from "@vue/test-utils";
import JobFiltersSideBar from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBar.vue";
import { useJobTypes, useOrganizations } from "@/store/composables";
import {
  SET_SELECTED_JOB_TYPES,
  SET_SELECTED_ORGANIZATIONS,
} from "@/store/constants";
jest.mock("@/store/composables");

const useJobTypesMock = useJobTypes as jest.Mock;
const useOrganizationsMock = useOrganizations as jest.Mock;

describe("JobFiltersSideBar", () => {
  it("allows user to filter jobs by job types", () => {
    useJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
    useOrganizationsMock.mockReturnValue(new Set(["AirBnB"]));
    const wrapper = shallowMount(JobFiltersSideBar);
    const jobTypesFilter = wrapper.findComponent(
      "[data-test='job-types-filter']"
    );
    // @ts-ignore;
    const { header, values, mutation } = jobTypesFilter.props();
    expect(header).toBe("Job Types");
    expect(values).toEqual(new Set(["Full-time", "Part-time"]));
    expect(mutation).toBe(SET_SELECTED_JOB_TYPES);
  });

  it("allows user to filter jobs by organization", () => {
    useJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
    useOrganizationsMock.mockReturnValue(new Set(["AirBnB"]));
    const wrapper = shallowMount(JobFiltersSideBar);
    const jobTypesFilter = wrapper.findComponent(
      "[data-test='organizations-filter']"
    );
    // @ts-ignore;
    const { header, values, mutation } = jobTypesFilter.props();
    expect(header).toBe("Organizations");
    expect(values).toEqual(new Set(["AirBnB"]));
    expect(mutation).toBe(SET_SELECTED_ORGANIZATIONS);
  });
});
