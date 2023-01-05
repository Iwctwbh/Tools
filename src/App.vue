<template>
  <h1 style="text-align: center;">
    过滤Log
  </h1>
  <el-row>
    <el-col :lg="9">
      <el-checkbox
          v-model="isAutoBreakLineForTextareaIn"
          border
          class="tools"
          style="margin-bottom: 8px;"
          title="自动换行"
      >
        <strong style="font-size: 20px;">
          自动换行
        </strong>
      </el-checkbox>
      <!--      <el-upload-->
      <!--          action="none"-->
      <!--          :file-list="fileList"-->
      <!--          :auto-upload="false"-->
      <!--          :before-upload="beforeUpload"-->
      <!--          :on-change="setUploadData"-->
      <!--          multiple-->
      <!--          accept=".txt"-->
      <!--      >-->
      <!--        <el-button size="small" type="primary">点击上传</el-button>-->
      <!--        <div slot="tip" class="el-upload__tip">只能上传txt文件</div>-->
      <!--      </el-upload>-->
      <div style="position: relative">
        <el-upload
            id="upload"
            :auto-upload="false"
            :class="isPointerEventsNone ? 'pointer-events-none' : ''"
            :file-list="fileList"
            :on-change="uploadChange"
            accept=".txt, .log"
            action="none"
            drag
            multiple
            style="position: absolute; opacity: 0.3; z-index: 1; height: 100%; width: 100%;"
            @mouseenter="uploadMouseEnter"
        >
          <el-icon class="el-icon--upload">
            <upload-filled/>
          </el-icon>
          <div class="el-upload__text">
            Drop file here(.txt, .log)
          </div>
        </el-upload>

        <el-input
            id="textareaIn"
            v-model="textareaIn"
            :autosize="{ minRows: 15, maxRows: 30 }"
            :class="!isAutoBreakLineForTextareaIn ? 'noWrap' : ''"
            placeholder="Please input text"
            type="textarea"
            @mouseleave="textareaMouseLeave"
        />
      </div>
      <p>
        作者: <a href="https://github.com/Iwctwbh" target="_blank">Iwctwbh</a>
      </p>
      <p>
        本项目开源:
        <a href="https://github.com/Iwctwbh/LogFilter" target="_blank">
          https://github.com/Iwctwbh/LogFilter
        </a>
      </p>
    </el-col>
    <el-col :lg="5" class="paddingTop40px" style="margin: 0 auto;">
      <div style="padding-bottom: 10px; width: 100%; display: inline-flex;">
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
          placeholder="Please input regex"
          style="padding-bottom: 10px;"
          type="text"
          @keyup="logFilterForRegex"
      />
      <div style="display: flex; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; width: 200px;">
          <el-checkbox
              v-model="isCaseMatch"
              border
              class="tools"
              title="区分大小写"
          >
            <strong style="font-size: 16px">
              Aa
            </strong>
          </el-checkbox>
          <el-checkbox
              v-model="isRegexMatch"
              border
              class="tools"
              title="正则表达式"
          >
            <strong style="font-size: 20px;">
              .*
            </strong>
          </el-checkbox>

          <el-checkbox
              v-model="isRealtime"
              border
              class="tools"
              style="margin-right: 0"
              title="实时过滤"
          >
            <strong>
              实时
            </strong>
            <el-tooltip
                class="box-item"
                content="性能堪忧"
                effect="dark"
                placement="bottom"
            >
              <el-icon>
                <QuestionFilled/>
              </el-icon>
            </el-tooltip>
          </el-checkbox>
        </div>
        <div style="flex: 1;"></div>

        <el-button
            :disabled="isRealtime"
            :loading="isLoading"
            type="primary"
            @click="logFilterForBtn"
        >
          过滤
        </el-button>
      </div>
    </el-col>
    <el-col :lg="9" style="display: flex; align-items: center; flex-direction: column;">
      <el-row style="align-items: center; width: 100%;">
        <el-col :xl="12">
          <el-radio-group
              v-model="reader"
              class="ml-4"
              style="padding-right: 10px; flex-wrap: nowrap;"
              @change="changeReader"
          >
            <el-radio label="Table" size="large">Table</el-radio>
            <el-radio label="Textarea" size="large">Textarea</el-radio>
            <el-radio label="Markdown" size="large">Markdown</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :xl="12">
          <div v-if="reader !== 'Textarea'" style="white-space: nowrap;">
            <span class="demonstration">高亮字体颜色</span>
            <el-color-picker v-model="colorPickerFont"/>
            &nbsp;
            <span class="demonstration">高亮字体背景颜色</span>
            <el-color-picker v-model="colorPickerFontBackground"/>
          </div>
          <el-checkbox
              v-if="reader === 'Textarea'"
              v-model="isAutoBreakLineForTextareaOut"
              border
              class="tools"
              title="自动换行"
          >
            <strong style="font-size: 20px;">
              自动换行
            </strong>
          </el-checkbox>
        </el-col>
      </el-row>
      <el-table
          id="tableOut"
          v-if="reader === 'Table'"
          :data="tableData"
          :show-header="false"
          style="max-height: 625px;"
      >
        <el-table-column
            v-slot="scope"
            label="Data"
            prop="data"
        >
          <div v-html="scope.row.data"></div>
        </el-table-column>
      </el-table>
      <el-input
          id="textareaOut"
          v-if="reader === 'Textarea'"
          v-model="textareaOut"
          :autosize="{ minRows: 15 }"
          readonly
          type="textarea"
          style="flex: 1;"
          :class="!isAutoBreakLineForTextareaOut ? 'noWrap' : ''"
      />
      <md-editor
          v-if="reader === 'Markdown'"
          v-model="textareaOut"
          style="flex: 1;"
      ></md-editor>
      <p v-if="ifTimeSpend" style="width: 100%;">
        用时：{{ timeSpend }}
      </p>
      <p style="margin-top: 0;">&nbsp;</p>
    </el-col>
  </el-row>
