module Context = Map.make (String)

expection Type_error 

module Typ = struct 
  type typ = TArrow of {param_typ: typ; body_typ: typ} | TInt 
  [@@deriving show {with_path = false}]

  let rec equal a b = 
    match (a,b) with 
    | a ,b when a == b -> true 
    | TInt, TInt -> true 
    | (TArrow {param_typ = param_a; body_typ = body_a},
      TArrow {param_typ = param_b; body_typ = body_b}) -> 
        equal param_a param_b && equal body_a body_b 
    | _ -> false 

end 
   
module Expr = struct
  open Typ

  type expr =
    | Int of int
    | Variable of string
    | Abstraction of { param : string; param_typ : typ; body : expr }
    | Application of { funct : expr; argument : expr }
end



let () = print_endline "Hello, World!"
