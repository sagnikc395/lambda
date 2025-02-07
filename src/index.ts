import { evaluate } from "./evaluator";
import { parseLambdaTerm } from "./parser";

const input = "(\\x.\\y.x y) (\\z.z)";
const term = parseLambdaTerm(input);
const result = evaluate(term);

console.log(JSON.stringify(result, null, 2));
