import { mount } from "@vue/test-utils";

import { useRouter } from "vue-router";
jest.mock("vue-router");

import { useStore } from "vuex";
jest.mock("vuex");

import JobFiltersSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarCheckboxGroup";

describe("JobFiltersSidebarOrganizations", () => {
  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "Header",
      mutation: "mutation",
      values: new Set(["Value 1", "Value 2"]),
      ...props,
    },
  });

  it("renders unique list of values for filtering jobs", async () => {
    const values = ["Value 1", "Value 2"];
    const props = { values: new Set(values) };
    const wrapper = mount(JobFiltersSideBarCheckboxGroup, createConfig(props));

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const labels = wrapper
      .findAll("[data-test='label']")
      .map((node) => node.text());

    expect(labels).toEqual(values);
  });

  it("communicates that user has selected checkbox for value", async () => {
    const commit = jest.fn();
    useStore.mockReturnValue({ commit });
    useRouter.mockReturnValue({ push: jest.fn() });

    const props = {
      mutation: "SOME_MUTATION",
      values: new Set(["Value 1"]),
    };
    const wrapper = mount(JobFiltersSideBarCheckboxGroup, createConfig(props));

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const input = wrapper.find("[data-test='Value 1']");
    await input.setChecked();

    expect(commit).toHaveBeenCalledWith("SOME_MUTATION", ["Value 1"]);
  });

  it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });
    useStore.mockReturnValue({ commit: jest.fn() });

    const props = { values: new Set(["Value 1"]) };
    const wrapper = mount(JobFiltersSideBarCheckboxGroup, createConfig(props));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const input = wrapper.find("[data-test='Value 1']");
    await input.setChecked();

    expect(push).toHaveBeenCalledWith({ name: "JobResults" });
  });
});
