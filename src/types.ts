type Variable = string;

//from the definition of the lambda calculas
export type LambdaTerm =
  | { type: "variable"; name: Variable }
  | { type: "abstraction"; name: Variable; body: LambdaTerm }
  | { type: "application"; func: LambdaTerm; arg: LambdaTerm };
