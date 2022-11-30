<template>
  <h1 style="text-align: center;">过滤Log</h1>
  <el-row>
    <el-col :span="9">
      <el-input
          v-model="textareain"
          :autosize="{ minRows: 15, maxRows: 30 }"
          type="textarea"
          placeholder="Please input text"
      />
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="4">
      <el-input
          v-model="textregex"
          type="text"
          placeholder="Please input regex"
      />
      <div style="display: flex; align-items: center;">
        <el-checkbox
            v-model="checkbox1"
            label="实时"
            size="large"
        />
        <el-tooltip
            class="box-item"
            effect="dark"
            content="性能堪忧"
            placement="bottom"
        >
          <el-icon>
            <QuestionFilled/>
          </el-icon>
        </el-tooltip>
        <div style="flex: 1"></div>
        <el-button
            :disabled="checkbox1"
            :loading=IsLoading
            type="primary"
            @click="btnLogFilter()"
        >
          过滤
        </el-button>
      </div>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="9">
      <el-input
          v-model="textareaout"
          :autosize="{ minRows: 15, maxRows: 30 }"
          type="textarea"
          readonly
      />
    </el-col>
  </el-row>
</template>

<style scoped>
</style>

<script setup lang="ts">
import {ref, watch} from 'vue'

let regex_string = new RegExp('');
let array_textareain: any[] = [];

const textareain = ref('');
const textregex = ref('');
const checkbox1 = ref(false);
const IsLoading = ref(false);
const textareaout = ref('');

watch([textareain, checkbox1, textregex], () => {
  regex_string = new RegExp(textregex.value);
  if (checkbox1.value) {
    LogFilter();
  }
})

const btnLogFilter = () => {
  new Promise<void>((resolve) => {
    IsLoading.value = true;
    setTimeout(() => {
      resolve()
    }, 50);
  }).then(() => {
    LogFilter();
  })
}

const LogFilter = () => {
  if (textregex.value !== '' && textareain.value !== '') {
    textareaout.value = textareain.value
        .split('\n')
        .map(s => regex_string.test(s) ? s : null)
        //.map(s => s.includes(textregex.value) ? s : null)
        .filter(f => f != null)
        .join('\n');
  } else {
    textareaout.value = textareain.value;
  }
  IsLoading.value = false;
}
</script>