import { mount } from "@vue/test-utils";
import TextInput from "@/components/Shared/TextInput";

describe("TextInput", () => {
  it("communicates that use has entered character", () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find("input");
    const events = [["a"], ["ab"], ["abc"]];
    for (const i in events) {
      input.setValue(events[i]);
    }
    expect(wrapper.emitted()["update:modelValue"]).toEqual(events);
  });
});
