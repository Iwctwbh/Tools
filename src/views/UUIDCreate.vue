<template>
  <h1 class="title">
    UUID生成 UUIDCreate
  </h1>

  <el-row style="justify-content: center;">
    <el-col span="5" style="text-align: center;">
      数量 Count
      <el-input-number
          v-model="CountNumber"
          max="999"
          min="1"
          size="large"
      ></el-input-number>
      &nbsp;
      <el-button
          size="large"
          type="primary"
          @click="btnUUIDCreate"
      >
        UUID生成 UUIDCreate
      </el-button>
    </el-col>
  </el-row>

  <el-row style="justify-content: center;">
    <el-col span="5" style="text-align: center;">
      数量 Count
      <el-input-number
          v-model="CountNumber"
          max="999"
          min="1"
          size="large"
      ></el-input-number>
      &nbsp;
      位数 Digit
      <el-input-number
          v-model="DigitCountNumber"
          min="1"
          size="large"
      ></el-input-number>
      &nbsp;
      <div id="divCase">
        <el-checkbox
            id="isCaseUpper"
            v-model="isCaseUpper"
            border
            class=""
            title="全大写"
        >
          <strong style="font-size: 20px;">
            A
          </strong>
        </el-checkbox>

        <el-checkbox
            id="isCaseInsensitive"
            v-model="isCaseInsensitive"
            border
            class="center"
            title="不区分大小写"
        >
          <strong style="font-size: 20px;">
            Aa
          </strong>
        </el-checkbox>

        <el-checkbox
            id="isCaseLower"
            v-model="isCaseLower"
            border
            class=""
            title="全小写"
        >
          <strong style="font-size: 20px;">
            a
          </strong>
        </el-checkbox>
      </div>
      &nbsp;
      <el-checkbox
          id="hasNumber"
          v-model="isHasNumebr"
          border
          class=""
          title="是否含有数字"
      >
        <strong style="font-size: 20px;">
          0-9
        </strong>
      </el-checkbox>
      &nbsp;
      <el-checkbox
          id="has"
          v-model="isHasSpecialSymbols"
          border
          class=""
          title="是否含有特殊符号"
      >
        <strong style="font-size: 20px;">
          !@#
        </strong>
      </el-checkbox>
      &nbsp;
      <el-button
          size="large"
          type="primary"
          @click="btnRandomCreate"
      >
        随机数生成 RandomNumberCreate
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
</template>

<style>
#app .el-checkbox__inner {
  display: none;
}

#app #divCase {
  padding: 0 10px;
}

#app #divCase .el-checkbox {
  margin: 0;
}

#app #divCase .el-checkbox.center {
  border-left: 0px;
  border-right: 0px;
}

#app #divCase :first-child {
  border-right: 0px;
}

#app #divCase :last-child {
  border-left: 0px;
}

#app #divCase .el-checkbox__label {
  padding: 0;
}
</style>

<script lang="ts" setup>
// Import
import { ref, watch } from "vue";

// Init
let sloth: any = {}; // 是否使用命名空间？

const textareaOut = ref<string>("");
const CountNumber = ref<number>(1);
const DigitCountNumber = ref<number>(1);
const isCaseUpper = ref<boolean>(false);
const isCaseInsensitive = ref<boolean>(false);
const isCaseLower = ref<boolean>(false);
const isHasNumebr = ref<boolean>(false);
const isHasSpecialSymbols = ref<boolean>(false);

const arrayNumber: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const arraySpecialSymbols: string[] = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", ";", ":", "'", "\"", ",", "<", ".", ">", "/", "?", "~", "`", "|"];
const arrayLower: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const arrayUpper: string[] = arrayLower.map((item: string) => item.toUpperCase());

// Event
const btnUUIDCreate = () => {
  let uuidArray: string[] = [];
  for (let i = 0; i < CountNumber.value; ++i) {
    uuidArray.push(uuid());
  }
  textareaOut.value = uuidArray.join("\n");
};

const btnRandomCreate = () => {
  let randomArray: string[] = [];
  for (let i = 0; i < CountNumber.value; ++i) {
    // randomArray.push(_.random(DigitCountNumber.value));
  }
  textareaOut.value = randomArray.join("\n");
};

// 监听isCaseUpper
watch([isCaseUpper], (): void => {
  if (isCaseUpper.value) {
    isCaseInsensitive.value = false;
    isCaseLower.value = false;
  }
}); // 监听isCaseUpper

// 监听isCaseInsensitive
watch([isCaseInsensitive], (): void => {
  if (isCaseInsensitive.value) {
    isCaseUpper.value = false;
    isCaseLower.value = false;
  }
}); // 监听isCaseInsensitive

// 监听isCaseLower
watch([isCaseLower], (): void => {
  if (isCaseLower.value) {
    isCaseUpper.value = false;
    isCaseInsensitive.value = false;
  }
}); // 监听isCaseLower

// Function

// UUIDCreate
function uuid() {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substring(uuid.lastIndexOf("/") + 1);
} // UUIDCreate
</script>
