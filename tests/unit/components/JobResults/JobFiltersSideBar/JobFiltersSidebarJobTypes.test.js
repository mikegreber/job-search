import { mount } from "@vue/test-utils";
import JobFiltersSideBarJobTypes from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarJobTypes";
import { JOB_TYPES, SET_SELECTED_JOB_TYPES } from "@/store/constants";

describe("JobFiltersSidebarOrganizations", () => {
  const createConfig = ($store, $router) => ({
    global: {
      mocks: {
        $store,
        $router,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders unique list of job types for filtering jobs", async () => {
    const $store = {
      getters: {
        [JOB_TYPES]: new Set(["Full-time", "Part-time"]),
      },
    };
    const $router = { push: jest.fn() };
    const wrapper = mount(
      JobFiltersSideBarJobTypes,
      createConfig($store, $router)
    );
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const jobTypeLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = jobTypeLabels.map((node) => node.text());
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  it("communicates that user has selected checkbox for job types", async () => {
    const commit = jest.fn();
    const $store = {
      getters: {
        [JOB_TYPES]: new Set(["Full-time", "Part-time"]),
      },
      commit,
    };
    const $router = { push: jest.fn() };
    const wrapper = mount(
      JobFiltersSideBarJobTypes,
      createConfig($store, $router)
    );
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const fullTimeInput = wrapper.find("[data-test='Full-time']");
    await fullTimeInput.setChecked();

    expect(commit).toHaveBeenCalledWith(SET_SELECTED_JOB_TYPES, ["Full-time"]);
  });

  it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
    const $store = {
      getters: {
        [JOB_TYPES]: new Set(["Full-time", "Part-time"]),
      },
      commit: jest.fn(),
    };
    const push = jest.fn();
    const $router = { push };
    const wrapper = mount(
      JobFiltersSideBarJobTypes,
      createConfig($store, $router)
    );
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const googleInput = wrapper.find("[data-test='Full-time']");
    await googleInput.setChecked();

    expect(push).toHaveBeenCalledWith({ name: "JobResults" });
  });
});
