/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as matchers from "./matchers";

const jestExpect: jest.Expect = global?.expect;

if (jestExpect !== undefined) {
  jestExpect.extend(matchers);
} else {
  throw new Error(
    "Unable to find Jest's global expect. " +
      "Please check you have added jest-extended correctly to your jest configuration. " +
      "See https://github.com/jest-community/jest-extended#setup for help."
  );
}
