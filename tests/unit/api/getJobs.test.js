import axios from "axios";
jest.mock("axios");

import getJobs from "@/api/getJobs";

describe("getJobs", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Java Engineer",
        },
      ],
    });
  });

  it("fetches jobs that candidates can apply to", async () => {
    await getJobs();
    const baseUrl = process.env.VUE_APP_API_URL;
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/jobs`);
  });

  it("extracts jobs from response", async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([
      {
        id: 1,
        title: "Java Engineer",
      },
    ]);
  });
});
