import { createRouter, createWebHashHistory } from "vue-router";

// lazy load imports
const HomeView = () => import("@/views/HomeView");
const JobResultsView = () =>
  import(/* webpackChunkName: 'jobs' */ "@/views/JobResultsView");
const JobView = () => import(/* webpackChunkName: 'jobs' */ "@/views/JobView");

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
    name: "JobListing",
    component: JobView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;