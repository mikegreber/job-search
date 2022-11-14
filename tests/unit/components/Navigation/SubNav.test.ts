import { mount } from "@vue/test-utils";

import useConfirmRoute from "@/composables/useConfirmRoute";
jest.mock("@/composables/useConfirmRoute");

import { useFilteredJobs } from "@/store/composables";
jest.mock("@/store/composables");

import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when user is on job page", () => {
    it("displays job count", () => {
      (useConfirmRoute as jest.Mock).mockReturnValue(true);
      (useFilteredJobs as jest.Mock).mockReturnValue([{ id: 1 }, { id: 2 }]);
      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toBe("2 jobs matched");
    });
  });

  describe("when user is not on job page", () => {
    it("does NOT display job count", () => {
      (useConfirmRoute as jest.Mock).mockReturnValue(false);
      (useFilteredJobs as jest.Mock).mockReturnValue([]);
      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
