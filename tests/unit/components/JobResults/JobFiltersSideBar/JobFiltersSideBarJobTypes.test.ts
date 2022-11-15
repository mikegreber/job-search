import { shallowMount } from "@vue/test-utils";

import { useJobTypes } from "@/store/composables";
jest.mock("@/store/composables");

import { SET_SELECTED_JOB_TYPES } from "@/store/constants";

import JobFiltersSideBarJobTypes from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarJobTypes.vue";
const useJobTypesMock = useJobTypes as jest.Mock;

describe("JobFiltersSideBar", () => {
  it("allows user to filter jobs by job types", () => {
    useJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));

    const wrapper = shallowMount(JobFiltersSideBarJobTypes);
    const jobTypesFilter = wrapper.findComponent({
      name: "JobFiltersSideBarCheckboxGroup",
    });
    // @ts-ignore;
    const { values, mutation } = jobTypesFilter.props();
    expect(values).toEqual(new Set(["Full-time", "Part-time"]));
    expect(mutation).toBe(SET_SELECTED_JOB_TYPES);
  });
});
