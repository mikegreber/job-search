import { flushPromises, mount } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios");

import SpotlightComponent from "@/components/JobSearch/SpotlightComponent";

describe("SpotlightComponent", () => {
  const mockSpotlightResponse = (data = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          img: "Some image",
          title: "Some title",
          description: "Some description",
          ...data,
        },
      ],
    });
  };

  const createConfig = (prop) => ({
    slots: {
      default: `<template #default="slotProps"><h1>{{ slotProps.${prop} }}</h1></template>`,
    },
  });

  it("provides img attribute to parent component", async () => {
    mockSpotlightResponse({ img: "Some image" });
    const wrapper = mount(SpotlightComponent, createConfig("img"));
    await flushPromises();
    expect(wrapper.text()).toMatch("Some image");
  });
  it("provides title attribute to parent component", async () => {
    mockSpotlightResponse({ title: "Some title" });
    const wrapper = mount(SpotlightComponent, createConfig("title"));
    await flushPromises();
    expect(wrapper.text()).toMatch("Some title");
  });
  it("provides description attribute to parent component", async () => {
    mockSpotlightResponse({ description: "Some description" });
    const wrapper = mount(SpotlightComponent, createConfig("description"));
    await flushPromises();
    expect(wrapper.text()).toMatch("Some description");
  });
});
