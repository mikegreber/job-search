import { flushPromises, shallowMount, RouterLinkStub } from "@vue/test-utils";
import { FETCH_JOBS, FILTERED_JOBS } from "@/store/constants";
import JobListings from "@/components/JobResults/JobListings";

describe("test", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "1",
      ...queryParams,
    },
  });

  const createStore = (config = {}) => ({
    dispatch: jest.fn(),
    getters: {
      [FILTERED_JOBS]: Array(15).fill({}),
    },
    ...config,
  });

  const createConfig = ($route, $store) => ({
    global: {
      mocks: {
        $route,
        $store,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  describe("when component mounts", () => {
    it("makes call to fetch from api", () => {
      const $route = createRoute();
      const dispatch = jest.fn();
      const $store = createStore({
        dispatch,
      });
      shallowMount(JobListings, createConfig($route, $store));
      expect(dispatch).toHaveBeenCalledWith(FETCH_JOBS);
    });
  });

  it("creates a job listing for max of 10 jobs per page", async () => {
    const $route = createRoute({ page: "1" });
    const $store = createStore();
    const wrapper = shallowMount(JobListings, createConfig($route, $store));
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  it("creates a job listing for max of 10 jobs per page - last page", async () => {
    const $route = createRoute({ page: "2" });
    const $store = createStore();
    const wrapper = shallowMount(JobListings, createConfig($route, $store));
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(5);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const $route = createRoute({ page: undefined });
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number", () => {
      const $route = createRoute({ page: "3" });
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 3");
    });
  });

  describe("when on first page", () => {
    it("does not show link to previous page", async () => {
      const $route = createRoute({ page: "1" });
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const previousPageLink = wrapper.find("[data-test='previous-page-link']");
      expect(previousPageLink.exists()).toBe(false);
    });
    it("shows link to next page", async () => {
      const $route = createRoute({ page: "1" });
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPageLink = wrapper.find("[data-test='next-page-link']");
      expect(nextPageLink.exists()).toBe(true);
    });
  });

  describe("when on last page", () => {
    it("does shows link to previous page", async () => {
      const $route = createRoute({ page: "2" });
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const previousPageLink = wrapper.find("[data-test='previous-page-link']");
      expect(previousPageLink.exists()).toBe(true);
    });
    it("does not show link to next page", async () => {
      const $route = createRoute({ page: "2" });
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPageLink = wrapper.find("[data-test='next-page-link']");
      expect(nextPageLink.exists()).toBe(false);
    });
  });
});
