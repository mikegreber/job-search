import axios from "axios";
jest.mock("axios");

import getDegrees from "@/api/getDegrees";

describe("getDegrees", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 1,
          degree: "Master's",
        },
      ],
    });
  });

  it("fetches all possible degree requirements", async () => {
    await getDegrees();
    const baseUrl = process.env.VUE_APP_API_URL;
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/degrees`);
  });

  it("extracts degrees from response", async () => {
    const degrees = await getDegrees();
    expect(degrees).toEqual([
      {
        id: 1,
        degree: "Master's",
      },
    ]);
  });
});
