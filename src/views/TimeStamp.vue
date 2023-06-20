<template>
  <h1 class="title">
    Time Calculate
  </h1>
  <el-row :gutter="20">
    <el-col :lg="12">
      <el-card class="box-card"
               style="height: 98%">
        <template #header>
          <div class="card-header">
            <span>时间戳转换工具</span>
          </div>
        </template>
        <el-row :gutter="20" style=" padding-bottom: 10px;">
          <el-col :lg="6">
            <el-button
              style=""
              size="large"
              type="primary"
              @click="btnTimeStamp">
              时间戳转换时间
            </el-button>
          </el-col>

          <el-col :lg="6">
            <el-button
              style=""
              size="large"
              type="primary"
              @click="btnTime">
              时间转换时间戳
            </el-button>
          </el-col>

          <el-col :lg="8">
            <el-button
              style=""
              size="large"
              type="primary"
              @click="btnEmpty">
              清空
            </el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20"
                style=" padding-bottom: 10px;">
          <el-col :lg="12">
            <div>
              <el-input
                id="timestamp_value"
                v-model="textareaIn0"
                placeholder="Please enter a timestamp"
                oninput="value=value.replace(/[^0-9]/g, '')"
              />
            </div>
          </el-col>

          <el-col :lg="12">
            <div>
              <el-input
                id="timestamp_result"
                v-model="textareaIn1"
                :autosize="{ minRows: 15, maxRows: 30 }"
                placeholder=""
                class="el_input_readonly"
                readonly
              />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="12">
            <div class="demo-date-picker">
              <el-date-picker
                v-model="dataTimeValue"
                type="datetime"
                placeholder="Please select a time"
              />
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <el-col :lg="12">
      <el-card class="box-card"
               style="height: 98%">
        <template #header>
          <div class="card-header">
            <span>倒计时</span>
          </div>
        </template>
        <el-row style="background-color: #e9ecef;">
          <el-col :lg="12">
            <el-col :lg="12">
              <div class="demo-date-picker">
                <el-time-picker
                  v-model="timeValue"
                  type="datetime"
                  placeholder="Please select a time"
                />
              </div>
            </el-col>
          </el-col>
          <el-col>
            <div class="jumbotron text-center countdown_time"
                 style="text-align: center">
              <div class="container">
                <el-input
                  id="hour"
                  v-model="hour"
                  maxlength="2"
                  class="try8-input countdown_timer_input"
                  v-on:input="ValDataHours"
                >
                </el-input>
                <label for="hour">时</label>
                <el-input
                  id="minute"
                  v-model="minute"
                  maxlength="2"
                  v-on:input="ValidateMinutes"
                  class="try8-input countdown_timer_input
                ">
                </el-input>
                <label for="minute">分</label>
                <el-input
                  id="second"
                  v-model="second"
                  maxlength="2"
                  v-on:input="ValidateSeconds"
                  class="try8-input countdown_timer_input">
                </el-input>
                <label for="second">秒</label>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding-top: 20px">
          <el-col :lg="11">
            <el-button
              style=""
              size="large"
              type="primary"
              :disabled="btnTimeClickDisabled"
              @click="btnStartTiming"
            >
              开始计时
            </el-button>
          </el-col>

          <el-col :lg="11">
            <el-button
              style=""
              size="large"
              type="primary"
              :disabled="btnSuspendDisabled"
              @click="btnSuspend"
            >
              暂停
            </el-button>
          </el-col>

          <el-col :lg="2">
            <el-button
              style=""
              size="large"
              type="primary"
              @click="btnTimeEmpty"
            >
              清空
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :lg="12">
      <el-space direction="vertical">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>时间计算器</span>
            </div>
          </template>
          <el-row
            style="background-color: #e9ecef;
            padding-bottom: 10px;">
            <el-col :lg="10">
              <div class="input-group-prepend">
                <label for="point_begin_time" class="input-group-text try8-input">开始时间</label>
                <el-date-picker
                  v-model="StartTimeValue"
                  id="Starttimevalue"
                  type="datetime"
                  v-on:change="StartTimeFillValue"
                  placeholder="Please select a start time"
                />
              </div>
            </el-col>
            <el-col :lg="3"></el-col>
            <el-col :lg="11">
              <div class="input-group-prepend">
                <el-input
                  id="Starttimestamp"
                  v-model="StartTimestamp"
                  placeholder="Please enter the start timestamp"
                  oninput="value=value.replace(/[^0-9]/g, '')"
                  v-on:change="StartTimestampValue"
                  clearable
                >
                  <template #prepend>开始时间戳</template>
                </el-input>
              </div>
            </el-col>
          </el-row>

          <el-row style="background-color: #e9ecef;
            padding-bottom: 10px;">
            <el-col :lg="10">
              <div class="input-group-prepend">
                <label for="point_begin_time" class="input-group-text try8-input">结束时间</label>
                <el-date-picker
                  v-model="EndTimeValue"
                  id="Endtimevalue"
                  type="datetime"
                  v-on:change="EndTimeFillValue"
                  placeholder="Please select the end time"
                />
              </div>
            </el-col>
            <el-col :lg="3"></el-col>
            <el-col :lg="11">
              <div class="input-group-prepend">
                <el-input
                  id="Endtimestampvalue"
                  v-model="EndTimeStampValue"
                  placeholder="Please enter the end timestamp"
                  oninput="value=value.replace(/[^0-9]/g, '')"
                  v-on:change="EndTimestampValue"
                  clearable
                >
                  <template #prepend>结束时间戳</template>
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row style="background-color: #e9ecef;
            padding-bottom: 10px;">
            <el-col :lg="24">
              <el-button
                style=""
                size="large"
                type="primary"
                @click="btnStartCalculationTime"
              >
                开始计算
              </el-button>
            </el-col>
          </el-row>

          <el-row style="background-color: #e9ecef;
            padding-bottom: 10px;">
            <el-col :lg="10">
              <div class="input-group-prepend">
                <el-input
                  id="Timepvalue"
                  v-model="timesValue"
                  placeholder="Please enter a timestamp"
                  readonly
                >
                  <template #prepend>时间</template>
                </el-input>
              </div>
            </el-col>
            <el-col :lg="3"></el-col>
            <el-col :lg="11">
              <div class="input-group-prepend">
                <el-input
                  id="Stampvalue"
                  v-model="StampValue"
                  placeholder="Please enter a timestamp"
                  readonly
                >
                  <template #prepend>时间戳</template>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-space>
    </el-col>

    <el-col :lg="12">
      <el-space direction="vertical">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>世界时间表</span>
            </div>
          </template>
          <el-row>
            <div class="map">
              <h3 class="map-label">
                <span class="map-label-name">Asia/Tomsk</span>
                <span class="map-label-time">01:33 pm +07</span>
              </h3>
              <div class="map-wrap">
                <div class="map-inset">
                  <div class="map-axis-x" style="left: 73.6019%;"></div>
                  <div class="map-axis-y" style="top: 18.6111%;"></div>
                </div>
              </div>
            </div>
          </el-row>
        </el-card>
      </el-space>
    </el-col>
  </el-row>
