<template>
  <h1 class="title">
    散列 Hash (未实现/Not Implemented)
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
    </el-col>
    <el-col :lg="5" style="margin: 0 auto; padding: 10px 0; text-align: center;">

      <el-form>
        <el-form-item label="模式">
          <el-select v-model="hash_option" placeholder="Select">
            <el-option
              v-for="item in MD5.kOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="插件">
          <div style="display: flex; align-items: center;">
            <el-input v-model="hash_plug" v-check-unzip="hash_plug" />
            <el-tooltip
              class="box-item"
              effect="dark"
              content="复制 Copy"
              placement="right"
            >
              <font-awesome-icon @click="copy(hash_plug)" :icon="['far', 'copy']" />
            </el-tooltip>
          </div>
        </el-form-item>
      </el-form>
      <div style="align-self: center;">
        <el-button
          type="primary"
          @click="Hash()"
        >
          散列 >>>
        </el-button>
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

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import {ref, watch} from "vue";
import {HashObject} from "hash_types";
import * as MD5 from "../constants/hash_constants";
import {useClipboard} from "@vueuse/core/index";
import {UnZipString, ZipString} from "../utils/pako";
import {Plug} from "../types/custom_types";

const textareaIn = ref<string>("");
const textareaOut = ref<string>("");
const hash_option = ref<string>("MD5");
const hash_plug = ref<string>("");
const {copy} = useClipboard();

// Watch
watch(hash_option, () => {
  ConvertToPlug();
});

watch(hash_plug, () => {
  try {
    let result: string = UnZipString(hash_plug.value);
    let object: HashObject = JSON.parse(result);
    hash_option.value = object.Option;
  } catch (e) {
  }
});

// Function
const Hash = (): void => {
  textareaOut.value = MD5.kOptions.find((item: HashObject) => item.value === hash_option.value)?.hash(textareaIn.value).toString();
};

const ConvertToPlug = (): void => {
  let object: HashObject = {
    Type: Plug.kCrypto,
    Option: hash_option.value,
  };
  let json_string: string = JSON.stringify(object);
  hash_plug.value = ZipString(json_string);
};
ConvertToPlug();
</script>