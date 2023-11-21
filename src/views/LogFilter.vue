<template>
  <h1 class="title">
    日志过滤 LogFilter
  </h1>
  <el-row>
    <el-col :lg="9">
      <div style="display: flex; justify-content: space-between;">
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
        <el-dropdown @command="handleCommand">
          <el-button type="primary">
            例子 Sample
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="0">09:00:00.000 - 16:59:59.999</el-dropdown-item>
              <el-dropdown-item command="1">2023/01/01 00:00:00.000 - 2023/01/01 23:59:59.999</el-dropdown-item>
              <el-dropdown-item command="2">2023-01-01 00:00:00.000 - 2023-01-03 23:59:59.999</el-dropdown-item>
              <el-dropdown-item command="3">01/01/2023 00:00:00.000 - 01/03/2023 23:59:59.999</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
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
      <div style="position: relative; display: flex; justify-content: center;">
        <el-button
          v-if="isFileTooBig"
          :loading="isFileLoading"
          style="position: absolute; z-index: 2; top: 70%;"
          @click="btnFileStillShowClick"
        >
          仍要显示 Still Show
        </el-button>
        <el-upload
          id="upload"
          :auto-upload="false"
          :show-file-list="false"
          :disabled="false"
          :class="isPointerEventsNone ? 'pointer-events-none' : ''"
          v-model:file-list="fileList"
          :on-change="uploadChange"
          accept=".txt, .log"
          action="none"
          drag
          style="position: absolute; opacity: 0.3; z-index: 1; height: 100%; width: 100%;"
          @mouseenter="uploadMouseEnter"
        >
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            {{
              isFileTooBig ? "文件过大，不予显示 The file is too large to be displayed" : "将文件拖到此处 Drop file here (.txt, .log)"
            }}
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
        <div style="display: flex; justify-content: space-between; width: 290px;">
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

          <div id="divFuzzySearch">
            <el-checkbox
              id="isFuzzySearchAnd"
              v-model="isFuzzySearchAnd"
              border
              class="tools"
              title="模糊搜索 与"
            >
              <strong style="font-size: 20px;">
                &
              </strong>
            </el-checkbox>

            <el-checkbox
              id="isFuzzySearchOr"
              v-model="isFuzzySearchOr"
              border
              class="tools"
              title="模糊搜索 或"
            >
              <strong style="font-size: 20px;">
                |
              </strong>
            </el-checkbox>
          </div>

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
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </el-checkbox>
        </div>
        <div style="flex: 1;"></div>

        <el-button
          :disabled="isRealtime"
          :loading="isFilterLoading"
          type="primary"
          @click="logFilterForBtn"
        >
          过滤
        </el-button>
      </div>
      <el-upload
        v-model:file-list="fileList"
        class="upload"
        multiple
        :on-preview="uploadPreview"
        :on-change="uploadChange"
        :on-remove="uploadRemove"
        :auto-upload="false"
        :disabled="false"
        accept=".txt, .log"
        style="padding-top: 10px;"
      >
        <el-button
          :loading="isUploadLoading"
        >
          Upload
        </el-button>
        <template #tip>
          <div class="el-upload__tip">
            <!--              jpg/png files with a size less than 500KB.-->
          </div>
        </template>
      </el-upload>
    </el-col>
    <el-col :lg="9" style="display: flex; align-items: center; flex-direction: column; position: relative;">
      <el-row style="align-items: flex-start; width: 100%;">
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
        <el-col :xl="12" style="margin-bottom: 8px;">
          <div v-if="reader !== 'Textarea'" style="white-space: nowrap;">
            <span class="demonstration">高亮字体颜色</span>
            <el-color-picker v-model="colorPickerFont" />
            &nbsp;
            <span class="demonstration">高亮字体背景颜色</span>
            <el-color-picker v-model="colorPickerFontBackground" />
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
      <label
        v-if="isResultTooBig"
        style="position: absolute; z-index: 2; top: 40%;"
      >
        结果过大不予显示
      </label>
      <el-button
        v-if="isResultTooBig"
        :loading="isResultLoading"
        style="position: absolute; z-index: 2; top: 50%;"
        @click="btnResultStillShowClick"
      >
        仍要显示 Still Show
      </el-button>
      <el-table
        v-if="reader === 'Table'"
        id="tableOut"
        :data="tableData"
        :show-header="false"
        style="max-height: 625px; min-height: 325px;"
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
        v-if="reader === 'Textarea'"
        id="textareaOut"
        v-model="textareaOut"
        :autosize="{ minRows: 15 }"
        :class="!isAutoBreakLineForTextareaOut ? 'noWrap' : ''"
        readonly
        style="flex: 1;"
        type="textarea"
      />
      <md-editor
        v-if="reader === 'Markdown'"
        v-model="markdownOut"
        style="flex: 1; min-height: 325px;"
      ></md-editor>
    </el-col>
  </el-row>
  <el-col :lg="9" :offset="15">
    <p v-if="ifTimeSpend" style="width: 100%;">
      用时：{{ timeSpend }}
    </p>
  </el-col>