</template>

<script lang='ts' setup>
import {ref} from "vue";
import _ from "lodash";

import moment from "moment";

const textareaIn0 = ref<number>();
const textareaIn1 = ref<string>("");
const second = ref<string>("00");
const minute = ref<string>("00");
const hour = ref<string>("00");
const dataTimeValue = ref<string>("");
const StartTimeValue = ref<string>("");
const StartTimestamp = ref<string>("");
const timesValue = ref<string>("");
const StampValue = ref<string>("");
const EndTimeValue = ref<string>("");
const EndTimeStampValue = ref<string>("");
const timeValue = ref<string>("");
const btnTimeClickDisabled = ref<boolean>(false);
const btnSuspendDisabled = ref<boolean>(true);
let timer: any = null;

const btnTimeStamp = (): void => {
  if (textareaIn0.value != null) {
    let timestamp: number = textareaIn0.value;
    const data = moment(moment.unix(timestamp).utc()).format("YYYY-MM-DD HH:mm:ss");
    textareaIn1.value = data;
  } else {
    textareaIn1.value = "时间戳类型错误！";
  }
};
const btnTime = (): void => {
  let timestampIn1 = dataTimeValue.value;
  const data = moment(timestampIn1).unix().toString();
  textareaIn1.value = "";
  textareaIn1.value = data;
};
const btnEmpty = (): void => {

};

let featureTime: any;
const btnStartTiming = (): void => {
  if (!btnTimeClickDisabled.value) {
    btnTimeClickDisabled.value = true;
  }
  if (btnSuspendDisabled.value) {
    btnSuspendDisabled.value = false;
  }
  let dateHourTime: number, dateMinuteTime: number, dateSecondTime: number, h: number, m: number, s: number,
    count: number, dataTime: string;
  let timeValueInfo = moment(timeValue.value).format("HH:mm:ss");
  if (timeValueInfo == "" || timeValueInfo == "Invalid date") {
    dataTime = hour.value + ":" + minute.value + ":" + second.value;
  } else {
    dataTime = timeValueInfo;
  }
  dateHourTime = moment.duration(dataTime).hours();
  dateMinuteTime = moment.duration(dataTime).minutes();
  dateSecondTime = moment.duration(dataTime).seconds();
  h = parseInt(String(dateHourTime * 3600));
  m = parseInt(String(dateMinuteTime * 60));
  s = dateSecondTime;
  count = h + m + s;
  featureTime = moment().add(count, "seconds");
  timer = setInterval(() => {
      hour.value = featureTime.diff(moment(), "hour");
      minute.value = featureTime.diff(moment().add(hour.value, "hour"), "minutes");
      second.value = featureTime.diff(moment().add(featureTime.diff(moment(), "minutes"), "minutes"), "seconds");
      if (hour.value == "0" && minute.value == "0" && second.value == "0") {
        clearTimeout(timer);
        alert("倒计时结束 !!!");
        window.location.reload();
      }
    },
    100);
};
const btnTimeEmpty = (): void => {
  clearTimeout(timer);
  hour.value = "00";
  minute.value = "00";
  second.value = "00";
  timeValue.value = "";
};

