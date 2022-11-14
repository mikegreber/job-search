import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
import { ref } from "vue";

describe("usePreviousAndNextPages", () => {
  it("calculates page before current one", () => {
    const currentPage = ref(8);
    const maxPage = ref(9);
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(previousPage.value).toBe(7);
  });

  describe("when current page is the first page", () => {
    it("returns undefined", () => {
      const currentPage = ref(1);
      const maxPage = ref(9);
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });

  it("calculates page after current one", () => {
    const currentPage = ref(8);
    const maxPage = ref(9);
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(nextPage.value).toBe(9);
  });

  describe("when current page is the last page", () => {
    it("returns undefined", () => {
      const currentPage = ref(9);
      const maxPage = ref(9);
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
