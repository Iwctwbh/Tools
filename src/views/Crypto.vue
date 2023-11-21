<template>
  <h1 class="title">
    加密/解密 Encrypt/Decrypt (未实现/Not Implemented)
  </h1>
  <el-row>
    <el-col :lg="9">
      <div>
        <el-input
          id="textareaIn"
          v-model="textareaIn"
          :autosize="{ minRows: 15, maxRows: 30 }"
          placeholder="Please input text"
          type="textarea"
        />
      </div>
      <el-upload
        v-model:file-list="fileList"
        class="upload"
        multiple
        :on-preview="uploadPreview"
        :on-change="uploadChange"
        :on-remove="uploadRemove"
        :auto-upload="false"
        :disabled="false"
        accept=".txt, .log"
        style="padding-top: 10px;"
      >
        <el-button
          :loading="isUploadLoading"
        >
          Upload
        </el-button>
        <template #tip>
          <div class="el-upload__tip">
            <!--              jpg/png files with a size less than 500KB.-->
          </div>
        </template>
      </el-upload>
    </el-col>
    <el-col :lg="5" style="margin: 0 auto; padding: 10px 0; text-align: center;">
      <el-radio-group v-model="module">
        <el-radio-button label="单模块">单模块</el-radio-button>
        <el-radio-button label="多模块">多模块</el-radio-button>
      </el-radio-group>
      <div style="display: flex; flex-direction: column; justify-content: space-evenly; height: 100%;">
        <div v-if="module === '单模块'">
          <div style="align-self: center;">
            <el-form label-width="120px">
              <el-form-item label="加密类型">
                <el-select v-model="crypto_option" placeholder="Select">
                  <el-option
                    v-for="item in kOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="Key">
                <multi-mode-input
                  placeholder="Key"
                  v-model="crypto_key"
                >
                </multi-mode-input>
              </el-form-item>

              <el-form-item label="编码类型">
                <el-select v-model="crypto_encoding" placeholder="Select">
                  <el-option
                    v-for="item in kEncodings"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="加密模式">
                <el-select v-model="crypto_mode" placeholder="Select">
                  <el-option
                    v-for="item in kModes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="偏移">
                <el-input
                  v-model="crypto_iv"
                  placeholder="iv"
                ></el-input>
              </el-form-item>

              <el-form-item label="填充方式">
                <el-select v-model="crypto_padding" placeholder="Select">
                  <el-option
                    v-for="item in kPaddings"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="插件">
                <div style="display: flex; align-items: center;">
                  <el-input v-model="crypto_plug" v-check-unzip="crypto_plug" />
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="复制 Copy"
                    placement="right"
                  >
                    <font-awesome-icon @click="copy(crypto_plug)" :icon="['far', 'copy']" />
                  </el-tooltip>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div
          v-if="module === '多模块'"
          style="text-align-last: center;"
        >
          流程
          <br />
          输入
          <draggable
            :list="state"
            ghost-class="ghost"
            chosen-class="chosenClass"
            animation="300"
          >
            <template #item="{ element,index }">
              <el-space
                class="item"
                style="display: flex; align-items: center; justify-content: space-evenly;"
              >
                <el-icon
                  class="add"
                  @click="Add(index)"
                >
                  <CirclePlus />
                </el-icon>
                <el-input
                  placeholder="插件"
                  v-model="element.plug"
                  :readonly="!element.remove_able"
                  v-check-unzip="element.plug"
                />
                <el-icon class="delete" @click="RemoveAt(index)">
                  <CircleClose />
                </el-icon>
              </el-space>
            </template>
          </draggable>
          输出
        </div>
        <div style="height: 10px;"></div>
        <div style="align-self: center;">
          <el-button
            type="primary"
            @click="CryptoForBtn('Encrypt')"
          >
            加密 >>>
          </el-button>
        </div>
        <div style="align-self: center;">
          <el-button
            type="primary"
            @click="CryptoForBtn('Decrypt')"
          >
            解密 >>>
          </el-button>
        </div>
      </div>
    </el-col>
    <el-col :lg="9">
      <el-input
        id="textareaOut"
        v-model="textareaOut"
        :autosize="{ minRows: 15, maxRows: 15 }"
        placeholder="Please input text"
        type="textarea"
      />
      <p style="width: 100%;">
        用时：{{ timeSpend }}
      </p>
    </el-col>
  </el-row>

  <el-row style="justify-content: center;">
    <el-col span="5" style="text-align: center;">
      <p>
        源码参考: <a href="https://github.com/brix/crypto-js" target="_blank">crypto-js</a>
      </p>
    </el-col>
  </el-row>
