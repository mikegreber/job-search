import { mount } from "@vue/test-utils";
import AccordionComponent from "@/components/Shared/AccordionComponent";

describe("AccordionComponent", () => {
  const createConfig = (config = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "Header",
    },
    ...config,
  });

  it("renders child", async () => {
    const slots = { default: "<h3>My nested child</h3>" };
    const config = { slots };
    const wrapper = mount(AccordionComponent, createConfig(config));
    expect(wrapper.text()).not.toMatch("My nested child");
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    expect(wrapper.text()).toMatch("My nested child");
  });

  describe("when we do not provide custom child content", () => {
    it("renders default content", async () => {
      const wrapper = mount(AccordionComponent, createConfig());
      expect(wrapper.text()).not.toMatch("slot empty");
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      expect(wrapper.text()).toMatch("slot empty");
    });
  });
});
