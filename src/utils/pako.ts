import pako from "pako";
import {range} from "lodash";

// ArrayBuffer转为字符串，参数为ArrayBuffer对象
const ConvertArrayBufferToString = (buf: ArrayBuffer): string => {
  let binaryString: string = "";
  let bytes: Uint16Array = new Uint16Array(buf);
  let length: number = bytes.length;
  range(0, length).forEach(i => binaryString += String.fromCharCode(bytes[i]));
  return binaryString;
};

const ZipString = (data: string): string => {
  let binary_string: Uint8Array = pako.deflate(data);
  let result: string = ConvertArrayBufferToString(binary_string);
  return btoa(result).split("").reverse().join("");
};

const UnZipString = (base64_data: string): string => {
  let string_data: string = atob(base64_data.split("").reverse().join(""));
  let char_data: number[] = string_data.split("").map(m => m.charCodeAt(0));
  let array_data: Uint8Array = new Uint8Array(char_data);
  let result: Uint8Array = pako.inflate(array_data);
  return new TextDecoder().decode(result);
};

const CheckUnZipString = (base64_data: string): boolean => {
  try {
    JSON.parse(UnZipString(base64_data));
    return true;
  } catch (e) {
    return false;
  }
};

export {ZipString, UnZipString, CheckUnZipString};