</template>

<style scoped>
:deep(.el-tree) {
  width: 100%;
}

:deep(.el-select) {
  width: 100%;
}
</style>

<script lang='ts' setup>
// Import
import {ref, watch, reactive, Ref} from "vue";
import crypto from "crypto-js";
import {useClipboard} from "@vueuse/core";
import {ZipString, UnZipString} from "../utils/pako";
import type {CryptoObject} from "crypto_types";
import {kOptions, kEncodings, kModes, kPaddings} from "../constants/crypto_constants";
import {Plug, CommonObject} from "../types/custom_types";
import draggable from "vuedraggable";
import type {ReplaceElement, ReplaceObject} from "replace_types";
import {UploadFile, UploadFiles, UploadProps, UploadUserFile} from "element-plus";
import _ from "lodash";
import moment from "moment";
import MultiModeInput from "../component/multi-mode-input.vue";

// Init
let sloth: any = {}; // 是否使用命名空间？
const textareaIn = ref<string>("");
const textareaOut = ref<string>("");
const crypto_option = ref<string>("TripleDES");
const crypto_key = ref<string>("");
const crypto_encoding = ref<string>("");
const crypto_mode = ref<string>("");
const crypto_padding = ref<string>("");
const crypto_iv = ref<string>("");
const crypto_plug = ref<string>("");
const {copy} = useClipboard();
const module = ref<string>("单模块");
const fileList = ref<UploadUserFile[]>([]);
const timeSpend = ref<string>("");
const isUploadLoading = ref<boolean>(false);

type PlugElement = { plug: string | Ref<string>, remove_able?: boolean };

const state = reactive<PlugElement[]>(
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  [
    {plug: crypto_plug, remove_able: false}
  ],
);

// let object: CryptoObject = {
//   Type: Plug.kCrypto,
//   Option: crypto_option.value,
//   Key: crypto_key.value,
//   Encoding: crypto_encoding.value,
//   Mode: crypto_mode.value,
//   Padding: crypto_padding.value,
//   Iv: crypto_iv.value
// };
// let json_string: string = JSON.stringify(object);
// crypto_plug.value = ZipString(json_string);

watch([crypto_option, crypto_key.value, crypto_encoding, crypto_mode, crypto_padding, crypto_iv], (): void => {
  let object: CryptoObject = {
    Type: Plug.kCrypto,
    Option: crypto_option.value,
    Key: crypto_key.value,
    Encoding: crypto_encoding.value,
    Mode: crypto_mode.value,
    Padding: crypto_padding.value,
    Iv: crypto_iv.value
  };
  let json_string: string = JSON.stringify(object);
  crypto_plug.value = ZipString(json_string);
});

watch(crypto_plug, (): void => {
  try {
    let result: string = UnZipString(crypto_plug.value);
    let object: CryptoObject = JSON.parse(result);
    crypto_option.value = object.Option;
    crypto_key.value = object.Key;
    crypto_encoding.value = object.Encoding;
    crypto_mode.value = object.Mode;
    crypto_padding.value = object.Padding;
    crypto_iv.value = object.Iv;
  } catch (e) {
  }
});

// Function
// 过滤按钮事件
const CryptoForBtn = ref((argAction: string): void => {
  console.log(crypto_key.value);
  let dateTime: Date = new Date();
  new Promise<void>((resolve) => {
    setTimeout(() => {
      dateTime = new Date();
      resolve();
    }, 50);
  }).then(() => {
    switch (argAction) {
      case "Encrypt":
        Encrypt();
        break;
      case "Decrypt":
        Decrypt();
        break;
    }
    timeSpend.value = moment((new Date().getTime() - dateTime.getTime())).format("mm:ss:SSS");
  });
}); // 过滤按钮事件