</template>

<style>
@import "md-editor-v3/lib/style.css";

#app {
  max-width: 90%;
  margin: 0 auto;
}

#app .el-date-editor.el-input, #app .el-date-editor.el-input__wrapper {
  width: auto;
}

#app .md-editor-toolbar-wrapper, #app .md-editor-footer, #app .md-editor-input-wrapper {
  display: none;
}

#app #textareaIn {
  max-height: 625px;
}

#app #md-editor-v3 {
  max-height: 625px;
}

#app #md-editor-v3-preview {
  padding: 5px 11px;
}

#app .tools {
  margin: 0px;
}

#app .tools .el-checkbox__inner {
  display: none;
}

#app .highlight {
  color: v-bind(colorPickerFont);
  background-color: v-bind(colorPickerFontBackground);
}

#app #textareaOut {
  height: 100% !important;
}

#app .noWrap textarea {
  white-space: pre;
}

#app #upload .el-upload.el-upload--text.is-drag {
  height: 100%;
}

#app #upload .el-upload-dragger {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

#app #upload.pointer-events-none {
  pointer-events: none;
}

#app #tableOut table tbody tr td .cell {
  white-space: pre-line;
}

@media only screen and (min-width: 1200px) {
  #app .paddingTop40px {
    padding-top: 40px;
  }
}
</style>

<script lang='ts' setup>
import {computed, ref, watch} from "vue";
import moment from "moment";
import _ from "lodash";
import MdEditor from "md-editor-v3";

// Init
let sloth: any = {}; // 是否使用命名空间？
const textareaIn = ref<string>("");
const textRegex = ref<string>("");
const isRealtime = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const textareaOut = ref<string>("");
const datepicker = ref<[Date, Date]>();
const timepicker = ref<[Date, Date]>();
const defaultTime = ref<[Date, Date]>();
const isOneDay = ref<boolean>(true);
const timeSpend = ref<string>("");
const colorPickerFont = ref<string>("#66CCFF");
const colorPickerFontBackground = ref<string>("#FFFFFF");
const reader = ref<string>("Table");
const tableData = ref<any[]>([]);
const isCaseMatch = ref<boolean>(false);
const isRegexMatch = ref<boolean>(false);
const isAutoBreakLineForTextareaIn = ref<boolean>(true);
const isAutoBreakLineForTextareaOut = ref<boolean>(true);
const isPointerEventsNone = ref<boolean>(false);
const fileList = ref<any[]>([]);

