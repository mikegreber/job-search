import { FETCH_JOBS, RECEIVE_JOBS } from "@/store/constants";
import getJobs from "@/api/getJobs";

const actions = {
  [FETCH_JOBS]: async (context) => {
    const jobs = await getJobs();
    context.commit(RECEIVE_JOBS, jobs);
  },
};

export default actions;
