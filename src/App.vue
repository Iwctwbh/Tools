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
              v-if="IsOneDay"
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
            v-if="!IsOneDay"
            v-model="datepicker"
            :default-time="defaultTime"
            :disabled-date="disabledDates"
            :disabled-hours="disabledHours"
            :disabled-minutes="disabledMinutes"
            :disabled-seconds="disabledSeconds"
            end-placeholder="End Date"
            start-placeholder="Start Date"
            type="datetimerange"
            @calendar-change="calendarChange"
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
const textareain = ref('');
const textregex = ref('');
const checkbox1 = ref(false);
const IsLoading = ref(false);
const textareaout = ref('');
const datepicker = ref<[Date, Date]>();
const timepicker = ref<[Date, Date]>();
const defaultTime = ref<[Date, Date]>();
const IsOneDay = ref<boolean>(true);

const kArrayHours: number[] = Array(24).fill(null).map((item, index) => index);
const kArrayMinutes: number[] = Array(60).fill(null).map((item, index) => index);
const kArraySeconds: number[] = Array(60).fill(null).map((item, index) => index);
const kYearStart: string = "1969T";

let regex_string = new RegExp('');
let array_textareain: string[] = [];
let array_disabledHours: number[] = [];
let array_disabledHours_start: number[] = [];
let array_disabledHours_end: number[] = [];
let array_disabledMinutes_start: number[] = [];
let array_disabledMinutes_end: number[] = [];
let array_disabledSeconds_start: number[] = [];
let array_disabledSeconds_end: number[] = [];
let array_datepicker: [Date, Date] = [new Date(), new Date()];
let date_start: string = "";
let date_end: string = "";

// Event
watch([textareain, checkbox1, textregex], () => {
  regex_string = new RegExp(textregex.value);
  MappingData();
  if (checkbox1.value) {
    LogFilter();
  }
});

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
};

const LogFilter = () => {
  let [string_start, string_end] = timepicker.value ?? [null, null];
  if (textareain.value !== '' && ((moment(string_start).isValid() && moment(string_end).isValid()) || textregex.value !== '')) {
    // filter date
    let [moment_date_start, moment_date_end] = [moment(string_start), moment(string_end)];
    textareaout.value = array_textareain.filter(f => CompareOnlyTime(moment(GetTime(f)), moment_date_start) >= 0
        && CompareOnlyTime(moment(GetTime(f)), moment_date_end) <= 0)
        .map(s => regex_string.test(s) ? s : null)
        //.map(s => s.includes(textregex.value) ? s : null)
        .filter(f => f !== null)
        .join('\n');
  } else {
    textareaout.value = textareain.value;
  }
  IsLoading.value = false;
};

const MappingData = () => {
  array_textareain = textareain.value
      .split('\n').filter(f => f !== "");

  // Date
  if (array_textareain.length > 0) {
    let string_first: string = _.first(array_textareain) ?? "";
    let string_last: string = _.last(array_textareain) ?? "";
    date_start = GetTime(string_first);
    date_end = GetTime(string_last);
    let moment_date_start = moment(GetTime(string_first));
    let moment_date_end = moment(GetTime(string_last));
    moment_date_start.isSame(moment_date_end, "date") ? IsOneDay.value = true : IsOneDay.value = false;
    array_disabledHours_start = makeRange(0, moment_date_start.hour() - 1);
    array_disabledHours_end = makeRange(moment_date_end.hour() + 1, 23);
    array_disabledHours = array_disabledHours_start.concat(array_disabledHours_end);
    array_disabledMinutes_start = makeRange(0, moment_date_start.minute() - 1);
    array_disabledMinutes_end = makeRange(moment_date_end.minute() + 1, 59);
    array_disabledSeconds_start = makeRange(0, moment_date_start.second() - 1);
    array_disabledSeconds_end = makeRange(moment_date_end.second() + 1, 59);

    timepicker.value = [
      new Date(2000, 1, 1, moment_date_start.hour(), moment_date_start.minute(), moment_date_start.second()),
      new Date(2000, 1, 2, moment_date_end.hour(), moment_date_end.minute(), moment_date_end.second())
    ]

    // 无效 等修复 ?? 突然又好了
    defaultTime.value = [
      new Date(2000, 1, 1, moment_date_start.hour(), moment_date_start.minute(), moment_date_start.second()),
      new Date(2000, 2, 2, moment_date_end.hour(), moment_date_end.minute(), moment_date_end.second())
    ];

    datepicker.value = [
      new Date(moment_date_start.year(), moment_date_start.month(), moment_date_start.date(), moment_date_start.hour(), moment_date_start.minute(), moment_date_start.second()),
      new Date(moment_date_end.year(), moment_date_end.month(), moment_date_end.date(), moment_date_end.hour(), moment_date_end.minute(), moment_date_end.second())
    ];
    array_datepicker = datepicker.value;
  } else {

  }
};

