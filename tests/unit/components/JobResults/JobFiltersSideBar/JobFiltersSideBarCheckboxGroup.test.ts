import { DOMWrapper, shallowMount } from "@vue/test-utils";

import { useRouter } from "vue-router";
jest.mock("vue-router");

import { useStore } from "vuex";
jest.mock("vuex");

import JobFiltersSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarCheckboxGroup.vue";

const useStoreMock = useStore as jest.Mock;
const useRouterMock = useRouter as jest.Mock;

describe("JobFiltersSidebarOrganizations", () => {
  const createConfig = (props = {}) => ({
    props: {
      mutation: "mutation",
      values: new Set(["Value 1", "Value 2"]),
      ...props,
    },
  });

  it("renders unique list of values for filtering jobs", async () => {
    useStoreMock.mockReturnValue({ commit: jest.fn(), subscribe: jest.fn() });
    const values = ["Value 1", "Value 2"];
    const props = { values: new Set(values) };
    const wrapper = shallowMount(
      JobFiltersSideBarCheckboxGroup,
      createConfig(props)
    );

    const labels = wrapper
      .findAll("[data-test='label']")
      .map((node) => node.text());

    expect(labels).toEqual(values);
  });

  it("communicates that user has selected checkbox for value", async () => {
    const commit = jest.fn();
    useStoreMock.mockReturnValue({ commit, subscribe: jest.fn() });
    useRouterMock.mockReturnValue({ push: jest.fn() });

    const props = {
      mutation: "SOME_MUTATION",
      values: new Set(["Value 1"]),
    };
    const wrapper = shallowMount(
      JobFiltersSideBarCheckboxGroup,
      createConfig(props)
    );

    const input = wrapper.find("[data-test='Value 1']");
    await input.setValue(true);

    expect(commit).toHaveBeenCalledWith("SOME_MUTATION", ["Value 1"]);
  });

  it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
    const push = jest.fn();
    useRouterMock.mockReturnValue({ push });
    useStoreMock.mockReturnValue({ commit: jest.fn(), subscribe: jest.fn() });

    const props = { values: new Set(["Value 1"]) };
    const wrapper = shallowMount(
      JobFiltersSideBarCheckboxGroup,
      createConfig(props)
    );

    const input = wrapper.find("[data-test='Value 1']");
    await input.setValue(true);

    expect(push).toHaveBeenCalledWith({ name: "JobResults" });
  });
});
