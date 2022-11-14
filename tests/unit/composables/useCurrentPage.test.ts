import useCurrentPage from "@/composables/useCurrentPage";
import { useRoute } from "vue-router";
jest.mock("vue-router");


describe("useCurrentPage", () => {
  describe("when query params include page", () => {
    it("returns page", () => {
      (useRoute as jest.Mock).mockReturnValue({ query: { page: 5 } });
      const result = useCurrentPage();
      expect(result.value).toBe(5);
    });
  });

  describe("when query params exclude page", () => {
    it("default to page 1", () => {
      (useRoute as jest.Mock).mockReturnValue({ query: {} });
      const result = useCurrentPage();
      expect(result.value).toBe(1);
    });
  });
});
