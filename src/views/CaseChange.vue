<template>
  <h1 class="title">
    大小写切换 CaseChange
  </h1>
  <el-row style="padding-top: 10px; justify-content: center;">
    <el-col :lg="12">
      <el-button-group>
        <el-button @click="btnUpperCaseClick">
          字母大写 UpperCase
        </el-button>

        <el-button @click="btnLowerCaseClick">
          字母小写 LowerCase
        </el-button>

        <el-button @click="btnInitialsInCapitals">
          首字母大写 Initials In Capitals
        </el-button>

        <el-button @click="btnCaseReversal">
          大小写反转 Case Reversal
        </el-button>
      </el-button-group>
    </el-col>
  </el-row>
  <el-row style="padding-top: 10px; justify-content: center;">
    <el-col :lg="12" style="text-align: center;">
      <el-input
          id="textareaOut"
          v-model="textarea"
          :autosize="{ minRows: 15, maxRows: 30 }"
          size="large"
          type="textarea"
          placeholder="请输入文本。Please enter the text."
      ></el-input>
    </el-col>
  </el-row>
</template>

<script lang='ts' setup>
// import
import { ref } from "vue";


// Init
let sloth: any = {}; // 是否使用命名空间？
const textarea = ref<string>("");

// Function
const btnUpperCaseClick = () => {
  textarea.value = textarea.value.toUpperCase();
};

const btnLowerCaseClick = () => {
  textarea.value = textarea.value.toLowerCase();
};

const btnInitialsInCapitals = () => {
  textarea.value = textarea.value.replace(
      /\b\w+\b/g,
      (word: string) => word.substring(0, 1).toUpperCase() + word.substring(1)
  );
// textarea.value = textarea.value.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
};

const btnCaseReversal = () => {
  textarea.value = textarea.value.replace(/[a-zA-Z]/g, r => r.toUpperCase() === r ? r.toLowerCase() : r.toUpperCase());
};
</script>