</template>

<style lang="scss">
@import "md-editor-v3/lib/style.css";

#app {
  .el-date-editor.el-input, .el-date-editor.el-input__wrapper {
    width: auto;
  }

  .md-editor-toolbar-wrapper, .md-editor-footer, .md-editor-input-wrapper {
    display: none;
  }

  #textareaIn {
    max-height: 625px;
  }

  #md-editor-v3 {
    max-height: 625px;
  }

  #md-editor-v3-preview {
    padding: 5px 11px;
  }

  .tools {
    margin: 0px;

    .el-checkbox__inner {
      display: none;
    }
  }

  .highlight {
    color: v-bind(colorPickerFont);
    background-color: v-bind(colorPickerFontBackground);
  }

  #textareaOut {
    max-height: 625px;
  }

  .noWrap textarea {
    white-space: pre;
  }

  #upload {
    .el-upload.el-upload--text.is-drag {
      height: 100%;
    }

    .el-upload-dragger {
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  }

  #upload.pointer-events-none {
    pointer-events: none;
  }

  #tableOut table tbody tr td .cell {
    white-space: pre-line;
  }

  #divFuzzySearch {
    .tools {
      padding: 0 10px;

      .el-checkbox__label {
        padding: 0;
      }
    }

    .tools:first-child {
      border-right: 0px;
    }

    .tools:last-child {
      border-left: 0px;
    }
  }

  .paddingTop40px {
    padding-top: 10px;
  }
}

@media only screen and (min-width: 1200px) {
  #app #textareaOut {
    height: 100% !important;
  }
}

@media only screen and (min-width: 1200px) {
  #app .paddingTop40px {
    padding-top: 40px;
  }
}
</style>

<style scoped>
:deep(.upload .el-upload) {
  width: 100%;
}

:deep(.upload .el-button) {
  width: 100%;
}

:deep(.upload .el-upload-list) {
  overflow: auto;
  max-height: 456px;
}
</style>

<script lang='ts' setup>
// Import
import {computed, ref, watch} from "vue";
import moment from "moment";
import _ from "lodash";
import {MdEditor} from "md-editor-v3";
import type {UploadFile, UploadFiles, UploadProps, UploadUserFile} from "element-plus";
import {ElMessage, ElMessageBox} from "element-plus";

