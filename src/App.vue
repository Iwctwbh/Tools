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
      <div class="block">
        <div class="demo-range">
          <el-time-picker
              v-if="timepicker"
              v-model="timepicker"
              :disabled-hours="disabledHours"
              :disabled-minutes="disabledMinutes"
              :disabled-seconds="disabledSeconds"
              end-placeholder="End time"
              is-range
              placeholder="Arbitrary time"
              range-separator="To"
              start-placeholder="Start time"
          />
        </div>
        <el-date-picker
            v-if="datepicker"
            v-model="datepicker"
            :default-time="defaultTime1"
            :disabled="textareain == ''"
            end-placeholder="End Date"
            start-placeholder="Start Date"
            type="datetimerange"
        />
      </div>
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
            @click="LogFilterForBtn()"
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
import {ref, watch} from 'vue';
import moment from "moment";
import _ from "lodash";

// Init
let regex_string = new RegExp('');
let array_textareain: string[] = [];

const textareain = ref('');
const textregex = ref('');
const checkbox1 = ref(false);
const IsLoading = ref(false);
const textareaout = ref('');
const datepicker = ref('')
const timepicker = ref<[Date, Date]>()
const disabledHours = ref(() => {
  let array: number[] = [];
  return array;
});

let defaultTime1: [Date, Date] = [
  new Date(2000, 1, 1, 12, 0, 0),
  new Date(2000, 2, 1, 8, 0, 0),
] // '12:00:00', '08:00:00'

// Event
watch([textareain, checkbox1, textregex], () => {
  regex_string = new RegExp(textregex.value);
  MappingData();
  if (checkbox1.value) {
    LogFilter();
  }
})

// Function
const LogFilterForBtn = () => {
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
    textareaout.value = array_textareain.map(s => regex_string.test(s) ? s : null)
        //.map(s => s.includes(textregex.value) ? s : null)
        .filter(f => f != null)
        .join('\n');
  } else {
    textareaout.value = textareain.value;
  }
  IsLoading.value = false;
}

const MappingData = () => {
  array_textareain = textareain.value
      .split('\n');

  // Date
  if (array_textareain.length > 0) {
    let string_first: string = _.first(array_textareain) ?? "";
    let string_last: string = _.last(array_textareain) ?? "";
    let date_start = moment(GetTime(string_first));
    let date_end = moment(GetTime(string_last));
    timepicker.value = [
      new Date(2000, 1, 1, date_start.hour(), date_start.minute(), date_start.second()),
      new Date(2000, 1, 1, date_end.hour(), date_end.minute(), date_end.second()),
    ];
    disabledHours.value = () => {
      return makeRange(0, date_start.hour() - 1).concat(makeRange(date_end.hour() + 1, 23));
    }
  } else {

  }
}

const GetTime = (s: string) => {
  let string_array: string[] = [];
  s.split('').reduce((previousValue, currentValue, currentIndex, array) => {
    let value = previousValue + currentValue;
    string_array.push(value);
    return value;
  });
  string_array = string_array.filter(f => moment("2000-01-01 " + f).isValid());
  return "2000-01-01 " + _.last(string_array);
}

// TimePicker
const makeRange = (start: number, end: number) => {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

// let disabledHours = () => {
//   let array_number: number[] = [];
//   return array_number;
// }

const disabledMinutes = (hour: number) => {
  return [];
}

const disabledSeconds = (start: number, end: number) => {
  return [];
}
</script>

<style scoped>

</style>