const btnSuspend = (): void => {
  if (btnTimeClickDisabled.value) {
    btnTimeClickDisabled.value = false;
  }
  if (!btnSuspendDisabled.value) {
    btnSuspendDisabled.value = true;
  }
  clearTimeout(timer);
  alert("倒计时暂停！！！");
};

const btnStartCalculationTime = (): void => {
  let startData = moment(StartTimeValue.value).format("YYYY-MM-DD").split("-");
  let endData = moment(EndTimeValue.value).format("YYYY-MM-DD").split("-");
  let startDataObj = new Date(Number(startData[0]), (Number(startData[1]) - 1), Number(startData[2]));
  let endDataObj = new Date(Number(endData[0]), (Number(endData[1]) - 1), Number(endData[2]));

  let t1, t2, dataTime, minusDays, days, timeDays;

  t1 = startDataObj.getTime();
  t2 = endDataObj.getTime();
  dataTime = 1000 * 60 * 60 * 24;
  minusDays = Math.floor(((t2 - t1) / dataTime));
  days = Math.abs(minusDays);

  let startHoursTime = moment.duration(moment(StartTimeValue.value).format("HH:mm:ss")).hours();
  let startMinutesTime = moment.duration(moment(StartTimeValue.value).format("HH:mm:ss")).minutes();
  let startSecondsTime = moment.duration(moment(StartTimeValue.value).format("HH:mm:ss")).seconds();
  let endHoursTime = moment.duration(moment(EndTimeValue.value).format("HH:mm:ss")).hours();
  let endMinutesTime = moment.duration(moment(EndTimeValue.value).format("HH:mm:ss")).minutes();
  let endSecondsTime = moment.duration(moment(EndTimeValue.value).format("HH:mm:ss")).seconds();

  let hours = startHoursTime - endHoursTime == 0 ? "00" : startHoursTime - endHoursTime;
  let minutes = startMinutesTime - endMinutesTime == 0 ? "00" : startMinutesTime - endMinutesTime;
  let seconds = startSecondsTime - endSecondsTime == 0 ? "00" : startSecondsTime - endSecondsTime;

  if (days == 0) {
    timeDays = "0000-00-00 ";
  }
  let dataTimeValues = timeDays + hours.toString() + ":" + minutes + ":" + seconds.toString().replace("-", "");
  timesValue.value = dataTimeValues;
  StampValue.value = moment(dataTimeValues).unix().toString();

};

function StartTimeFillValue() {
  StartTimestamp.value = moment(StartTimeValue.value).unix().toString();
}

function StartTimestampValue() {
  let startTimestamps: number = _.toNumber(StartTimestamp.value);
  StartTimeValue.value = moment(moment.unix(startTimestamps).utc()).format("YYYY-MM-DD HH:mm:ss");

}

function EndTimeFillValue() {
  EndTimeStampValue.value = moment(EndTimeValue.value).unix().toString();
}

function EndTimestampValue() {
  let endTimeStampValue: number = _.toNumber(EndTimeStampValue.value);
  EndTimeValue.value = moment(moment.unix(endTimeStampValue).utc()).format("YYYY-MM-DD HH:mm:ss");

}

function ValDataHours() {
  hour.value = hour.value.replace(new RegExp(/[a-z]|[A-Z]|2[5-9]|[3-9]\d|[^\w\u4E00-\u9FA5]/g), (r) => r.length > 1 ? r.substring(0, 1) : "");
}

function ValidateMinutes() {
  minute.value = minute.value.replace(/[a-z]|[A-Z]|[6-9]\d|[^\w\u4E00-\u9FA5]/g, (r) => r.length > 1 ? r.substring(0, 1) : "");
}

function ValidateSeconds() {
  second.value = second.value.replace(/[a-z]|[A-Z]|[6-9]\d|[^\w\u4E00-\u9FA5]/g, (r) => r.length > 1 ? r.substring(0, 1) : "");
}
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 800px;
}

.countdown_timer_input .el-input__wrapper {
  .el-input__inner {
    height: 100%;
    text-align: center;
  }
}

.demo-date-picker {
  .el-tooltip__trigger {
    width: 100%;
  }
}

.countdown_time .countdown_timer_input {
  width: 120px;
  height: 120px;
  font-size: 60px;
  font-weight: 600;
  text-align: center;
  margin: 10px 20px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #888;
  border: 1px solid #ced4da;
}

.countdown_time .countdown_badge {
  display: block;
  margin: 25px auto 10px;
  width: 180px;
  color: #fff;
  background-color: #6c757d;
}

.try8-input {
  border: 1px solid #ced4da;
  font-size: 13px;
  height: auto;
}

.input-group-text {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: center;
  white-space: nowrap;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.input-group-prepend {
  display: -ms-flexbox;
  display: flex;
  height: 100%;
}

.input-group-prepend {
  .el-input {
    height: 100%;
    width: 100%;
  }
}

.el-card__body {
  background-color: rgb(233, 236, 239);
  height: 100%;
}

.map-label {
  line-height: 60px;
  font-size: 24px;
  margin: 0;
  color: #4e7cad;
  font-family: monospace;
}

</style>