// Init
let sloth: any = {}; // 是否使用命名空间？
const textareaIn = ref<string>("");
const textRegex = ref<string>("");
const isRealtime = ref<boolean>(false);
const isFilterLoading = ref<boolean>(false);
const textareaOut = ref<string>("");
const markdownOut = ref<string>("");
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
const isFuzzySearchAnd = ref<boolean>(true);
const isFuzzySearchOr = ref<boolean>(false);
const isAutoBreakLineForTextareaIn = ref<boolean>(true);
const isAutoBreakLineForTextareaOut = ref<boolean>(true);
const isPointerEventsNone = ref<boolean>(false);
const isFileTooBig = ref<boolean>(false);
const isFileLoading = ref<boolean>(false);
const isUploadLoading = ref<boolean>(false);
const isResultTooBig = ref<boolean>(false);
const isResultLoading = ref<boolean>(false);
const fileList = ref<UploadUserFile[]>([]);

const ifTimeSpend = computed<boolean>(() => {
  return timeSpend.value !== "";
});

const ARRAY_HOURS: number[] = [...Array(24).keys()];
const ARRAY_MINUTES: number[] = Array.from(Array(60), (item, index) => index);
const ARRAY_SECONDS: number[] = [...Array(60)].map((item, index) => index);
const YEAR_START: string = "1969 ";
const REGEX_TIME: RegExp = new RegExp(/^(((\d{4}[\/\-]?\d{1,2}[\/\-]?\d{1,2})|(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})|(\d{4}))[T ])?\d{1,2}\:\d{1,2}:\d{1,2}(\.\d{1,3})?( ?[AP]M)?$/i);
const MAP_HIERARCHY: Record<string, number> = {
  "Table": 0,
  "Textarea": 1,
  "Markdown": 2
};
const ARRAY_DATE: string[] = ["2023/01/01", "2023/01/02", "2023/01/03"];
const MAX_LENGTH: number = 10000;

let regexString = new RegExp("");
let regexInverseString = new RegExp("");
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
let arrayFileIn: string[] = [];
let arrayTempResult: string[] = [];

// Event

// 监听输入框
watch([textareaIn], (): void => {
  if (!isUploadLoading.value) {
    isFileTooBig.value = false;
    isResultTooBig.value = false;
    arrayFileIn = [];
    fileList.value = [];
    mappingData();
    isTextareaInOrTimeChange = true;
    arrayTextareaInFilterByTime = [];
    if (isRealtime.value) {
      logFilterForBtn.value();
    }
  }
}); // 监听输入框

// 监听选项
watch([isRealtime, textRegex, isCaseMatch, isRegexMatch, isFuzzySearchAnd, isFuzzySearchOr], (): void => {
  let tempText = textRegex.value;
  let tempInverseText = "^(?!.*(" + tempText + "))";
  if (!isRegexMatch.value) {
    // tempText = tempText.replaceAll("\\", "\\\\") // 转义
    //   .replaceAll(".", "\\.")
    //   .replaceAll("*", "\\*")
    //   .replaceAll("+", "\\+")
    //   .replaceAll("?", "\\?")
    //   .replaceAll("$", "\\$")
    //   .replaceAll("^", "\\^")
    //   .replaceAll("[", "\\[")
    //   .replaceAll("]", "\\]")
    //   .replaceAll("(", "\\(")
    //   .replaceAll(")", "\\)")
    //   .replaceAll("{", "\\{")
    //   .replaceAll("}", "\\}")
    //   .replaceAll("|", "\\|");
    tempText = _.escapeRegExp(tempText);
    tempInverseText = "^(?!.*(" + tempText + "))";
    if (isFuzzySearchOr.value) {
      // 使用中： ^(?!.*((abc)|(def)))
      // 也许能有所优化： ^(?!.*(?:abc|def))
      tempInverseText = "^(?!.*(" + tempText.trim().split(" ").filter(f => f !== "").map(m => "(" + m + ")").join("|") + "))";
      // (abc|def)
      tempText = "(" + tempText.split(" ").join("|") + ")";
    } else if (isFuzzySearchAnd.value) {
      // 使用中： ^(?!.*((abc)))|^(?!.*((def)))
      // 也许能优化： ^(?!.*(abc|def))
      tempInverseText = tempText.trim().split(" ").filter(f => f !== "").map(m => "^(?!.*((" + m + ")))").join("|");
      // (abc|def)
      tempText = "(" + tempText.split(" ").join("|") + ")";
    }
  }
  regexString = new RegExp(tempText, isCaseMatch.value ? "g" : "gi");
  regexInverseString = new RegExp(tempInverseText, isCaseMatch.value ? "g" : "gi");
  isRegexChange = true;
  if (isRealtime.value) {
    logFilterForBtn.value();
  }
}); // 监听选项