const ifTimeSpend = computed<boolean>(() => {
  return timeSpend.value !== "";
});

const ARRAY_HOURS: number[] = Array(24).fill(null).map((item, index) => index);
const ARRAY_MINUTES: number[] = Array(60).fill(null).map((item, index) => index);
const ARRAY_SECONDS: number[] = Array(60).fill(null).map((item, index) => index);
const YEAR_START: string = "1969 ";
const REGEX_TIME: RegExp = new RegExp(/(((\d{4}[\/\-]?\d{1,2}[\/\-]?\d{1,2})|(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})|(\d{4}))[T ])?\d{1,2}\:\d{1,2}:\d{1,2}(\.\d{1,3})?( ?[AP]M)?/i);

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
let isTextareaInOrTimeChange: boolean = false;
let isRegexChange: boolean = true;
let isOnlyTime: boolean = false;
let recognitionTimeStart: number = 0;
let recognitionTimeEnd: number = 0;
let oldReader: string = "Table";
let readerChange: boolean = false;
let isUploadChange: boolean = false;

// Event

// 监听输入框
watch([textareaIn], (): void => {
  mappingData();
  isTextareaInOrTimeChange = true;
  arrayTextareaInFilterByTime = [];
  if (isRealtime.value) {
    logFilterForBtn.value();
  }
}); // 监听输入框

// 监听选项
watch([isRealtime, textRegex, isCaseMatch, isRegexMatch], (): void => {
  let tempText = textRegex.value;
  if (!isRegexMatch.value) {
    tempText = tempText.replace("\\", "\\\\") // 转义
        .replace(".", "\\.")
        .replace("*", "\\*")
        .replace("+", "\\+")
        .replace("?", "\\?")
        .replace("$", "\\$")
        .replace("^", "\\^")
        .replace("[", "\\[")
        .replace("]", "\\]")
        .replace("(", "\\(")
        .replace(")", "\\)")
        .replace("{", "\\{")
        .replace("}", "\\}")
        .replace("|", "\\|");
  }
  regexString = new RegExp(tempText, isCaseMatch.value ? "" : "i");
  isRegexChange = true;
  if (isRealtime.value) {
    logFilterForBtn.value();
  }
}); // 监听选项

// 监听timepicker
watch([timepicker], (): void => {
  isTextareaInOrTimeChange = true;
  arrayTextareaInFilterByTime = [];
  if (isRealtime.value) {
    logFilterForBtn.value();
  }
}); // 监听timepicker

// Function

// uploadMouseEnter
const uploadMouseEnter = (e: any): void => {
  isPointerEventsNone.value = true;
  isUploadChange = true;
}; // uploadMouseEnter

// textareaMouseLeave
const textareaMouseLeave = (e: any): void => {
  isPointerEventsNone.value = false;
  isUploadChange = false;
}; // textareaMouseLeave

// uploadChange
const uploadChange = (res: Record<string, any>, file: any): void => {
  if (res) {
    textareaIn.value = "";
    var reader = new FileReader();
    reader.readAsText(res.raw);
    reader.onload = (e) => {
      if (isUploadChange) {
        textareaIn.value += reader.result as string;
      } else {
        textareaIn.value = reader.result as string;
      }
    };
  }
  fileList.value = [];
}; // uploadChange

// 阅读器更改事件
const changeReader = (): void => {
  const mapHierarchy: Record<string, number> = {
    "Table": 0,
    "Textarea": 1,
    "Markdown": 0
  };
  if (mapHierarchy[reader.value] !== mapHierarchy[oldReader]) {
    readerChange = true;
  } else {
    readerChange = false;
  }
  oldReader = reader.value;
  logFilterForBtn.value();
}; // 阅读器更改事件

