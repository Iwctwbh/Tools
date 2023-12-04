declare module "plug_types" {
  import {CommonObject} from "./custom_types";
  import {Ref} from "vue";
  type PlugElement = { plug: string, removable?: boolean };

  type PlugObject = CommonObject & {
    State: PlugElement[]
  };

  export {PlugObject, PlugElement};
}