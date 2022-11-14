import { mount, RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing.vue";
import { createJob } from "../../store/utils";
import { Job } from "@/api/types";

describe("JobListing", () => {
  const createConfig = (job: Job) => ({
    props: {
      job: {
        ...job,
      },
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("displays job title", () => {
    const value = "Vue Programmer";
    const jobProps = createJob({ title: value });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch(value);
  });

  it("displays organization", () => {
    const value = "Google";
    const jobProps = createJob({ organization: value });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch(value);
  });

  it("displays job locations", () => {
    const locations = ["Edmonton", "Calgary"];
    const jobProps = createJob({ locations: locations });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch(locations[0]);
    expect(wrapper.text()).toMatch(locations[1]);
  });

  it("displays minimum qualifications", () => {
    const qualifications = ["C#", "JavaScript"];
    const jobProps = createJob({ minimumQualifications: qualifications });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch(qualifications[0]);
    expect(wrapper.text()).toMatch(qualifications[1]);
  });

  it("links to individual jobs page", () => {
    const jobProps = createJob({ id: 12 });
    const wrapper = mount(JobListing, createConfig(jobProps));
    const routerLinkStub = wrapper.findComponent(RouterLinkStub);
    const toProp = routerLinkStub.props("to");
    expect(toProp).toMatch(`/jobs/results/${jobProps.id}`);
  });
});
