<template>
  <h1 class="title">
    文本对比 WordCompare
  </h1>
  <el-row>
    <el-col :lg="8">
      <div>
        <el-input
            id="textareaIn"
            v-model="textareaIn0"
            :autosize="{ minRows: 15, maxRows: 30 }"
            placeholder="Please input text"
            type="textarea"
        />
      </div>
    </el-col>
    <el-col :lg="8">
      <el-input
          id="textareaOut"
          v-model="textareaIn1"
          :autosize="{ minRows: 15, maxRows: 30 }"
          placeholder="Please input text"
          type="textarea"
      />
    </el-col>

    <el-col :lg="8">
      <div id="divDiffOut" style="min-height: 325px; border: #dcdfe6 solid 1px; padding: 5px 11px;"></div>
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
#divDiffOut span {
  overflow-wrap: break-word;
}

#divDiffOut ins {
  overflow-wrap: break-word;
  color: green;
}

#divDiffOut del {
  overflow-wrap: break-word;
  color: red;
}
</style>

<script lang="ts" setup>
// Import

// Init
import {ref, watch} from "vue";
import {diffChars} from "diff";

let sloth: any = {}; // 是否使用命名空间？
const textareaIn0 = ref<string>("");
const textareaIn1 = ref<string>("");

let arrDiffOut: string[] = [];

// Event
// 监听textareaIn0, textareaIn1
watch([textareaIn0, textareaIn1], (): void => {
  arrDiffOut = [];
  let arrDiff = diffChars(textareaIn0.value, textareaIn1.value);
  arrDiff.forEach(f => {
    if (f.removed) {
      arrDiffOut.push("<del title=\"删除的部分\">" + f.value + "</del>");
    } else if (f.added) {
      arrDiffOut.push("<ins title=\"新增的部分\">" + f.value + "</ins>");
    } else {
      //没有改动的部分
      arrDiffOut.push("<span title=\"没有改动的部分\">" + f.value + "</span>");
    }
  });
  let elementDiffOut = document.getElementById("divDiffOut");
  if (elementDiffOut) {
    elementDiffOut.innerHTML = arrDiffOut.join("");
  }
});
</script>