<template>
  <h1 class="title">
    HTML 压缩/解压
  </h1>
  <el-row style="justify-content: center;">
    <el-col :lg="2">
      <el-button
        style=""
        size="large"
        type="primary"
        @click="btnCompress">
        压缩
      </el-button>
    </el-col>
    <el-col :lg="2">
      <el-button
        style=""
        size="large"
        type="primary"
        @click="btnDecompression">
        解压
      </el-button>
    </el-col>
  </el-row>
  <el-row style="justify-content: center;">
    <el-col :lg="12">
      <textarea-row-number
        ref="areaText"
        style="overflow: hidden"
      >
      </textarea-row-number>
    </el-col>

    <el-col :lg="12">
      <textarea-row-number
        :textarea-id="'textareaOut'"
        ref="areaText2"
      >
      </textarea-row-number>
    </el-col>
  </el-row>
</template>

<script lang='ts' setup>
import {ref} from "vue";
import vkbeautify from "vkbeautify";
import TextareaRowNumber from "../component/textarea-row-number.vue";

const areaText = ref();
const areaText2 = ref();
const btnDecompression = (): void => {
  areaText.value.textValue = vkbeautify.xml(areaText2.value.textValue);
};

const btnCompress = (): void => {
  let source = areaText.value.textValue;
  if (source.length == 0) {
    areaText2.value.textValue = "待压缩的HTML不能为空！";
    return;
  }
  areaText2.value.textValue = source.replace(new RegExp(/\n+/g), "")
    //.replace(new RegExp(/<!--.*?-->/ig), "")
    .replace(new RegExp(/\/\*.*?\*\//ig), "")
    .replace(new RegExp(/>\s{2,}/ig), ">")
    .replace(new RegExp(/\s{2,}</ig), "<");
};
</script>