// 过滤按钮事件
const logFilterForBtn = ref((): void => {
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
}); // 过滤按钮事件

// 正则过滤
const logFilterForRegex = ref((e: any): void => {
  if (e.keyCode === 13 && !isRealtime.value) {
    logFilterForBtn.value();
  }
}); // 正则过滤

// 二分过滤时间
const logFilterWithTime = (): string[] => {
  if (isTextareaInOrTimeChange) {
    // filter date
    let [timepickerStart, timepickerEnd] = timepicker.value ?? ["", ""];
    let [momentDateStart, momentDateEnd] = [moment(timepickerStart), moment(timepickerEnd)];
    let start = binarySearchMax(arrayTextareaIn, momentDateStart.add(-1, "seconds").toString()) + 1;
    let end = binarySearchMin(arrayTextareaIn, momentDateEnd.add(1, "seconds").toString());
    arrayTextareaInFilterByTime = arrayTextareaIn.slice(start, end);
  }
  return arrayTextareaInFilterByTime;
}; // 二分过滤时间

// 过滤
const logFilterWithRegex = (): void => {
  logFilterWithTime();
  let [timepickerStart, timepickerEnd] = timepicker.value ?? ["", ""];
  let isFilterFiled = (moment(timepickerStart).isValid() && moment(timepickerEnd).isValid()) || textRegex.value !== "";
  if (textareaIn.value !== "" && isFilterFiled) {
    if (isRegexChange || isTextareaInOrTimeChange || readerChange) {
      isRegexChange = false;
      isTextareaInOrTimeChange = false;
      if (textRegex.value !== "") {
        if (reader.value === "Markdown" || reader.value === "Table") {
          let tempArray = arrayTextareaInFilterByTime.filter(f => regexString.test(f))
              .map(s => s.replace(regexString, (value) => `<label class="highlight">${value}</label>`)
                  .replaceAll("  ", "&nbsp;&nbsp;"));
          textareaOut.value = tempArray.join("\n");

          tableData.value = [];
          tempArray.forEach(f => tableData.value.push({data: f}));
        } else {
          let tempArray = arrayTextareaInFilterByTime.filter(f => regexString.test(f));
          textareaOut.value = tempArray.join("\n");

          tableData.value = [];
          tempArray.forEach(f => tableData.value.push({data: f}));
        }
      } else {
        if (reader.value === "Markdown" || reader.value === "Table") {
          let tempArray = arrayTextareaInFilterByTime
              .map(s => s.replaceAll("  ", "&nbsp;&nbsp;"));
          textareaOut.value = tempArray.join("\n");

          tableData.value = [];
          tempArray.forEach(f => tableData.value.push({data: f}));
        } else {
          textareaOut.value = arrayTextareaInFilterByTime.join("\n");

          tableData.value = [];
          arrayTextareaInFilterByTime.forEach(f => tableData.value.push({data: f}));
        }
      }
    }
  } else {
    textareaOut.value = textareaIn.value;
  }
  isLoading.value = false;
}; // 过滤

