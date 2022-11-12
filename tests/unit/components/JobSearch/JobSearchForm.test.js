import { mount } from "@vue/test-utils";
import JobSearchForm from "@/components/JobSearch/JobSearchForm";

describe("JobSearchForm", () => {
  describe("when the user submits the form", () => {
    it("directs user to job search page with params role and location", async () => {
      const push = jest.fn();
      const $router = { push };

      const wrapper = mount(JobSearchForm, {
        attachTo: document.body,
        global: {
          mocks: {
            $router,
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleUserInput = "Vue Developer";
      const locationUserInput = "Edmonton";

      const roleInput = wrapper.find("[data-test='role-input']");
      await roleInput.setValue(roleUserInput);

      const locationInput = wrapper.find("[data-test='location-input']");
      await locationInput.setValue(locationUserInput);

      const submitButton = wrapper.find("[data-test='form-submit-button']");
      await submitButton.trigger("click");

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: {
          role: roleUserInput,
          location: locationUserInput,
        },
      });
    });
  });
});
