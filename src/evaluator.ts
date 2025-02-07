// evaluator will reduce the terms using beta-reduction

import type { LambdaTerm, Variable } from "./types";

export function substitute(
  term: LambdaTerm,
  variable: Variable,
  replacement: LambdaTerm
): LambdaTerm {
  switch (term.type) {
    case "variable":
      return term.name === variable ? replacement : term;
    case "abstraction":
      if (term.param === variable) {
        return term;
      } else {
        return {
          type: "abstraction",
          param: term.param,
          body: substitute(term.body, variable, replacement),
        };
      }
    case "application":
      return {
        type: "application",
        func: substitute(term.func, variable, replacement),
        arg: substitute(term.arg, variable, replacement),
      };
  }
}

