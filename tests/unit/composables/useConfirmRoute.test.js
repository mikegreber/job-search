import useConfirmRoute from "@/composables/useConfirmRoute";
import { useRoute } from "vue-router";
jest.mock("vue-router");

describe("atRoute", () => {
  it("determines if page route matches specified route true", () => {
    const routeName = "Home";
    useRoute.mockReturnValue({ name: routeName });
    const result = useConfirmRoute(routeName);
    expect(result.value).toBe(true);
  });

  it("determines if page route matches specified route false", () => {
    useRoute.mockReturnValue({ name: "Home" });
    const result = useConfirmRoute("OtherRoute");
    expect(result.value).toBe(false);
  });
});
