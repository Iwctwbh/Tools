declare module "crypto_types" {
  import {CommonObject} from "./custom_types";

  type CryptoObject = CommonObject & {
    Option: string,
    Key: string,
    Encoding: string,
    Mode: string,
    Padding: string,
    Iv: string
  };
  type CryptoOption = { label: string, value: string };
  type CryptoType = CryptoOption & { Cipher: any };
  type CryptoMode = CryptoOption & { mode: any };
  type CryptoPadding = CryptoOption & { padding: any };
  type CryptoEncoding = CryptoOption & { enc: any };

  export {CryptoObject, CryptoOption, CryptoType, CryptoMode, CryptoPadding, CryptoEncoding};
}