import { mount } from "@vue/test-utils";

import { useStore } from "vuex";
jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

import JobFiltersSideBarPrompt from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarPrompt.vue";
import { CLEAR_JOB_FILTERS } from "@/store/constants";

describe("JobFiltersSideBarPrompt", () => {
  describe("when user clicks clear filter button", () => {
    it("sends message to clear all of user's job search filters", async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit });
      const wrapper = mount(JobFiltersSideBarPrompt);
      const button = wrapper.find("[data-test='clear-user-job-filters']");
      await button.trigger("click");
      expect(commit).toHaveBeenCalledWith(CLEAR_JOB_FILTERS);
    });
  });
});
