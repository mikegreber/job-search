import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("locates element in list and returns the next element", () => {
    const list = ["A", "B", "C", "D", "E"];
    const value = "C";
    const result = nextElementInList(list, value);
    expect(result).toBe("D");
  });

  it("returns first element if value is last element", () => {
    const list = ["A", "B", "C", "D", "E"];
    const value = "E";
    const result = nextElementInList(list, value);
    expect(result).toBe("A");
  });
});
