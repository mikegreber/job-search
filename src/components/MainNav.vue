<template>
  <header class="w-full text-sm font-semibold">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <a :href="url" class="flex items-center h-full text-xl">
          {{ company }}
        </a>
        <nav class="h-full ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem"
              data-test="main-nav-list-item"
              class="h-full ml-9 first:ml-0"
            >
              <a href="" class="flex items-center h-full py-2.5">
                {{ menuItem }}
              </a>
            </li>
          </ul>
        </nav>
        <div class="flex items-center h-full ml-auto">
          <profile-image
            v-if="isLoggedIn"
            data-test="profile-image"
            @click="logoutUser"
          />
          <action-button
            v-else
            data-test="login-button"
            text="Sign in"
            type="primary"
            @click="loginUser"
          />
        </div>
      </div>
      <sub-nav v-if="isLoggedIn" data-test="sub-nav" />
    </div>
  </header>
</template>

<script>
import ActionButton from "@/components/ActionButton";
import ProfileImage from "@/components/ProfileImage";
import SubNav from "@/components/SubNav";

export default {
  name: "MainNav",
  components: { ProfileImage, ActionButton, SubNav },
  data() {
    return {
      company: "Careers",
      url: "https://careers.google.com",
      menuItems: [
        "Teams",
        "Locations",
        "Life",
        "How we hire",
        "Students",
        "Jobs",
      ],
      isLoggedIn: false,
    };
  },
  methods: {
    loginUser() {
      this.isLoggedIn = true;
    },
    logoutUser() {
      this.isLoggedIn = false;
    },
  },
};
</script>

<style scoped></style>