// 监听timepicker
watch([timepicker, datepicker], (): void => {
  isTextareaInOrTimeChange = true;
  arrayTextareaInFilterByTime = [];
  if (isRealtime.value) {
    logFilterForBtn.value();
  }
}); // 监听timepicker

// 监听isFuzzySearchAnd
watch([isFuzzySearchAnd], (): void => {
  if (isFuzzySearchAnd.value) {
    isRegexMatch.value = false;
    isFuzzySearchOr.value = false;
  }
}); // 监听isFuzzySearchAnd

// 监听isFuzzySearchOr
watch([isFuzzySearchOr], (): void => {
  if (isFuzzySearchOr.value) {
    isRegexMatch.value = false;
    isFuzzySearchAnd.value = false;
  }
}); // 监听isFuzzySearchOr

// 监听isRegexMatch
watch([isRegexMatch], (): void => {
  if (isRegexMatch.value) {
    isFuzzySearchAnd.value = false;
    isFuzzySearchOr.value = false;
  }
}); // 监听isRegexMatch

// Function

//统计重复项
//_.chain(_.countBy(arrayFileIn.map(m=>m.substr(25,10)))).map(function(cnt, brand){return {brand: brand, count: cnt}}).sortBy('count').reverse().value()

// 下拉框点击事件
const handleCommand = (command: string | number | object) => {
  const LOGLEVEL: string[] = ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"];
  switch (command) {
    case "0":
      textareaIn.value =
        [...Array(8)].map((itemHour, indexHour) =>
          [...Array(60)].map((itemMinute, indexMinute) =>
            (indexHour + 9).toString()
              .padStart(2, "0")
              .concat(":")
              .concat(indexMinute.toString()
                .padStart(2, "0"))
              .concat(":")
              .concat(Math.floor(Math.random() * 60).toString()
                .padStart(2, "0"))
              .concat(".")
              .concat(Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, "0"))
              .concat(" ")
              .concat(LOGLEVEL[Math.floor(Math.random() * 5)].padEnd(5, " "))
              .concat(" [][] ")
              .concat(Math.random()
                .toString(36)
                .substring(2))
          )
        ).flat(Infinity).join("\n");
      break;
    case "1":
      textareaIn.value =
        [...Array(24)].map((itemHour, indexHour) =>
          [...Array(60)].map((itemMinute, indexMinute) =>
            (_.first(ARRAY_DATE) ?? "2023/01/01").concat(" ")
              .concat(indexHour.toString()
                .padStart(2, "0"))
              .concat(":")
              .concat(indexMinute.toString()
                .padStart(2, "0"))
              .concat(":")
              .concat(Math.floor(Math.random() * 60).toString()
                .padStart(2, "0"))
              .concat(".")
              .concat(Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, "0"))
              .concat(" ")
              .concat(LOGLEVEL[Math.floor(Math.random() * 5)].padEnd(5, " "))
              .concat(" [][] ")
              .concat(Math.random()
                .toString(36)
                .substring(2))
          )
        ).flat(Infinity).join("\n");
      break;
    case "2":
      textareaIn.value =
        ARRAY_DATE.map((itemDate, indexDate) =>
          [...Array(24)].map((itemHour, indexHour) =>
            [...Array(60)].map((itemMinute, indexMinute) =>
              moment(itemDate).format("yyyy-MM-DD")
                .concat(" ")
                .concat(indexHour.toString()
                  .padStart(2, "0"))
                .concat(":")
                .concat(indexMinute.toString()
                  .padStart(2, "0"))
                .concat(":")
                .concat(Math.floor(Math.random() * 60).toString()
                  .padStart(2, "0"))
                .concat(".")
                .concat(Math.floor(Math.random() * 1000)
                  .toString()
                  .padStart(3, "0"))
                .concat(" ")
                .concat(LOGLEVEL[Math.floor(Math.random() * 5)].padEnd(5, " "))
                .concat(" [][] ")
                .concat(Math.random()
                  .toString(36)
                  .substring(2))
            )
          )
        ).flat(Infinity).join("\n");
      break;
    case "3":
      textareaIn.value =
        ARRAY_DATE.map((itemDate, indexDate) =>
          [...Array(24)].map((itemHour, indexHour) =>
            [...Array(60)].map((itemMinute, indexMinute) =>
              moment(itemDate).format("MM/DD/YYYY")
                .concat(" ")
                .concat(indexHour.toString()
                  .padStart(2, "0"))
                .concat(":")
                .concat(indexMinute.toString()
                  .padStart(2, "0"))
                .concat(":")
                .concat(Math.floor(Math.random() * 60).toString()
                  .padStart(2, "0"))
                .concat(".")
                .concat(Math.floor(Math.random() * 1000)
                  .toString()
                  .padStart(3, "0"))
                .concat(" ")
                .concat(LOGLEVEL[Math.floor(Math.random() * 5)].padEnd(5, " "))
                .concat(" [][] ")
                .concat(Math.random()
                  .toString(36)
                  .substring(2))
            )
          )
        ).flat(Infinity).join("\n");
      break;
  }
}; // 下拉框点击事件

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

