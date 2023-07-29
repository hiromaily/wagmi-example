// See https://nextjs.org/docs/pages/building-your-application/optimizing/testing#setting-up-jest-with-babel
import "@testing-library/jest-dom/extend-expect";
import { TextEncoder } from "util";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}