<template>
  <div class="itxst">
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
            placeholder="替换前的字符"
            v-model="element.find"
          />
          <el-icon>
            <Right />
          </el-icon>
          <MultiModeInput
            placeholder="替换后的字符"
            v-model:input = "element.replace"
          />
          <el-checkbox
            v-model="element.regex"
            border
            class="regex"
            title="正则表达式"
          >
            <strong style="font-size: 20px;">
              .*
            </strong>
          </el-checkbox>
          <el-icon class="delete" @click="RemoveAt(index)">
            <CircleClose />
          </el-icon>
        </el-space>
      </template>
    </draggable>
  </div>
</template>

<script lang='ts' setup>
import {reactive, UnwrapRef, watch} from "vue";
import draggable from "vuedraggable"; // https://github.com/SortableJS/vue.draggable.next
import type {ReplaceElement} from "replace_types";
import MultiModeInput from "./multi-mode-input.vue";

const emit = defineEmits(["watch"]);
const state = reactive<ReplaceElement[]>(
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  [
    {find: "", replace: "", regex: false}
  ],
);

// Watch
watch(state, () => {
  emit("watch", state);
});

// Function
const RemoveAt = (index: number): void => {
  state.splice(index, 1);
  if (state.length === 0) {
    state.push({find: "", replace: "", regex: false});
  }
};

const Add = (index: number): void => {
  state.splice(index + 1, 0, {find: "", replace: "", regex: false});
};

const Calculate = (argValue: UnwrapRef<string>): string => {
  return argValue.split("\n").map(m =>
    state.map((item: ReplaceElement) =>
      item.regex ? m.replaceAll(new RegExp(item.find, "g"), m.match(new RegExp(item.replace, "g"))?.join("") || "") : m.replaceAll(item.find, item.replace)
    )[state.length - 1]
  ).join("\n");
};

const GetState = (): ReplaceElement[] => {
  return state;
};

const SetState = (argState: ReplaceElement[]): void => {
  state.splice(0, state.length);
  argState.forEach((item: ReplaceElement) => {
    state.push(item);
  });
};

// Expose
defineExpose({Calculate: Calculate, GetState: GetState, SetState: SetState, RemoveAt: RemoveAt, Add: Add});
</script>

<style scoped>
.itxst {
  display: flex;
}

.itxst > div:nth-of-type(1) {
  flex: 1;
}

.itxst > div:nth-of-type(2) {
  padding-left: 20px;
}

.item {
  border: solid 1px #eee;
  padding: 6px 10px;
  text-align: left;
}

.delete:hover {
  cursor: pointer;
}

.add:hover {
  cursor: pointer;
}

.item:hover {
  cursor: move;
}

.item + .item {
  margin-top: 10px;
}

.ghost {
  border: solid 1px rgb(19, 41, 239);
}

.chosenClass {
  background-color: #f1f1f1;
}

.regex :deep(.el-checkbox__input) {
  display: none;
}
</style>