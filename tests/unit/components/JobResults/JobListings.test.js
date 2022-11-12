import { flushPromises, shallowMount, RouterLinkStub } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios");

import JobListings from "@/components/JobResults/JobListings";

describe("test", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
  });

  afterEach(() => {
    axios.get.mockReset();
  });

  const createRoute = (queryParams = {}) => ({
    query: {
      page: "1",
      ...queryParams,
    },
  });

  const createConfig = ($route) => ({
    global: {
      mocks: {
        $route,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("fetches jobs", () => {
    shallowMount(JobListings, createConfig(createRoute()));
    const baseUrl = process.env.VUE_APP_API_URL;
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/jobs`);
  });

  it("creates a job listing for max of 10 jobs per page", async () => {
    const wrapper = shallowMount(
      JobListings,
      createConfig(createRoute({ page: "1" }))
    );
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  it("creates a job listing for max of 10 jobs per page - last page", async () => {
    const wrapper = shallowMount(
      JobListings,
      createConfig(createRoute({ page: "2" }))
    );
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(5);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const $route = createRoute({ page: undefined });
      const wrapper = shallowMount(JobListings, createConfig($route));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number", () => {
      const $route = createRoute({ page: "3" });
      const wrapper = shallowMount(JobListings, createConfig($route));
      expect(wrapper.text()).toMatch("Page 3");
    });
  });

  describe("when on first page", () => {
    it("does not show link to previous page", async () => {
      const wrapper = shallowMount(
        JobListings,
        createConfig(createRoute({ page: "1" }))
      );
      await flushPromises();
      const previousPageLink = wrapper.find("[data-test='previous-page-link']");
      expect(previousPageLink.exists()).toBe(false);
    });
    it("shows link to next page", async () => {
      const wrapper = shallowMount(
        JobListings,
        createConfig(createRoute({ page: "1" }))
      );
      await flushPromises();
      const nextPageLink = wrapper.find("[data-test='next-page-link']");
      expect(nextPageLink.exists()).toBe(true);
    });
  });

  describe("when on last page", () => {
    it("does shows link to previous page", async () => {
      const wrapper = shallowMount(
        JobListings,
        createConfig(createRoute({ page: "2" }))
      );
      await flushPromises();
      const previousPageLink = wrapper.find("[data-test='previous-page-link']");
      expect(previousPageLink.exists()).toBe(true);
    });
    it("does not show link to next page", async () => {
      const wrapper = shallowMount(
        JobListings,
        createConfig(createRoute({ page: "2" }))
      );
      await flushPromises();
      const nextPageLink = wrapper.find("[data-test='next-page-link']");
      expect(nextPageLink.exists()).toBe(false);
    });
  });
});
