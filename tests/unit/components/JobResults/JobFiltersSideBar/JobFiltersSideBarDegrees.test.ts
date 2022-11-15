import { shallowMount } from "@vue/test-utils";

import { useDegrees } from "@/store/composables";
jest.mock("@/store/composables");

import { SET_SELECTED_DEGREES } from "@/store/constants";

import JobFiltersSideBarDegrees from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarDegrees.vue";

const useDegreesMock = useDegrees as jest.Mock;

describe("JobFiltersSideBarDegrees", () => {
  it("allows user to filter jobs by degrees", () => {
    useDegreesMock.mockReturnValue(["Master's", "Bachelor's"]);

    const wrapper = shallowMount(JobFiltersSideBarDegrees);
    const jobTypesFilter = wrapper.findComponent({
      name: "JobFiltersSideBarCheckboxGroup",
    });
    // @ts-ignore;
    const { values, mutation } = jobTypesFilter.props();
    expect(values).toEqual(["Master's", "Bachelor's"]);
    expect(mutation).toBe(SET_SELECTED_DEGREES);
  });
});
