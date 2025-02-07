//parser converts a string repr of a lambda term into our
// LambdaTerm type

import type { LambdaTerm, Variable } from "./types";

export function parseLambdaTerm(input: string): LambdaTerm {
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

  const parseTerm = (): LambdaTerm => {
    skipWhiteSpace();

    if (input[index] === "\\") {
      // Abstraction part
      index += 1; // Skip the '\'
      const param = parseVariable();
      skipWhiteSpace();

      if (input[index] !== ".") {
        throw new Error(`Expected "." after abstraction parameter`);
      }
      index += 1; // Skip the '.'
      const body = parseTerm();
      return {
        type: "abstraction",
        param,
        body,
      };
    } else if (input[index] === "(") {
      // Application part
      index += 1; // Skip the '('
      const func = parseTerm();
      skipWhiteSpace();
      const arg = parseTerm();
      skipWhiteSpace();

      if (input[index] !== ")") {
        throw new Error(`Expected ")" after application`);
      }
      index += 1; // Skip the ')'
      return {
        type: "application",
        func,
        arg,
      };
    } else {
      // Variable part
      const name = parseVariable();
      return { type: "variable", name };
    }
  };

  return parseTerm();
}
