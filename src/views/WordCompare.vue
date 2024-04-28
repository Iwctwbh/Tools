<template>
  <h1 class="title">
    文本对比 WordCompare
  </h1>
  <el-row style="max-height: 80%;">
    <el-col>
      <el-radio-group
        v-model="showWay"
      >
        <el-radio label="diffLines" size="large">line</el-radio>
        <el-radio label="diffWords" size="large">word</el-radio>
        <el-radio label="diffChars" size="large">char</el-radio>
        <el-radio label="diffJson" size="large">json</el-radio>
        <el-radio label="diffJsonWithSort" size="large">jsonWithSort</el-radio>
        <el-radio label="diffJsonWithoutValue" size="large">jsonWithoutValue</el-radio>
        <el-radio label="diffCss" size="large">css</el-radio>
        <el-radio label="diffSentences" size="large">sentence</el-radio>
        <el-radio label="diffTrimmedLines" size="large">trimmedLine</el-radio>
        <el-radio label="diffWordsWithSpace" size="large">wordWithSpace</el-radio>
      </el-radio-group>
    </el-col>
    <el-col :lg="8">
      <div>
        <el-input
          id="textareaIn"
          v-model="textareaIn0"
          :autosize="{ minRows: 30, maxRows: 30 }"
          placeholder="Please input text"
          type="textarea"
        />
      </div>
    </el-col>
    <el-col :lg="8">
      <el-input
        id="textareaOut"
        v-model="textareaIn1"
        :autosize="{ minRows: 30, maxRows: 30 }"
        placeholder="Please input text"
        type="textarea"
      />
    </el-col>

    <el-col :lg="8">
      <pre id="preDiffOut"
           style="overflow:auto; min-height: 630px; max-height: 630px; border: #dcdfe6 solid 1px; padding: 5px 11px; margin: 0;"></pre>
    </el-col>
  </el-row>

  <el-row style="justify-content: center;">
    <el-col span="5" style="text-align: center;">
      <p>
        源码参考: <a href="https://github.com/kpdecker/jsdiff" target="_blank">jsdiff</a>
      </p>
    </el-col>
  </el-row>
</template>

<style>
#preDiffOut span {
  overflow-wrap: break-word;
}

#preDiffOut ins {
  overflow-wrap: break-word;
  color: green;
}

#preDiffOut del {
  overflow-wrap: break-word;
  color: red;
}

textarea {
  white-space: nowrap;
}
</style>

<script lang="ts" setup>
// Import

// Init
import {ref, watch} from "vue";
import {
  diffChars,
  diffLines,
  diffJson,
  diffWords,
  diffCss,
  diffSentences,
  diffTrimmedLines,
  diffWordsWithSpace,
  Change
} from "diff";

let sloth: any = {}; // 是否使用命名空间？
const textareaIn0 = ref<string>("");
const textareaIn1 = ref<string>("");
const showWay = ref<string>("diffLines");

let arrDiffOut: string[] = [];

// Event
// 监听textareaIn0, textareaIn1
watch([textareaIn0, textareaIn1, showWay], (): void => {
  arrDiffOut = [];
  let arrDiff: Change[] | undefined;
  switch (showWay.value) {
    case "diffLines":
      arrDiff = diffLines(textareaIn0.value, textareaIn1.value);
      break;
    case "diffWords":
      arrDiff = diffWords(textareaIn0.value, textareaIn1.value);
      break;
    case "diffChars":
      arrDiff = diffChars(textareaIn0.value, textareaIn1.value);
      break;
    case "diffJson":
      arrDiff = diffJson(textareaIn0.value, textareaIn1.value);
      break;
    case "diffJsonWithSort":
      try {
        let text0: string = JSON.stringify(JSON.parse(textareaIn0.value), (obj, value) => typeof value !== "object" ? value : sortJSON(value), 4);
        let text1: string = JSON.stringify(JSON.parse(textareaIn1.value), (obj, value) => typeof value !== "object" ? value : sortJSON(value), 4);
        arrDiff = diffJson(text0, text1);
      } catch {
        arrDiff = diffJson(textareaIn0.value, textareaIn1.value);
      }
      break;
    case "diffJsonWithoutValue":
      try {
        let text0: string = JSON.stringify(JSON.parse(textareaIn0.value),
          (obj, value) => typeof value !== "object" ? "" : Array.isArray(value) ? value : sortJSON(value), 4);
        let text1: string = JSON.stringify(JSON.parse(textareaIn1.value),
          (obj, value) => typeof value !== "object" ? "" : Array.isArray(value) ? value : sortJSON(value), 4);
        // let text1: string = JSON.stringify(JSON.parse(textareaIn1.value), (obj, value) => typeof value !== "object" || Array.isArray(value) ? "" : value, 4);
        arrDiff = diffJson(text0, text1);
      } catch {
        arrDiff = diffJson(textareaIn0.value, textareaIn1.value);
      }
      break;
    case "diffCss":
      arrDiff = diffCss(textareaIn0.value, textareaIn1.value);
      break;
    case "diffSentences":
      arrDiff = diffSentences(textareaIn0.value, textareaIn1.value);
      break;
    case "diffTrimmedLines":
      arrDiff = diffTrimmedLines(textareaIn0.value, textareaIn1.value);
      break;
    case "diffWordsWithSpace":
      arrDiff = diffWordsWithSpace(textareaIn0.value, textareaIn1.value);
      break;
  }
  arrDiff?.forEach(f => {
    if (f.removed) {
      arrDiffOut.push("<del title=\"删除的部分\">" + f.value + "</del>");
    } else if (f.added) {
      arrDiffOut.push("<ins title=\"新增的部分\">" + f.value + "</ins>");
    } else {
      //没有改动的部分
      arrDiffOut.push("<span title=\"没有改动的部分\">" + f.value + "</span>");
    }
  });
  let elementDiffOut = document.getElementById("preDiffOut");
  if (elementDiffOut) {
    elementDiffOut.innerHTML = arrDiffOut.join("");
  }
}); // 监听textareaIn0, textareaIn1

// Function
// sortJSON
const sortJSON = (json: { [key: string]: any }): { [key: string]: any } => {
  const sorted: { [key: string]: any } = {};
  Object.keys(json).sort().forEach(key => {
    sorted[key] = json[key];
  });
  return sorted;
}; // sortJSON

// sortByValue
interface JsonItem {
  value: number;
  [key: string]: any;
}

const sortByJsonValue = (jsonArray: JsonItem[]): JsonItem[] => {
  return jsonArray.sort((a, b) => a.value - b.value);
};// sortByValue
</script>