//parser converts a string repr of a lambda term into our
// LambdaTerm type

import type { LambdaTerm } from "./types";

function parseLambdaTerm(input: string): LambdaTerm {
  let index = 0;

  const skipWhiteSpace = () => {
    while (index < input.length && /\s/.test(input[index])) {
      index++;
    }
  };
}
