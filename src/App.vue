<template>
  <h1 style="text-align: center;">
    过滤Log
  </h1>
  <el-row>
    <el-col :span="9">
      <el-input
          id="textareaIn"
          v-model="textareaIn"
          :autosize="{ minRows: 15, maxRows: 30 }"
          type="textarea"
          placeholder="Please input text"
      />
      <p>
        作者: <a href="https://github.com/Iwctwbh">Iwctwbh</a>
      </p>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="4">
      <div class="block">
        <div class="demo-range">
          <el-time-picker
              v-if="isOneDay"
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
            v-if="!isOneDay"
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
          v-model="textRegex"
          type="text"
          placeholder="Please input regex"
          @keyup="logFilterForRegex"
      />
      <div style="display: flex; align-items: center;">
        <el-checkbox
            v-model="checkboxRealtime"
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
            :disabled="checkboxRealtime"
            :loading=isLoading
            type="primary"
            @click="logFilterForBtn"
        >
          过滤
        </el-button>
      </div>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="9" style="display: flex; flex-direction: column;">
      <el-input
          v-if="false"
          v-model="textareaOut"
          :autosize="{ minRows: 15, maxRows: 30 }"
          type="textarea"
          readonly
      />
      <md-editor
          v-model="textareaOut"
          style="flex: 1;"
      ></md-editor>
      <div style="display: flex; float: right">
        <p v-if="ifTimeSpend">
          用时：
        </p>
        <p>
          &nbsp{{ timeSpend }}
        </p>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
</style>

<script lang='ts' setup>
import {computed, ref, watch} from "vue";
import moment from "moment";
import _ from "lodash";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

// Init
let sloth: any = {}; // 是否使用命名空间？
const textareaIn = ref<string>("");
const textRegex = ref<string>("");
const checkboxRealtime = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const textareaOut = ref<string>("");
const datepicker = ref<[Date, Date]>();
const timepicker = ref<[Date, Date]>();
const defaultTime = ref<[Date, Date]>();
const isOneDay = ref<boolean>(true);
const timeSpend = ref<string>("");

const ifTimeSpend = computed(() => {
  return timeSpend.value !== "";
});

const ARRAY_HOURS: number[] = Array(24).fill(null).map((item, index) => index);
const ARRAY_MINUTES: number[] = Array(60).fill(null).map((item, index) => index);
const ARRAY_SECONDS: number[] = Array(60).fill(null).map((item, index) => index);
const YEAR_START: string = "1969T";

let regexString = new RegExp("");
let arrayTextareaIn: string[] = [];
let arrayTextareaInFilterByTime: string[] = [];
let arrayDisabledHours: number[] = [];
let arrayDisabledHoursStart: number[] = [];
let arrayDisabledHoursEnd: number[] = [];
let arrayDisabledMinutesStart: number[] = [];
let arrayDisabledMinutesEnd: number[] = [];
let arrayDisabledSecondsStart: number[] = [];
let arrayDisabledSecondsEnd: number[] = [];
let arrayDatepicker: [Date, Date] = [new Date(), new Date()];
let dateStart: string = "";
let dateEnd: string = "";
let isChanged: boolean = false;

// Event
watch([textareaIn], () => {
  mappingData();
  isChanged = true;
  if (checkboxRealtime.value) {
    logFilterForBtn.value();
  }
});

watch([checkboxRealtime, textRegex], () => {
  regexString = new RegExp(textRegex.value);
  if (checkboxRealtime.value) {
    logFilterForBtn.value();
  }
});

watch([timepicker], () => {
  isChanged = true;
  if (checkboxRealtime.value) {
    logFilterForBtn.value();
  }
});

// Function
const logFilterForBtn = ref(() => {
  let dateTime: Date = new Date();
  new Promise<void>((resolve) => {
    isLoading.value = true;
    setTimeout(() => {
      dateTime = new Date();
      resolve();
    }, 50);
  }).then(() => {
    logFilterWithRegex();
    timeSpend.value = moment((new Date().getTime() - dateTime.getTime())).format("mm:ss:SSS");
  });
}); // 过滤

const logFilterForRegex = ref((e: any) => {
  if (e.keyCode === 13 && !checkboxRealtime.value) {
    logFilterForBtn.value();
  }
}); // 过滤

