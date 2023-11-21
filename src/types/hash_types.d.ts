declare module "hash_types" {
  import {CommonObject} from "./custom_types";

  type HashObject = CommonObject & {
    State: ReplaceElement[]
  };

  export {HashObject, ReplaceElement};
}