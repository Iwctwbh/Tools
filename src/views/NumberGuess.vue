<template>
  <h1 class="title">
    猜数游戏 NumberGuess
  </h1>
  <el-row style="justify-content: center;">
    <el-col span="5" style="text-align: center;">
      位数 Digit
      <el-input-number
          v-model="digit"
          min="1"
          size="large"
          @change="inputDigitChange"
      ></el-input-number>
      &nbsp;
      <el-button
          size="large"
          type="primary"
          @click="btnStartClick"
      >
        开始 Start
      </el-button>
    </el-col>
  </el-row>

  <el-row style="padding-top: 10px; justify-content: center;">
    <el-col :lg="8" style="text-align: center;">
      <el-input
          id="textareaOut"
          v-model="textareaOut"
          :autosize="{ minRows: 15, maxRows: 30 }"
          readonly
          size="large"
          type="textarea"
      ></el-input>
    </el-col>
  </el-row>

  <el-row style="padding-top: 10px; justify-content: center;">
    <el-col :lg="8" style="text-align: center;">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="0"
          status-icon
          @submit.native.prevent
          @keyup.enter.native="submitForm(ruleFormRef)"
      >
        <el-form-item prop="validation">
          <el-input
              v-model="ruleForm.validation"
              placeholder="请输入答案。Please enter the answer."
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
              :disabled="!canSubmit"
              style="width: 100%;"
              type="primary"
              @click="submitForm(ruleFormRef)"
          >
            提交 Submit
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang='ts' setup>
// import
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";


// Init
let sloth: any = {}; // 是否使用命名空间？
const digit = ref<number>(4);
const textareaOut = ref<string>("猜数游戏。Guess The Number.\r\n设定位数，点击开始。Set the number, then click Start.\r\n");
const ruleFormRef = ref<FormInstance>();
const canSubmit = ref<boolean>(false);

let randNumber: number = 0;
let count: number = 0;

// Validation
let ruleForm = reactive({
  validation: ""
});
let rules = reactive<FormRules>({
  validation: [
    { required: true, message: "Please input the answer.", trigger: "blur" }
    // { min: digit.value, max: digit.value, message: `Length should be ${digit.value}`, trigger: "blur" },
  ]
});

// Function

// submit
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      textareaOut.value += `答案：${ruleForm.validation}\r\n`;
      if (ruleForm.validation.length === digit.value) {
        if (ruleForm.validation === randNumber.toString()) {
          textareaOut.value += "回答正确。\r\n";
        } else {
          let i: number = 0;
          textareaOut.value += `正确位数:${randNumber.toString().split("").filter(f => f === ruleForm.validation.split("")[i++]).length}, 正确个数:${randNumber.toString().split("").filter(f => ruleForm.validation.split("").includes(f)).length}\r\n`;
        }
      } else {
        textareaOut.value += `请输入${digit.value}位数。\r\n`;
      }
      resetForm(ruleFormRef.value);
      scrollTop();
    } else {
    }
  });
}; // submit

// reset form
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
}; // reset form

// btnStartClick
const btnStartClick = (): void => {
  count = 0;
  canSubmit.value = true;
  randNumber = Math.floor(Math.random() * (10 ** (digit.value + 1 - 1) - 10 ** (digit.value - 1))) + 10 ** (digit.value - 1);
  textareaOut.value = "游戏开始。Game Started.\r\n";
  scrollTop();
}; // btnStartClick

// scrollTop
const scrollTop = (): void => {
  let textarea = document.getElementById("textareaOut");
  if (textarea) {
    textarea.scrollTop = textarea.scrollHeight;
  }
}; // scrollTop

// inputDigitChange
const inputDigitChange = (): void => {
  canSubmit.value = false;
  resetForm(ruleFormRef.value);
}; // inputDigitChange
</script>