// btnFileStillShowClick
const btnFileStillShowClick = (): void => {
  new Promise<void>((resolve) => {
    isFileLoading.value = true;
    setTimeout(() => {
      resolve();
    }, 50);
  }).then(() => {
    textareaIn.value = arrayFileIn.join("\n");
    isFileTooBig.value = false;
    isFileLoading.value = false;
    mappingData();
  });
}; // btnFileStillShowClick

// btnResultStillShowClick
const btnResultStillShowClick = (): void => {
  new Promise<void>((resolve) => {
    isResultLoading.value = true;
    setTimeout(() => {
      resolve();
    }, 50);
  }).then(() => {
    clearResult();
    switch (reader.value) {
      case "Markdown":
        markdownOut.value = arrayTempResult.join("\n");
        break;
      case "Table":
        arrayTempResult.forEach(f => tableData.value.push({data: f}));
        break;
      case "Textarea":
        textareaOut.value = arrayTempResult.join("\n");
        break;
    }
    isResultTooBig.value = false;
    isResultLoading.value = false;
  });
}; // btnResultStillShowClick

// 阅读器更改事件
const changeReader = (): void => {
  readerChange = MAP_HIERARCHY[reader.value] !== MAP_HIERARCHY[oldReader];
  oldReader = reader.value;
  logFilterForBtn.value();
}; // 阅读器更改事件