const Encrypt = (): void => {
  try {
    kOptions.find(item => item.value === crypto_option.value)!.Cipher.encrypt(textareaIn.value, kEncodings.find(item => item.value === crypto_encoding.value)!.enc.parse(crypto_key.value), {
      mode: kModes.find(item => item.value === crypto_mode.value)!.mode,
      padding: kPaddings.find(item => item.value === crypto_padding.value)!.padding,
      iv: crypto_iv.value
    }).toString();
  } catch (e) {
    textareaOut.value = (e as Error).message;
  }
};

const Decrypt = (): void => {
  try {
    if (module.value === "多模块") {
      let result: string = textareaIn.value;
      state.forEach((o) => {
        let object: CommonObject = JSON.parse(UnZipString(o.plug));
        switch (object.Type) {
          case "Crypto":
            let crypto_object: CryptoObject = object as CryptoObject;
            result = result.split("\n").map(s =>
              kOptions.find(item => item.value === crypto_object.Option)!.Cipher.decrypt(s, kEncodings.find(item => item.value === crypto_object.Encoding)!.enc.parse(crypto_object.Key), {
                mode: kModes.find(item => item.value == crypto_object.Mode)?.mode,
                padding: kPaddings.find(item => item.value == crypto_object.Padding)?.padding,
                iv: crypto_object.Iv
              }).toString(crypto.enc.Utf8)
            ).join("\n");
            break;
          case "Replace":
            let replace_object: ReplaceObject = object as ReplaceObject;
            result = result.split("\n").map(s =>
              replace_object.State.map((item: ReplaceElement) => {
                  if (item.regex) {
                    return s = s.replaceAll(new RegExp(item.find, "g"), s.match(new RegExp(item.replace, "g"))?.join("") || "");
                  } else {
                    return s = s.replaceAll(item.find, item.replace);
                  }
                }
              )[replace_object.State.length - 1]
            ).join("\n");
            break;
        }
      });
      textareaOut.value = result;
    } else {
      textareaOut.value = textareaIn.value.split("\n").map(s =>
        kOptions.find(item => item.value === crypto_option.value)!.Cipher.decrypt(s, kEncodings.find(item => item.value === crypto_encoding.value)!.enc.parse(crypto_key.value), {
          mode: kModes.find(item => item.value == crypto_mode.value)?.mode,
          padding: kPaddings.find(item => item.value == crypto_padding.value)?.padding,
          iv: crypto_iv.value
        }).toString(crypto.enc.Utf8)
      ).join("\n");
    }
  } catch (e) {
    textareaOut.value = (e as Error).message;
  }
};

const RemoveAt = (index: number): void => {
  state.splice(index, 1);
  if (state.length === 0) {
    state.push({plug: "", remove_able: true});
  }
};

const Add = (index: number): void => {
  state.splice(index + 1, 0, {plug: "", remove_able: true});
};

// 预览文件
const uploadPreview: UploadProps["onPreview"] = (uploadFile) => {
}; // 预览文件

// 移除文件
const uploadRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
}; // 移除文件

// 上传文件
const uploadChange: UploadProps["onChange"] = (file, uploadFiles) => {
  isUploadLoading.value = true;
  calculateUpload(uploadFiles);
}; // 上传文件

// 根据排序同步获取文件内容
const getFileText = async (uploadFiles: UploadFiles) => {
  for (let i in uploadFiles) {
    let f: UploadFile = uploadFiles[i];
    await f.raw?.text().then((res) => {
      textareaIn.value = res;
      // res.split("\n").filter(f => f !== "").forEach((v) => {
      //   textareaOut.value += v + "\n";
      // });
    });
  }
}; // 根据排序同步获取文件内容

// 上传文件
const calculateUpload: _.DebouncedFunc<any> = _.debounce((uploadFiles: UploadFiles): void => {
  textareaIn.value = "";

  if (uploadFiles.length === 0) {

  } else {
    uploadFiles = _.sortBy(uploadFiles, (s: UploadFile) => s.name);
    fileList.value = uploadFiles;
    getFileText(uploadFiles).then(() => {
      calculateUploadComplete();
    });
  }
}, 1000); // 上传文件

// 上传文件完成
const calculateUploadComplete: _.DebouncedFunc<any> = _.debounce((): void => {
  isUploadLoading.value = false;
}, 1000); // 上传文件完成
</script>
