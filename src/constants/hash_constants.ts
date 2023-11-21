import crypto from "crypto-js";
import {HashObject} from "hash_types";

const kOptions: Array<HashObject> = [
  {label: "MD5", value: "MD5", hash: crypto.MD5},
  {label: "SHA1", value: "SHA1", hash: crypto.SHA1},
  {label: "SHA256", value: "SHA256", hash: crypto.SHA256},
  {label: "SHA512", value: "SHA512", hash: crypto.SHA512},
  {label: "HmacMD5", value: "HmacMD5", hash: crypto.HmacMD5}
];

export {kOptions};