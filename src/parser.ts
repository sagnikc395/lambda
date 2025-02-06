//parser converts a string repr of a lambda term into our
// LambdaTerm type

import type { LambdaTerm, Variable } from "./types";

function parseLambdaTerm(input: string): LambdaTerm {
  let index = 0;

  const skipWhiteSpace = () => {
    //skips whitespaces until the next thing is matched
    while (index < input.length && /\s/.test(input[index])) {
      index++;
    }
  };
  const parseVariable = (): Variable => {
    let variable = "";
    while (index < input.length && /[a-zA-Z]/.test(input[index])) {
      variable += input[index];
    }
    return variable;
  };

  const parseTerm = (): LambdaTerm => {};
}