const GetTime = (s: string) => {
  let string_moment: string = "";
  let string_moment_only_time: string = "";
  s.split('')
      .forEach((v, i) => {
        s.split('')
            .splice(i)
            .reduce((previousValue, currentValue, currentIndex, array) => {
              let value = previousValue + currentValue;
              if (value.length > 25) {
                array.splice(1);
              } else {
                if (moment(value).isValid() && value.length > string_moment.length) {
                  string_moment = value;
                }
                if (moment(kYearStart.concat(value)).isValid() && value.length > string_moment_only_time.length) {
                  string_moment_only_time = value;
                }
              }
              return value;
            });
      });
  return string_moment.length >= string_moment_only_time.length
      ? string_moment
      : kYearStart.concat(string_moment_only_time);
};

// TimePicker
const calendarChange = (array: [Date, Date]) => {
  array_datepicker = array;
};

const makeRange = (start: number, end: number) => {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
};

const disabledDates = ref((date: Date) => {
  return moment(date).isBefore(_.first(datepicker.value), "date")
      || moment(date).isAfter(_.last(datepicker.value), "date");
});

const disabledHours = ref((pos_datepicker: string) => {
  const moment_date_start = moment(date_start).startOf("date");
  const moment_date_end = moment(date_end).startOf("date");
  if (pos_datepicker === "start") {
    let moment_date_start_current = moment(_.first(array_datepicker)).startOf("date");
    let array_start_disabledHours: number[] = [];
    if (moment_date_start_current.isSame(moment_date_start)) {
      array_start_disabledHours = array_start_disabledHours.concat(array_disabledHours_start);
    }
    if (moment_date_start_current.isSame(moment_date_end)) {
      array_start_disabledHours = array_start_disabledHours.concat(array_disabledHours_end);
    }
    return array_start_disabledHours;
  } else {
    let moment_date_end_current = moment(_.last(array_datepicker)).startOf("date");
    let array_end_disabledHours: number[] = [];
    if (moment_date_end_current.isSame(moment_date_start)) {
      array_end_disabledHours = array_end_disabledHours.concat(array_disabledHours_start);
    }
    if (moment_date_end_current.isSame(moment_date_end)) {
      array_end_disabledHours = array_end_disabledHours.concat(array_disabledHours_end);
    }
    return array_end_disabledHours;
  }
}); // end disabledHours

const disabledMinutes = ref((hour: number) => {
  let array_disabledMinutes: number[] = [];
  if (_.first(_.difference(kArrayHours, array_disabledHours)) === hour
      && moment(_.first(array_datepicker))
          .startOf("date")
          .isSame(moment(date_start).startOf("date"))) {
    array_disabledMinutes = array_disabledMinutes.concat(array_disabledMinutes_start);
  }
  if (_.last(_.difference(kArrayHours, array_disabledHours)) === hour
      && moment(_.last(array_datepicker))
          .startOf("date")
          .isSame(moment(date_end).startOf("date"))) {
    array_disabledMinutes = array_disabledMinutes.concat(array_disabledMinutes_end);
  }
  return array_disabledMinutes;
}); // end disabledMinutes

const disabledSeconds = ref((hour: number, minute: number) => {
  let array_disabledSeconds: number[] = [];
  if (_.first(_.difference(kArrayHours, array_disabledHours)) === hour
      && _.first(_.difference(kArrayMinutes, array_disabledMinutes_start)) === minute
      && moment(_.first(array_datepicker))
          .startOf("date")
          .isSame(moment(date_start).startOf("date"))) {
    array_disabledSeconds = array_disabledSeconds.concat(array_disabledSeconds_start);
  }
  if (_.last(_.difference(kArrayHours, array_disabledHours)) === hour
      && _.last(_.difference(kArraySeconds, array_disabledMinutes_end)) === minute
      && moment(_.last(array_datepicker))
          .startOf("date")
          .isSame(moment(date_end).startOf("date"))) {
    array_disabledSeconds = array_disabledSeconds.concat(array_disabledSeconds_end);
  }
  return array_disabledSeconds;
}); // end disabledSeconds

const CompareOnlyTime = (time1: any, time2: any) => {
  if (time1.hour() > time2.hour()) {
    return 1;
  } else if (time1.hour() < time2.hour()) {
    return -1;
  } else if (time1.minute() > time2.minute()) {
    return 1;
  } else if (time1.minute() < time2.minute()) {
    return -1;
  } else if (time1.second() > time2.second()) {
    return 1;
  } else if (time1.second() < time2.second()) {
    return -1;
  } else {
    return 0;
  }
}; // end CompareOnlyTime
</script>

<style scoped>

</style>