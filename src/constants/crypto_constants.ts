import {CryptoEncoding, CryptoMode, CryptoPadding, CryptoType} from "crypto_types";
import crypto from "crypto-js";

const kOptions: Array<CryptoType> = [
  {label: "DES", value: "DES", Cipher: crypto.DES},
  {label: "TripleDES", value: "TripleDES", Cipher: crypto.TripleDES},
  {label: "AES", value: "AES", Cipher: crypto.AES},
  {label: "RC4", value: "RC4", Cipher: crypto.RC4},
];

const kEncodings: Array<CryptoEncoding> = [
  {label: "Hex", value: "Hex", enc: crypto.enc.Hex},
  {label: "Utf8", value: "Utf8", enc: crypto.enc.Utf8},
  {label: "Utf16", value: "Utf16", enc: crypto.enc.Utf16},
  {label: "Utf16BE", value: "Utf16BE", enc: crypto.enc.Utf16BE},
  {label: "Utf16LE", value: "Utf16LE", enc: crypto.enc.Utf16LE},
  {label: "Latin1", value: "Latin1", enc: crypto.enc.Latin1},
  {label: "Base64", value: "Base64", enc: crypto.enc.Base64}
];

const kModes: CryptoMode[] = [
  {label: "ECB", value: "ECB", mode: crypto.mode.ECB},
  {label: "CBC", value: "CBC", mode: crypto.mode.CBC},
  {label: "CFB", value: "CFB", mode: crypto.mode.CFB},
  {label: "OFB", value: "OFB", mode: crypto.mode.OFB},
  {label: "CTR", value: "CTR", mode: crypto.mode.CTR}
];

const kPaddings: Array<CryptoPadding> = [
  {label: "Pkcs7", value: "Pkcs7", padding: crypto.pad.Pkcs7},
  {label: "Iso97971", value: "Iso97971", padding: crypto.pad.Iso97971},
  {label: "AnsiX923", value: "AnsiX923", padding: crypto.pad.AnsiX923},
  {label: "Iso10126", value: "Iso10126", padding: crypto.pad.Iso10126},
  {label: "ZeroPadding", value: "ZeroPadding", padding: crypto.pad.ZeroPadding},
  {label: "NoPadding", value: "NoPadding", padding: crypto.pad.NoPadding}
];

export {kOptions, kEncodings, kModes, kPaddings};