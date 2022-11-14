import { ref } from "vue";
import { flushPromises, shallowMount, RouterLinkStub } from "@vue/test-utils";

import { useFetchJobsDispatch, useFilteredJobs } from "@/store/composables";
jest.mock("@/store/composables");

import useCurrentPage from "@/composables/useCurrentPage";
jest.mock("@/composables/useCurrentPage");

import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
jest.mock("@/composables/usePreviousAndNextPages");

import JobListings from "@/components/JobResults/JobListings";

describe("test", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  describe("when component mounts", () => {
    it("makes call to fetch from api", () => {
      useFilteredJobs.mockReturnValue(ref([]));
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousAndNextPages.mockReturnValue({ previousPage: ref(1) });
      shallowMount(JobListings, createConfig());
      expect(useFetchJobsDispatch).toHaveBeenCalled();
    });
  });

  it("creates a job listing for max of 10 jobs per page", async () => {
    useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
    useCurrentPage.mockReturnValue(ref(1));
    usePreviousAndNextPages.mockReturnValue({ nextPage: ref(2) });

    const wrapper = shallowMount(JobListings, createConfig());
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  it("creates a job listing for max of 10 jobs per page - last page", async () => {
    useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
    useCurrentPage.mockReturnValue(ref(2));
    usePreviousAndNextPages.mockReturnValue({ previousPage: ref(1) });

    const wrapper = shallowMount(JobListings, createConfig());
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(5);
  });

  describe("when query params exclude page number", () => {
    it("displays page number", () => {
      useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousAndNextPages.mockReturnValue({ previousPage: ref(1) });
      const wrapper = shallowMount(JobListings, createConfig());
      expect(wrapper.text()).toMatch("Page 2");
    });
  });

  describe("when on first page", () => {
    fit("does not show link to previous page", async () => {
      useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
      useCurrentPage.mockReturnValue(ref(1));
      usePreviousAndNextPages.mockReturnValue({ nextPage: ref(2) });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const previousPageLink = wrapper.find("[data-test='previous-page-link']");
      expect(previousPageLink.exists()).toBe(false);
    });
  });

  describe("when not on first page", () => {
    it("shows link to previous page", async () => {
      useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousAndNextPages.mockReturnValue({ previousPage: ref(1) });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const previousPageLink = wrapper.find("[data-test='previous-page-link']");
      expect(previousPageLink.exists()).toBe(true);
    });
  });

  describe("when on last page", () => {
    it("does not show link to next page", async () => {
      useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousAndNextPages.mockReturnValue({ previousPage: ref(1) });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPageLink = wrapper.find("[data-test='next-page-link']");
      expect(nextPageLink.exists()).toBe(false);
    });
  });

  describe("when not on last page", () => {
    it("shows link to next page", async () => {
      useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
      useCurrentPage.mockReturnValue(ref(1));
      usePreviousAndNextPages.mockReturnValue({ nextPage: ref(2) });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPageLink = wrapper.find("[data-test='next-page-link']");
      expect(nextPageLink.exists()).toBe(true);
    });
  });
});
