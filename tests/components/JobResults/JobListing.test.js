import { mount, RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "Google",
    ...jobProps,
  });

  const createConfig = (jobProps) => ({
    props: {
      job: {
        ...jobProps,
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
    const jobProps = createJobProps({ title: value });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch(value);
  });

  it("displays organization", () => {
    const value = "Google";
    const jobProps = createJobProps({ organization: value });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch(value);
  });

  it("displays job locations", () => {
    const locations = ["Edmonton", "Calgary"];
    const jobProps = createJobProps({ locations: locations });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch(locations[0]);
    expect(wrapper.text()).toMatch(locations[1]);
  });

  it("displays minimum qualifications", () => {
    const qualifications = ["C#", "JavaScript"];
    const jobProps = createJobProps({ minimumQualifications: qualifications });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch(qualifications[0]);
    expect(wrapper.text()).toMatch(qualifications[1]);
  });

  it("links to individual jobs page", () => {
    const jobProps = createJobProps({ id: 12 });
    const wrapper = mount(JobListing, createConfig(jobProps));
    const routerLinkStub = wrapper.findComponent(RouterLinkStub);
    const toProp = routerLinkStub.props("to");
    expect(toProp).toMatch(`/jobs/results/${jobProps.id}`);
  });
});
