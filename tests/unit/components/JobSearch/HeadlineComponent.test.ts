import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import HeadlineComponent from "@/components/JobSearch/HeadlineComponent.vue";

describe("HeadlineComponent", () => {
  beforeEach(() => {
    jest.useFakeTimers("legacy");
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("displays introductory action verb", () => {
    const wrapper = mount(HeadlineComponent);
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Build for everyone");
  });

  it("changes action verb at a consistent interval", () => {
    mount(HeadlineComponent);
    expect(setInterval).toHaveBeenCalled();
  });

  it("swaps action verb after first interval", async () => {
    const wrapper = mount(HeadlineComponent);
    jest.runOnlyPendingTimers();
    await nextTick();
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Create for everyone");
  });

  it("removes interval when component disappears", () => {
    const wrapper = mount(HeadlineComponent);
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalled();
  });
});
