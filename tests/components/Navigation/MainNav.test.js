import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import MainNav from "@/components/Navigation/MainNav.vue";

describe("MainNav", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        routerLink: RouterLinkStub,
      },
    },
  });

  it("displays company name", () => {
    const wrapper = shallowMount(MainNav, createConfig());
    expect(wrapper.text()).toMatch("Careers");
  });

  it("displays menu items for Navigation", () => {
    const wrapper = shallowMount(MainNav, createConfig());
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
      const wrapper = shallowMount(MainNav, createConfig());
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });

  describe("when user is logged in", () => {
    it("shows user profile picture", async () => {
      const wrapper = shallowMount(MainNav, createConfig());
      let loginButton = wrapper.find("[data-test='login-button']");
      let profileImage = wrapper.find("[data-test='profile-image']");

      expect(profileImage.exists()).toBe(false);

      await loginButton.trigger("click");

      profileImage = wrapper.find("[data-test='profile-image']");
      loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(false);
      expect(profileImage.exists()).toBe(true);
    });

    it("displays sub-Navigation menu with additional information", async () => {
      const wrapper = shallowMount(MainNav, createConfig());
      let subNav = wrapper.find("[data-test='sub-nav']");
      expect(subNav.exists()).toBe(false);

      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");

      subNav = wrapper.find("[data-test='sub-nav']");
      expect(subNav.exists()).toBe(true);
    });
  });
});
