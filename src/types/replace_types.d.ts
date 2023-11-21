declare module "replace_types" {
  import {CommonObject} from "./custom_types";

  type ReplaceElement = { find: string, replace: string, regex: boolean };

  type ReplaceObject = CommonObject & {
    State: ReplaceElement[]
  };

  export {ReplaceObject, ReplaceElement};
}