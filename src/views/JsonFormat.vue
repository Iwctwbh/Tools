<template>
  <h1 class="title">
    Json格式化 JsonFormat
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
    <el-col :lg="5" style="margin: 0 auto; padding: 10px 0;">
      <div style="display: flex; flex-direction: column; justify-content: space-evenly; height: 100%;">
        <div style="align-self: center;">
          <el-button
              type="primary"
              @click="formatJson()"
          >
            格式化 >>
          </el-button>
        </div>
        <div style="height: 10px;"></div>
        <div style="align-self: center;">
          <el-button
              type="primary"
              @click="reFormatJson()"
          >
            &lt;&lt; 压缩
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
      <div id="divJsonOut"></div>
    </el-col>
  </el-row>
</template>

<style>
</style>

<script lang='ts' setup>
// Import
import {ref} from "vue";
import JSONFormatter from "json-formatter-js";

// Init
let sloth: any = {}; // 是否使用命名空间？
const textareaIn = ref<string>("");
const textareaOut = ref<string>("");

// Function

// formatJson
const formatJson = (): void => {
  try {
    JSON.parse(textareaIn.value);
    textareaOut.value = JSON.stringify(JSON.parse(textareaIn.value), null, 4);

    let myJSON = JSON.parse(textareaIn.value);
    let formatter = new JSONFormatter(myJSON);

    let elementJsonOut = document.getElementById("divJsonOut");
    if (elementJsonOut) {
      elementJsonOut.innerHTML = "";
      elementJsonOut.appendChild(formatter.render());
    }
  } catch {
    textareaOut.value = "Json有误 Json has a mistake.";
  }
}; // formatJson

// reFormatJson
const reFormatJson = (): void => {
  try {
    JSON.parse(textareaOut.value);
    textareaIn.value = JSON.stringify(JSON.parse(textareaOut.value));

    let myJSON = JSON.parse(textareaIn.value);
    let formatter = new JSONFormatter(myJSON);

    let elementJsonOut = document.getElementById("divJsonOut");
    if (elementJsonOut) {
      elementJsonOut.innerHTML = "";
      elementJsonOut.appendChild(formatter.render());
    }
  } catch {
    textareaIn.value = "Json有误 Json has a mistake.";
  }
}; // reFormatJson


</script>
