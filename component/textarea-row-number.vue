<template>
  <el-row>
    <el-col :span="1">
      <textarea
        :id="textRowNumberId"
        type="textarea"
        v-model="textRowNumber"
        readonly
        style="width: 50px; resize: none;height: 100px;"
        ref="textRowNumberDom"
      />
    </el-col>
    <el-col :span="23">
      <textarea
        :id="textareaId"
        type="textarea"
        v-model="textarea"
        style="width: 100%; resize: none;height: 100px;"
        ref="textareaDom"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
// Import
import {computed, onMounted, ref, watch} from "vue";

// Init
const textRowNumber = ref<string>("");
const textRowNumberDom = ref<HTMLElement | null>(null);
const textareaDom = ref<HTMLElement | null>(null);

// Export
export interface iProps {
  elementId?: string;
  textarea?: string;
}

const props = withDefaults(defineProps<iProps>(), {
  elementId: Math.random()
    .toString(36)
    .substring(2)
});

// Bind Value
const textareaId = computed<string>(() => props.elementId);
const textRowNumberId = computed<string>(() => props.elementId);

//const textarea = props.textarea;
const textarea = ref<string>("");

// 监听textarea的变化
watch(textarea, (): void => {
  let rowNumber: number = textarea.value.split('\n').length;
  textRowNumber.value = [...Array(rowNumber).keys()].join('\n');
}); // 监听textarea的变化

// Mounted
onMounted(() => {
  // 监听滚动事件
  textareaDom.value?.addEventListener('scroll', (e) => textRowNumberDom.value!.scrollTop = textareaDom.value!.scrollTop);
})
</script>

<style scoped>

</style>