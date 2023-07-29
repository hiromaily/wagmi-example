// See https://nextjs.org/docs/pages/building-your-application/optimizing/testing#setting-up-jest-with-babel
import "@testing-library/jest-dom/extend-expect";
import { TextEncoder, TextDecoder } from "util";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  (global as any).TextDecoder = TextDecoder;
}