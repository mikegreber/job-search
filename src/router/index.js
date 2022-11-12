import { createRouter, createWebHashHistory } from "vue-router";

// lazy load imports
const HomeView = () => import("@/views/HomeView");
const JobResultsView = () =>
  import(/* webpackChunkName: 'jobs' */ "@/views/JobResultsView");
const JobView = () => import(/* webpackChunkName: 'jobs' */ "@/views/JobView");
const TeamsView = () => import("@/views/TeamsView");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jobs/results",
    name: "JobResults",
    component: JobResultsView,
  },
  {
    path: "/jobs/results/:id",
    name: "JobView",
    component: JobView,
  },
  {
    path: "/teams",
    name: "TeamsView",
    component: TeamsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
});

export default router;
