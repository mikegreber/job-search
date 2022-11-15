import { shallowMount } from "@vue/test-utils";

import { useOrganizations } from "@/store/composables";
jest.mock("@/store/composables");

import { SET_SELECTED_ORGANIZATIONS } from "@/store/constants";

import JobFiltersSideBarOrganizations from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarOrganizations.vue";
const useOrganizationsMock = useOrganizations as jest.Mock;

describe("JobFiltersSideBar", () => {
  it("allows user to filter jobs by organization", () => {
    useOrganizationsMock.mockReturnValue(new Set(["AirBnB"]));

    const wrapper = shallowMount(JobFiltersSideBarOrganizations);
    const jobTypesFilter = wrapper.findComponent({
      name: "JobFiltersSideBarCheckboxGroup",
    });
    expect(jobTypesFilter.exists()).toBe(true);
    // @ts-ignore;
    const { values, mutation } = jobTypesFilter.props();

    expect(mutation).toBe(SET_SELECTED_ORGANIZATIONS);

    expect(values).toEqual(new Set(["AirBnB"]));
    expect(mutation).toBe(SET_SELECTED_ORGANIZATIONS);
  });
});