const logFilterWithTime = () => {
  if (isChanged) {
    // filter date
    let [timepickerStart, timepickerEnd] = timepicker.value ?? ["", ""];
    let [momentDateStart, momentDateEnd] = [moment(timepickerStart), moment(timepickerEnd)];
    let start = binarySearchMax(arrayTextareaIn, momentDateStart.add(-1, "seconds").toString()) + 1;
    let end = binarySearchMin(arrayTextareaIn, momentDateEnd.add(1, "seconds").toString()) - 1;
    arrayTextareaInFilterByTime = arrayTextareaIn.slice(start, end);
    isChanged = false;
  }
  return arrayTextareaInFilterByTime;
};

const logFilterWithRegex = () => {
  logFilterWithTime();
  let [timepickerStart, timepickerEnd] = timepicker.value ?? ["", ""];
  if (textareaIn.value !== ""
      && (moment(timepickerStart).isValid()
          && moment(timepickerEnd).isValid()
          || textRegex.value !== "")) {
    textareaOut.value = arrayTextareaInFilterByTime
        .map(s => regexString.test(s) ? s.replace(regexString, (value) => "<font color=#66CCFF>" + value + "</font>") : null)
        .filter(f => f !== null)
        .join("\n");
  } else {
    textareaOut.value = textareaIn.value;
  }
  isLoading.value = false;
}; // 过滤

