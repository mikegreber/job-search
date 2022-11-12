import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import MainNav from "@/components/Navigation/MainNav.vue";

describe("MainNav", () => {
  const createConfig = (isLoggedIn, commit = undefined) => ({
    global: {
      mocks: {
        $store: {
          state: {
            isLoggedIn: isLoggedIn,
          },
          commit: commit,
        },
      },
      stubs: {
        routerLink: RouterLinkStub,
      },
    },
  });

  it("displays company name", () => {
    const wrapper = shallowMount(MainNav, createConfig(true));
    expect(wrapper.text()).toMatch("Careers");
  });

  it("displays menu items for Navigation", () => {
    const wrapper = shallowMount(MainNav, createConfig(true));
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
      const wrapper = shallowMount(MainNav, createConfig(false));
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });

    it("issues call to Vuex to login user", async () => {
      const commit = jest.fn();
      const wrapper = shallowMount(MainNav, createConfig(false, commit));
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      expect(commit).toHaveBeenCalledWith("LOGIN_USER");
    });
  });

  describe("when user is logged in", () => {
    it("shows user profile picture", async () => {
      const wrapper = shallowMount(MainNav, createConfig(true));
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });

    it("displays sub-Navigation menu with additional information", async () => {
      const wrapper = shallowMount(MainNav, createConfig(true));
      const subNav = wrapper.find("[data-test='sub-nav']");
      expect(subNav.exists()).toBe(true);
    });
  });
});
