<template>
  <el-input
    v-model="input"
    :placeholder="placeholder"
  >
    <template #suffix>
      <el-popover
        placement="right-start"
        :width="400"
        trigger="click"
        :visible="visible"
        popper-style="text-align: center;"
      >
        <template #reference>
          <el-icon class="el-input__icon click" @click="Show()">
            <setting />
          </el-icon>
        </template>
        <draggable-form v-if="isShow"></draggable-form>
        <div style="text-align: right; margin: 0">
          <el-button size="small" text @click="visible = false">cancel</el-button>
          <el-button
            size="small"
            type="primary"
            @click="visible = false"
          >
            confirm
          </el-button>
        </div>
      </el-popover>
    </template>
  </el-input>
</template>

<style scoped>
.click {
  cursor: pointer;
}
</style>

<script setup lang="ts">
import {ref, defineAsyncComponent} from "vue";
import {Setting} from "@element-plus/icons-vue";
// import DraggableForm from "./draggable-form.vue";
const DraggableForm = defineAsyncComponent(async () => await import("./draggable-form.vue"));

const input = ref<string>("");
const placeholder = ref<string>("");
const isShow = ref<boolean>(false);
const visible = ref<boolean>(false);

// Function
const Show = (): void => {
  isShow.value = true;
  visible.value = true;
};

// Expose
defineExpose({textValue: input});
</script>