// 二分查找arrayTextareaIn中不大于x的最大值
const binarySearchMax = (array: string[], x: string): number => {
  let [left, right] = [0, array.length - 1];
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (compareOnlyTime(moment(recognitionTime(array[mid])), moment(x)) <= 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return right;
}; // 二分查找arrayTextareaIn中不大于x的最大值

// 二分查找arrayTextareaIn中不小x的最小值
const binarySearchMin = (array: string[], x: string): number => {
  let [left, right] = [0, array.length - 1];
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (compareOnlyTime(moment(recognitionTime(array[mid])), moment(x)) >= 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}; // 二分查找arrayTextareaIn中不小x的最小值

const mappingData = (): void => {
  arrayTextareaIn = textareaIn.value
      .split("\n").filter(f => f !== "");

  // Date
  if (arrayTextareaIn.length > 0) {
    let string_first: string = _.first(arrayTextareaIn) ?? "";
    dateStart = recognitionTime(string_first);
    let moment_date_start = moment(recognitionTime(string_first));
    FilterByBreakLine();
    let string_last: string = _.last(arrayTextareaIn) ?? "";
    dateEnd = recognitionTime(string_last);
    let moment_date_end = moment(recognitionTime(string_last));
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

// 获取时间
const recognitionTime = (s: string): string => {
  let stringMoment: string = "";
  let stringMomentOnlyTime: string = "";
  let indexStringMoment: number = 0;
  let indexStringMomentOnlyTime: number = 0;
  s.split("")
      .forEach((v, i) => {
        s.split("")
            .splice(i)
            .reduce((previousValue, currentValue, currentIndex, array) => {
              let value = previousValue + currentValue;
              if (value.length > 25) {
                array.splice(1);
              } else if (value.length > 7) {
                if (value.length > stringMoment.length && moment(value).isValid() && REGEX_TIME.test(value)) {
                  stringMoment = value;
                  indexStringMoment = i;
                }
                if (value.length > stringMomentOnlyTime.length && moment(YEAR_START.concat(value)).isValid() && REGEX_TIME.test(value)) {
                  stringMomentOnlyTime = value;
                  indexStringMomentOnlyTime = i;
                }
              }
              return value;
            });
      });
  if (stringMoment.length >= stringMomentOnlyTime.length) {
    recognitionTimeStart = indexStringMoment;
    recognitionTimeEnd = indexStringMoment + stringMoment.length;
    isOnlyTime = false;
  } else {
    recognitionTimeStart = indexStringMomentOnlyTime;
    recognitionTimeEnd = indexStringMomentOnlyTime + stringMomentOnlyTime.length;
    isOnlyTime = true;
  }
  return stringMoment.length >= stringMomentOnlyTime.length
      ? stringMoment
      : YEAR_START.concat(stringMomentOnlyTime);
}; // 获取时间

// 校对时间
const recognitionTimeCheck = (s: string): boolean => {
  if (isOnlyTime) {
    return moment(YEAR_START.concat(s.slice(recognitionTimeStart, recognitionTimeEnd))).isValid() && REGEX_TIME.test(YEAR_START.concat(s.slice(recognitionTimeStart, recognitionTimeEnd)));
  } else {
    return moment(s.slice(recognitionTimeStart, recognitionTimeEnd)).isValid() && REGEX_TIME.test(s.slice(recognitionTimeStart, recognitionTimeEnd));
  }
}; // 校对时间

// 识别并合并换行
const FilterByBreakLine = (): void => {
  const tempArray: string[] = [];
  arrayTextareaIn.forEach((v) => {
    if (recognitionTimeCheck(v)) {
      tempArray.push(v);
    } else if (tempArray.length > 1) {
      tempArray[tempArray.length - 1] = tempArray[tempArray.length - 1].concat("\n").concat(v);
    }
  });
  arrayTextareaIn = tempArray;
}; // 识别并合并换行

// 日期选择器更改
const calendarChange = ref((array: [Date, Date]): void => {
  arrayDatepicker = array;
}); // 日期选择器更改

// 禁用日期
const disabledDates = ref((date: Date): boolean => {
  return moment(date).isBefore(_.first(datepicker.value), "date")
      || moment(date).isAfter(_.last(datepicker.value), "date");
}); // 禁用日期

// 禁用小时
const disabledHours = ref((pos_datepicker: string): number[] => {
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
}); // 禁用小时

// 禁用分钟
const disabledMinutes = ref((hour: number): number[] => {
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
}); // 禁用分钟

// 禁用秒
const disabledSeconds = ref((hour: number, minute: number): number[] => {
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
}); // 禁用秒

// 得到范围内的时间
const makeRange = (start: number, end: number): number[] => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}; // 得到范围内的时间

// 仅比较时间
const compareOnlyTime = (time1: any, time2: any): number => {
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
}; // 仅比较时间
</script>
