import { hashValue } from "utils/hash-value";

const intToRGB = (i: number): string => {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
};

export const stringToHex = (value: string): string => {
  const hash = intToRGB(Number(hashValue(value)));

  return hash;
};
