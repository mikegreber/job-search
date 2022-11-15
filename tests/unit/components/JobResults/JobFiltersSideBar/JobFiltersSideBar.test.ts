import { shallowMount } from "@vue/test-utils";

import { useStore } from "vuex";
jest.mock("vuex");

import { useRoute } from "vue-router";
jest.mock("vue-router");

const useStoreMock = useStore as jest.Mock;
const useRouteMock = useRoute as jest.Mock;

import JobFiltersSideBar from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBar.vue";
import { SET_SKILLS_SEARCH_TERM } from "@/store/constants";

describe("JobFiltersSideBar", () => {
  it("sets up panel for use to filter jobs", () => {
    useStoreMock.mockReturnValue({ commit: jest.fn() });
    useRouteMock.mockReturnValue({ query: {} });
    const wrapper = shallowMount(JobFiltersSideBar);
    expect(wrapper.exists()).toBe(true);
  });

  it("reads query params to filter jobs by one or more criteria", () => {
    const commit = jest.fn();
    useStoreMock.mockReturnValue({ commit });
    useRouteMock.mockReturnValue({ query: { role: "Vue" } });
    shallowMount(JobFiltersSideBar);
    expect(commit).toHaveBeenCalledWith(SET_SKILLS_SEARCH_TERM, "Vue");
  });
});
