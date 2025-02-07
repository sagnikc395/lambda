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

export function evaluate(term: LambdaTerm): LambdaTerm {
  switch (term.type) {
    case "variable":
      return term;
    case "abstraction":
      return {
        type: "abstraction",
        param: term.param,
        body: evaluate(term.body),
      };
    case "application":
      const func = evaluate(term.func);
      const arg = evaluate(term.arg);
      if (func.type === "abstraction") {
        return evaluate(substitute(func.body, func.param, arg));
      } else {
        return { type: "application", func, arg };
      }
  }
}