// 二分查找arrayTextareaIn中不大于x的最大值
const binarySearchMax = (array: string[], x: string) => {
  let [left, right] = [0, array.length - 1];
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (compareOnlyTime(moment(getTime(array[mid])), moment(x)) <= 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return right;
};

// 二分查找arrayTextareaIn中不小x的最小值
const binarySearchMin = (array: string[], x: string) => {
  let [left, right] = [0, array.length - 1];
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (compareOnlyTime(moment(getTime(array[mid])), moment(x)) >= 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

const mappingData = () => {
  arrayTextareaIn = textareaIn.value
      .split("\n").filter(f => f !== "");

  // Date
  if (arrayTextareaIn.length > 0) {
    let string_first: string = _.first(arrayTextareaIn) ?? "";
    let string_last: string = _.last(arrayTextareaIn) ?? "";
    dateStart = getTime(string_first);
    dateEnd = getTime(string_last);
    let moment_date_start = moment(getTime(string_first));
    let moment_date_end = moment(getTime(string_last));
    moment_date_start.isSame(moment_date_end, "date") ? isOneDay.value = true : isOneDay.value = false;
    arrayDisabledHoursStart = makeRange(0, moment_date_start.hour() - 1);
    arrayDisabledHoursEnd = makeRange(moment_date_end.hour() + 1, 23);
    arrayDisabledHours = arrayDisabledHoursStart.concat(arrayDisabledHoursEnd);
    arrayDisabledMinutesStart = makeRange(0, moment_date_start.minute() - 1);
    arrayDisabledMinutesEnd = makeRange(moment_date_end.minute() + 1, 59);
    arrayDisabledSecondsStart = makeRange(0, moment_date_start.second() - 1);
    arrayDisabledSecondsEnd = makeRange(moment_date_end.second() + 1, 59);

    timepicker.value = [
      new Date(2000, 1, 1, moment_date_start.hour(), moment_date_start.minute(), moment_date_start.second()),
      new Date(2000, 1, 2, moment_date_end.hour(), moment_date_end.minute(), moment_date_end.second())
    ];

    // 无效 等修复 ?? 突然又好了
    defaultTime.value = [
      new Date(2000, 1, 1, moment_date_start.hour(), moment_date_start.minute(), moment_date_start.second()),
      new Date(2000, 2, 2, moment_date_end.hour(), moment_date_end.minute(), moment_date_end.second())
    ];

    datepicker.value = [
      new Date(moment_date_start.year(), moment_date_start.month(), moment_date_start.date(), moment_date_start.hour(), moment_date_start.minute(), moment_date_start.second()),
      new Date(moment_date_end.year(), moment_date_end.month(), moment_date_end.date(), moment_date_end.hour(), moment_date_end.minute(), moment_date_end.second())
    ];
    arrayDatepicker = datepicker.value;
  } else {

  }
}; // 映射数据

const getTime = (s: string) => {
  let stringMoment: string = "";
  let stringMomentOnlyTime: string = "";
  s.split("")
      .forEach((v, i) => {
        s.split("")
            .splice(i)
            .reduce((previousValue, currentValue, currentIndex, array) => {
              let value = previousValue + currentValue;
              if (value.length > 25) {
                array.splice(1);
              } else {
                if (moment(value).isValid() && value.length > stringMoment.length) {
                  stringMoment = value;
                }
                if (moment(YEAR_START.concat(value)).isValid() && value.length > stringMomentOnlyTime.length) {
                  stringMomentOnlyTime = value;
                }
              }
              return value;
            });
      });
  return stringMoment.length >= stringMomentOnlyTime.length
      ? stringMoment
      : YEAR_START.concat(stringMomentOnlyTime);
}; // 获取时间

// TimePicker
const calendarChange = ref((array: [Date, Date]) => {
  arrayDatepicker = array;
}); // 日期选择器

const disabledDates = ref((date: Date) => {
  return moment(date).isBefore(_.first(datepicker.value), "date")
      || moment(date).isAfter(_.last(datepicker.value), "date");
}); // 日期不可选

const disabledHours = ref((pos_datepicker: string) => {
  const momentDateStart = moment(dateStart).startOf("date");
  const momentDateEnd = moment(dateEnd).startOf("date");
  if (pos_datepicker === "start") {
    let momentDateStartCurrent = moment(_.first(arrayDatepicker)).startOf("date");
    let arrayStartDisabledHours: number[] = [];
    if (momentDateStartCurrent.isSame(momentDateStart)) {
      arrayStartDisabledHours = arrayStartDisabledHours.concat(arrayDisabledHoursStart);
    }
    if (momentDateStartCurrent.isSame(momentDateEnd)) {
      arrayStartDisabledHours = arrayStartDisabledHours.concat(arrayDisabledHoursEnd);
    }
    return arrayStartDisabledHours;
  } else {
    let momentDateEndCurrent = moment(_.last(arrayDatepicker)).startOf("date");
    let arrayEndDisabledHours: number[] = [];
    if (momentDateEndCurrent.isSame(momentDateStart)) {
      arrayEndDisabledHours = arrayEndDisabledHours.concat(arrayDisabledHoursStart);
    }
    if (momentDateEndCurrent.isSame(momentDateEnd)) {
      arrayEndDisabledHours = arrayEndDisabledHours.concat(arrayDisabledHoursEnd);
    }
    return arrayEndDisabledHours;
  }
}); // end disabledHours

const disabledMinutes = ref((hour: number) => {
  let arrayDisabledMinutes: number[] = [];
  if (_.first(_.difference(ARRAY_HOURS, arrayDisabledHours)) === hour
      && moment(_.first(arrayDatepicker))
          .startOf("date")
          .isSame(moment(dateStart).startOf("date"))) {
    arrayDisabledMinutes = arrayDisabledMinutes.concat(arrayDisabledMinutesStart);
  }
  if (_.last(_.difference(ARRAY_HOURS, arrayDisabledHours)) === hour
      && moment(_.last(arrayDatepicker))
          .startOf("date")
          .isSame(moment(dateEnd).startOf("date"))) {
    arrayDisabledMinutes = arrayDisabledMinutes.concat(arrayDisabledMinutesEnd);
  }
  return arrayDisabledMinutes;
}); // end disabledMinutes

const disabledSeconds = ref((hour: number, minute: number) => {
  let arrayDisabledSeconds: number[] = [];
  if (_.first(_.difference(ARRAY_HOURS, arrayDisabledHours)) === hour
      && _.first(_.difference(ARRAY_MINUTES, arrayDisabledMinutesStart)) === minute
      && moment(_.first(arrayDatepicker))
          .startOf("date")
          .isSame(moment(dateStart).startOf("date"))) {
    arrayDisabledSeconds = arrayDisabledSeconds.concat(arrayDisabledSecondsStart);
  }
  if (_.last(_.difference(ARRAY_HOURS, arrayDisabledHours)) === hour
      && _.last(_.difference(ARRAY_SECONDS, arrayDisabledMinutesEnd)) === minute
      && moment(_.last(arrayDatepicker))
          .startOf("date")
          .isSame(moment(dateEnd).startOf("date"))) {
    arrayDisabledSeconds = arrayDisabledSeconds.concat(arrayDisabledSecondsEnd);
  }
  return arrayDisabledSeconds;
}); // end disabledSeconds

const makeRange = (start: number, end: number) => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}; // end makeRange

const compareOnlyTime = (time1: any, time2: any) => {
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