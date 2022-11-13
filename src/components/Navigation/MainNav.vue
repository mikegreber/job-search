<template>
  <header :class="['w-full', 'text-sm', 'font-semibold', headerHeightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex items-center h-full text-xl"
        >
          Careers
        </router-link>
        <nav class="h-full ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem"
              data-test="main-nav-list-item"
              class="h-full ml-9 first:ml-0"
            >
              <router-link
                :to="menuItem.url"
                class="flex items-center h-full py-2.5"
              >
                {{ menuItem.text }}
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="flex items-center h-full ml-auto">
          <profile-image
            v-if="isLoggedIn"
            data-test="profile-image"
            @click="LOGOUT_USER()"
          />
          <action-button
            v-else
            data-test="login-button"
            text="Sign in"
            type="primary"
            @click="LOGIN_USER()"
          />
        </div>
      </div>
      <sub-nav v-if="isLoggedIn" data-test="sub-nav" />
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import ActionButton from "@/components/Shared/ActionButton";
import ProfileImage from "@/components/Navigation/ProfileImage";
import SubNav from "@/components/Navigation/SubNav";
import { LOGIN_USER, LOGOUT_USER } from "@/store/constants";

export default {
  name: "MainNav",
  components: { ProfileImage, ActionButton, SubNav },
  data() {
    return {
      menuItems: [
        { text: "Teams", url: "/teams" },
        { text: "Locations", url: "/" },
        { text: "Life", url: "/" },
        { text: "How we hire", url: "/" },
        { text: "Students", url: "/" },
        { text: "Jobs", url: "/jobs/results" },
      ],
    };
  },
  computed: {
    headerHeightClass() {
      return {
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn,
      };
    },
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    ...mapMutations([LOGIN_USER, LOGOUT_USER]),
  },
};
</script>

<style scoped></style>
