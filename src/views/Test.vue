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
            @click="add(index)"
          >
            <CirclePlus />
          </el-icon>
          <el-input
            placeholder="替换前的字符"
            v-model="element.find"
          />
          <el-icon>
            <Right />
          </el-icon>
          <el-input
            placeholder="替换后的字符"
            v-model="element.replace"
          />
          <el-icon class="delete" @click="removeAt(index)">
            <CircleClose />
          </el-icon>
        </el-space>
      </template>
    </draggable>
  </div>
</template>

<script lang='ts' setup>
import {reactive} from "vue";
import draggable from "vuedraggable";

type replace = { find: string, replace: string };

const state = reactive<replace[]>(
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  [
    {find: "", replace: ""}
  ],
);

// Function
const removeAt = (index: number): void => {
  state.splice(index, 1);
};

const add = (index: number): void => {
  state.splice(index + 1, 0, {find: "", replace: ""});
};

</script>

<style scoped>
.itxst {
  width: 600px;
  display: flex;
}

.itxst > div:nth-of-type(1) {
  flex: 1;
}

.itxst > div:nth-of-type(2) {
  width: 270px;
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
</style>