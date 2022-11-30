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
        <el-button type="primary" :loading=IsLoading>
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
import {computed, ref, watch} from 'vue'

let regex_string = new RegExp('');
const string_regex_empty: String = new RegExp('').toString();

let array_textareain: any[] = [];

const textareain = ref('');
const textregex = ref('');
const checkbox1 = ref(true);
const IsLoading = ref(false);

watch(textregex, () => {
  regex_string = new RegExp(textregex.value);
})

async function arraySplit(){
  array_textareain = textareain.value
      .split('\n');
}

watch(textareain, () => {
  IsLoading.value = true;
  arraySplit();
  IsLoading.value = false;
})

const textareaout = computed({
  get() {
    if (checkbox1.value) {
      if (textregex.value !== '' && textareain.value !== '') {
        return array_textareain
            .map(s => regex_string.test(s) ? s : null)
            //.map(s => s.includes(textregex.value) ? s : null)
            .filter(f => f != null)
            .join('\n');
      } else {
        return textareain.value;
      }
    }
  },
  set(value) {
  }
})
</script>