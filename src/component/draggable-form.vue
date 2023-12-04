<template>
  <div>
    流程
    <br />
    输入
    <draggable
      :list="state"
      ghost-class="ghost"
      chosen-class="chosenClass"
      animation="300"
    >
      <template #item="{ element,index }">
        <el-space
          class="item"
          style="display: flex; align-items: center; justify-content: space-evenly;"
        >
          <el-icon
            class="add"
            @click="Add(index)"
          >
            <CirclePlus />
          </el-icon>
          <MultiModeInput
            placeholder="插件"
            v-model="element.value"
            v-check-unzip="element.value"
          />
          <el-icon class="delete" @click="RemoveAt(index)">
            <CircleClose />
          </el-icon>
        </el-space>
      </template>
    </draggable>
    输出
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import {defineAsyncComponent, reactive, ref, Ref, watch} from "vue";
import draggable from "vuedraggable";
//import MultiModeInput from "./multi-mode-input.vue";
import type {PlugElement, PlugObject} from "plug_types";

const MultiModeInput = defineAsyncComponent(async () => await import("./multi-mode-input.vue"));
const emit = defineEmits(["watch"]);
const state = reactive<PlugElement[]>(
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  [
    {plug: "", removable: false}
  ],
);

const RemoveAt = (index: number): void => {
  state.splice(index, 1);
  if (state.length === 0) {
    state.push({plug: "", removable: true});
  }
};

const Add = (index: number): void => {
  state.splice(index + 1, 0, {plug: "", removable: true});
};

// Watch
watch(state, () => {
  emit("watch", state);
});
</script>