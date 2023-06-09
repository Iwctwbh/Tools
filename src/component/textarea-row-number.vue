<template>
  <el-row style="padding-top: 20px">
    <el-col :span="2" style="max-width: 50px;">
      <el-input
        :id="textRowNumberId"
        type="textarea"
        v-model="textRowNumber"
        readonly
        resize="none"
        :autosize="{ minRows: 15, maxRows: 15 }"
        style="width: 100%;"
        class="blackshopClass"
      />
    </el-col>
    <el-col :span="22">
      <el-input
        :id="textareaId"
        type="textarea"
        v-model="textarea"
        resize="none"
        :autosize="{ minRows: 15, maxRows: 15 }"
        style="width: 100%;"
        class="right_textarea"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
// Import
import {computed, nextTick, onMounted, ref, watch} from "vue";

// Init
const textRowNumber = ref<string>("");

let textRowNumberDom: HTMLElement | null = null;
let textareaDom: HTMLElement | null = null;

// Export
export interface iProps {
  textareaId?: string;
  textRowNumberId?: string;
  textarea?: string;
}

const props = withDefaults(defineProps<iProps>(), {
  textareaId: Math.random()
    .toString(36)
    .substring(2),
  textRowNumberId: Math.random()
    .toString(36)
    .substring(2)
});

// Bind Value
const textareaId = computed<string>(() => props.textareaId);
const textRowNumberId = computed<string>(() => props.textRowNumberId);

//const textarea = props.textarea;
const textarea = ref<string>("");

// 监听textarea的变化
watch(textarea, (): void => {
  let rowNumber: number = textarea.value.split('\n').length;
  textRowNumber.value = [...Array(rowNumber)].map((item, index) => index + 1).join('\n');
}); // 监听textarea的变化

// Mounted
onMounted(() => {
  nextTick(() => {
    textareaDom = document.getElementById(textareaId.value);
    textRowNumberDom = document.getElementById(textRowNumberId.value);
    textareaDom!.addEventListener('scroll', (e) => textRowNumberDom!.scrollTop = textareaDom!.scrollTop);
    textRowNumberDom!.addEventListener('scroll', (e) => textareaDom!.scrollTop = textRowNumberDom!.scrollTop);
  });
})

// Expose
defineExpose({textValue: textarea});
</script>

<style>
.blackshopClass .el-textarea__inner {
  overflow: hidden;
  background-color: #ececec;
  color: #000000;
}
.right_textarea .el-textarea__inner{
  white-space: nowrap;
}
</style>