// 过滤按钮事件
const logFilterForBtn = ref((): void => {
  let dateTime: Date = new Date();
  new Promise<void>((resolve) => {
    isFilterLoading.value = true;
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
    if (isOnlyTime || isOneDay.value) {
      // filter date only time
      let [timepickerStart, timepickerEnd] = timepicker.value ?? ["", ""];
      let [momentDateStart, momentDateEnd] = [moment(timepickerStart), moment(timepickerEnd)];
      let start = binarySearchMax(arrayTextareaIn, momentDateStart.add(-1, "seconds").toString()) + 1;
      let end = binarySearchMin(arrayTextareaIn, momentDateEnd.add(1, "seconds").toString());
      arrayTextareaInFilterByTime = arrayTextareaIn.slice(start, end);
    } else {
      let [datepickerStart, datepickerEnd] = datepicker.value ?? ["", ""];
      let [momentDateStart, momentDateEnd] = [moment(datepickerStart), moment(datepickerEnd)];
      let start = binarySearchMax(arrayTextareaIn, momentDateStart.add(-1, "seconds").toString()) + 1;
      let end = binarySearchMin(arrayTextareaIn, momentDateEnd.add(1, "seconds").toString());
      arrayTextareaInFilterByTime = arrayTextareaIn.slice(start, end);
    }
  }
  return arrayTextareaInFilterByTime;
}; // 二分过滤时间

// 过滤
const logFilterWithRegex = (): void => {
  logFilterWithTime();
  let [timepickerStart, timepickerEnd] = timepicker.value ?? ["", ""];
  let isFilterFiled = (moment(timepickerStart).isValid() && moment(timepickerEnd).isValid()) || textRegex.value !== "";
  if (arrayTextareaIn.length > 0 && isFilterFiled) {
    if (isRegexChange || isTextareaInOrTimeChange || readerChange) {
      isRegexChange = false;
      isTextareaInOrTimeChange = false;
      if (textRegex.value !== "") {
        arrayTempResult = arrayTextareaInFilterByTime.filter(f => !(f.replaceAll("\r", "").replaceAll("\n", "")
          .match(regexInverseString) || []).length);
        if (reader.value === "Markdown" || reader.value === "Table") {
          arrayTempResult = arrayTempResult.map(s => s.replaceAll(regexString, (value) => `<label class="highlight">${value}</label>`)
            .replaceAll("  ", "&nbsp;&nbsp;"));
        }
      } else {
        if (reader.value === "Markdown" || reader.value === "Table") {
          arrayTempResult = arrayTextareaInFilterByTime
            .map(s => s.replaceAll("  ", "&nbsp;&nbsp;"));
        } else {
          arrayTempResult = arrayTextareaInFilterByTime;
        }
      }
      clearResult();
      if (arrayTempResult.length > MAX_LENGTH) {
        isResultTooBig.value = true;
      } else {
        isResultTooBig.value = false;
        debugger
        switch (reader.value) {
          case "Markdown":
            markdownOut.value = arrayTempResult.join("\n");
            break;
          case "Table":
            arrayTempResult.forEach(f => tableData.value.push({data: f}));
            break;
          case "Textarea":
            textareaOut.value = arrayTempResult.join("\n");
            break;
        }
      }
    }
  } else {
    arrayTempResult = arrayTextareaIn;
    clearResult();
    if (arrayTempResult.length > MAX_LENGTH) {
      isResultTooBig.value = true;
    } else {
      isResultTooBig.value = false;
      switch (reader.value) {
        case "Markdown":
          markdownOut.value = arrayTempResult.join("\n");
          break;
        case "Table":
          arrayTempResult.forEach(f => tableData.value.push({data: f}));
          break;
        case "Textarea":
          textareaOut.value = arrayTempResult.join("\n");
          break;
      }
    }
  }
  isFilterLoading.value = false;
}; // 过滤

// clearResult
const clearResult = (): void => {
  textareaOut.value = "";
  markdownOut.value = "";
  tableData.value = [];
}; // clearResult

// 二分查找arrayTextareaIn中不大于x的最大值
const binarySearchMax = (array: string[], x: string): number => {
  let [left, right] = [0, array.length - 1];
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (isOnlyTime || isOneDay.value) {
      if (compareOnlyTime(moment(recognitionTime(array[mid])), moment(x)) <= 0) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      if (moment(recognitionTime(array[mid])).isBefore(moment(x), "second")) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return right;
}; // 二分查找arrayTextareaIn中不大于x的最大值

// 二分查找arrayTextareaIn中不小x的最小值
const binarySearchMin = (array: string[], x: string): number => {
  let [left, right] = [0, array.length - 1];
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (isOnlyTime || isOneDay.value) {
      if (compareOnlyTime(moment(recognitionTime(array[mid])), moment(x)) >= 0) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (moment(recognitionTime(array[mid])).isAfter(moment(x), "second")) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }
  return left;
}; // 二分查找arrayTextareaIn中不小x的最小值

// 映射数据
const mappingData = (): void => {
  if (textareaIn.value !== "") {
    arrayTextareaIn = textareaIn.value
      .split("\n").filter(f => f !== "");
    arrayFileIn = [];
  } else if (arrayFileIn.length > 0) {
    arrayTextareaIn = arrayFileIn;
    textareaIn.value = "";
  }

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
  return moment(date).isBefore(moment(dateStart), "date")
    || moment(date).isAfter(moment(dateEnd), "date");
}); // 禁用日期

// 禁用小时
const disabledHours = ref((posDatepicker: string): number[] => {
  const momentDateStart = moment(dateStart).startOf("date");
  const momentDateEnd = moment(dateEnd).startOf("date");
  if (posDatepicker === "start") {
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
  for (let i = start; i <= end; ++i) {
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

// 预览文件
const uploadPreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile, 2333);
}; // 预览文件

// 移除文件
const uploadRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  isUploadLoading.value = true;
  calculateUpload(uploadFiles);
}; // 移除文件

// 上传文件
const uploadChange: UploadProps["onChange"] = (file, uploadFiles) => {
  isUploadLoading.value = true;
  calculateUpload(uploadFiles);
}; // 上传文件

/*
多文件上传，3种模式
1. 文件名排序
2. 文件第一行和最好一行排序
3. 所有文件所有记录混合排序（就是你的分布式得到的log文件）
*/

// 根据排序同步获取文件内容
const getFileText = async (uploadFiles: UploadFiles) => {
  for (let i in uploadFiles) {
    let f: UploadFile = uploadFiles[i];
    await f.raw?.text().then((res) => {
      res.split("\n").filter(f => f !== "").forEach((v) => {
        arrayFileIn.push(v);
      });
    });
  }
}; // 根据排序同步获取文件内容

// 上传文件
const calculateUpload: _.DebouncedFunc<any> = _.debounce((uploadFiles: UploadFiles): void => {
  textareaIn.value = "";
  arrayFileIn = [];
  arrayTextareaIn = [];
  if (uploadFiles.length === 0) {
    isFileTooBig.value = false;
    isUploadLoading.value = false;
  } else {
    uploadFiles = _.sortBy(uploadFiles, (s) => s.name);
    fileList.value = uploadFiles;
    getFileText(uploadFiles).then(() => {
      if (arrayFileIn.length > MAX_LENGTH) {
        isFileTooBig.value = true;
      } else {
        isFileTooBig.value = false;
        textareaIn.value = arrayFileIn.join("\n");
      }
      calculateUploadComplete();
    });
  }
}, 1000); // 上传文件

// 上传文件完成
const calculateUploadComplete: _.DebouncedFunc<any> = _.debounce((): void => {
  isTextareaInOrTimeChange = true;
  mappingData();
  debugger
  isUploadLoading.value = false;
}, 1000); // 上传文件完成

// _.chain(_.countBy(arrayFileIn.map(m => arrayFileIn.map(m => m.substring(25, 10))).filter(f => f != undefined))).map(function (cnt, brand) {
//   return {brand: brand, count: cnt};
// }).sortBy("count").reverse().value();

// 时间差
// arrayTempResult.forEach((e)=>{console.log(moment(e.match(new RegExp(/\[Start:.*?\]/g))[0].slice(7,30))-moment(e.match(new RegExp(/\[End:.*?\]/g))[0].slice(5,28)));console.log(e.match(new RegExp(/\[Start:.*?\]/g))[0].slice(7,30))})
</script>

