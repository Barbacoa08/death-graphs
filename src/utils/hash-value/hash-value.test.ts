import { hashValue } from ".";

describe("hashValue util method", () => {
  it("allows comparisons of objects", () => {
    const example = { 1: 1, 2: 2 };
    const hashedObject = hashValue(example);
    expect(hashValue(example)).toBe(hashedObject);
  });

  it("allows comparisons of arrays", () => {
    const example = [1, 2];
    const hashedArray = hashValue(example);
    expect(hashValue(example)).toBe(hashedArray);
  });

  it("allows comparisons of arrays of objects", () => {
    const example = [
      { 1: 1, 2: 2 },
      { 3: 3, 4: 4 },
    ];
    const hashedValue = hashValue(example);
    expect(hashValue(example)).toBe(hashedValue);
  });
});
