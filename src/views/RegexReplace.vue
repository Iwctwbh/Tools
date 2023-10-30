<template>
  <h1 class="title">
    正则替换 RegexReplace (未实现/Not Implemented)
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
    <el-col :lg="5" style="margin: 0 auto; text-align: center;">
      <el-space direction="vertical">
        <custom-draggable ref="custom_draggable" @watch="WatchState" />

        <div style="display: flex; align-items: center;">
          插件
          <el-input v-model="replace_plug" v-check-unzip="replace_plug" />
          <font-awesome-icon @click="copy(replace_plug)" :icon="['far', 'copy']" />
        </div>
        <el-button
          @click="Replace()"
          type="primary"
        >
          Replace
        </el-button>
      </el-space>
    </el-col>
    <el-col :lg="9">
      <el-input
        id="textareaOut"
        v-model="textareaOut"
        :autosize="{ minRows: 15, maxRows: 15 }"
        placeholder="Please input text"
        type="textarea"
      />
      <div id="divJsonOut"></div>
    </el-col>
  </el-row>
</template>

<style>
</style>

<script lang='ts' setup>
// Import
import {ref, watch} from "vue";
import CustomDraggable from "../component/replace-draggable.vue";
import {useClipboard} from "@vueuse/core";
import {ZipString, UnZipString} from "../utils/pako";
import {Plug} from "../types/custom_types";
import type {ReplaceObject, ReplaceElement} from "replace_types";

// Init
let sloth: any = {}; // 是否使用命名空间？
const textareaIn = ref<string>("");
const textareaOut = ref<string>("");
const custom_draggable = ref();
const replace_plug = ref<string>("");
const {copy} = useClipboard();

// Watch
const WatchState = (state: ReplaceElement[]): void => {
  let object: ReplaceObject = {
    Type: Plug.kReplace,
    State: state
  };
  let json_string: string = JSON.stringify(object);
  replace_plug.value = ZipString(json_string);
};

watch(replace_plug, () => {
  try {
    let result: string = UnZipString(replace_plug.value);
    let object: ReplaceObject = JSON.parse(result);
    custom_draggable.value.SetState(object.State);
  } catch (e) {
  }
});

// Function
const Replace = (): void => {
  textareaOut.value = custom_draggable.value.Calculate(textareaIn.value);
};
</script>
