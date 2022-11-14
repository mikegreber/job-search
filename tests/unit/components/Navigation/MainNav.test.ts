import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import MainNav from "@/components/Navigation/MainNav.vue";
import { GlobalState } from "@/store/types";
import { Commit } from "vuex";

interface MockStore {
  state: Partial<GlobalState>;
  commit?: Commit;
}

describe("MainNav", () => {
  const createConfig = ($store: MockStore) => ({
    global: {
      mocks: {
        $store,
      },
      stubs: {
        routerLink: RouterLinkStub,
      },
    },
  });

  it("displays company name", () => {
    const store = {
      state: {
        isLoggedIn: true,
      },
    };
    const wrapper = shallowMount(MainNav, createConfig(store));
    expect(wrapper.text()).toMatch("Careers");
  });

  it("displays menu items for Navigation", () => {
    const store = {
      state: {
        isLoggedIn: true,
      },
    };
    const wrapper = shallowMount(MainNav, createConfig(store));
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
      const store = {
        state: {
          isLoggedIn: false,
        },
      };
      const wrapper = shallowMount(MainNav, createConfig(store));
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });

    it("issues call to Vuex to login user", async () => {
      const commit = jest.fn();
      const wrapper = shallowMount(
        MainNav,
        createConfig({
          state: {
            isLoggedIn: false,
          },
          commit,
        })
      );
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");

      expect(commit).toHaveBeenCalledWith("LOGIN_USER");
    });
  });

  describe("when user is logged in", () => {
    it("shows user profile picture", async () => {
      const store = {
        state: {
          isLoggedIn: true,
        },
      };
      const wrapper = shallowMount(MainNav, createConfig(store));
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });

    it("displays sub-Navigation menu with additional information", async () => {
      const store = {
        state: {
          isLoggedIn: true,
        },
      };
      const wrapper = shallowMount(MainNav, createConfig(store));
      const subNav = wrapper.find("[data-test='sub-nav']");
      expect(subNav.exists()).toBe(true);
    });
  });
});
