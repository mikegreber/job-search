import { shallowMount } from "@vue/test-utils";

import { useStore } from "vuex";
jest.mock("vuex");

import JobFiltersSideBar from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBar.vue";

describe("JobFiltersSideBar", () => {
  it("sets up panel for use to filter jobs", () => {
    const wrapper = shallowMount(JobFiltersSideBar);
    expect(wrapper.exists()).toBe(true);
  });
});
