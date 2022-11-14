import { FETCH_JOBS, RECEIVE_JOBS } from "@/store/constants";
import getJobs from "@/api/getJobs";
import { Commit } from "vuex";

interface Context {
  commit: Commit;
}

const actions = {
  [FETCH_JOBS]: async (context: Context) => {
    const jobs = await getJobs();
    context.commit(RECEIVE_JOBS, jobs);
  },
};

export default actions;
