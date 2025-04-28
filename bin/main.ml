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

module Infer = struct 
  open Typ 
  open Expr 

  let rec infer context expr = 
    match expr with 
    | Int _ -> TInt 
    | Variable name -> (
      match Context.find_opt name context with 
      | Some typ -> typ 
      | None -> raise Type_error
    )
    | Abstraction {param; param_typ; body} -> 
      let context = Context.add param param_type context in 
      let body_typ = infer context body in 
      TArrow {param_typ; body_typ}
    | Application {funct; argument} -> (
      let funct_typ = infer context funct in
        let argument_typ = infer context argument in
        match funct_typ with
        | TArrow { param_typ; body_typ } when Typ.equal param_typ argument_typ
          ->
            body_typ
        | _ -> raise Type_error
    )

end 




let () = print_endline "Hello, World!"
