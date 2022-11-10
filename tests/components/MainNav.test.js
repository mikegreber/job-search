import { shallowMount } from "@vue/test-utils";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays company name", () => {
    const wrapper = shallowMount(MainNav);
    expect(wrapper.text()).toMatch("Careers");
  });

  it("displays menu items for navigation", () => {
    const wrapper = shallowMount(MainNav);
    const menuItems = wrapper.findAll("[data-test='main-nav-list-item']");
    const navigationMenuTexts = menuItems.map((item) => item.text());
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when user is logged out", () => {
    it("prompts user to sign in", () => {
      const wrapper = shallowMount(MainNav);
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });

  describe("when user is logged in", () => {
    it("shows user profile picture", async () => {
      const wrapper = shallowMount(MainNav);
      let loginButton = wrapper.find("[data-test='login-button']");
      let profileImage = wrapper.find("[data-test='profile-image']");

      expect(profileImage.exists()).toBe(false);

      await loginButton.trigger("click");

      profileImage = wrapper.find("[data-test='profile-image']");
      loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(false);
      expect(profileImage.exists()).toBe(true);
    });

    it("displays sub-navigation menu with additional information", async () => {
      const wrapper = shallowMount(MainNav);
      let subNav = wrapper.find("[data-test='sub-nav']");
      expect(subNav.exists()).toBe(false);

      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");

      subNav = wrapper.find("[data-test='sub-nav']");
      expect(subNav.exists()).toBe(true);
    });
  });
});
