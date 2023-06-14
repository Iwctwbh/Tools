<template>
  <h1 class="title">
    Time Stamp
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
        <el-row :gutter="20">
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
                style="margin-top: 20px;">
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

          <el-col :lg="12">
            <div class="demo-date-picker">
              <el-date-picker
                v-model="datatimeValue"
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
          <el-col>
            <div class="jumbotron text-center countdown_time"
                 style="text-align: center">
              <div class="container">
                <label for="hour">时:</label>
                <el-input id="hour"
                          v-model="hour"
                          class="try8-input countdown_timer_input">
                </el-input>
                <label for="minute">分:</label>
                <el-input id="minute"
                          v-model="minute"
                          class="try8-input countdown_timer_input">
                </el-input>
                <label for="second">秒:</label>
                <el-input id="second"
                          v-model="second"
                          class="try8-input countdown_timer_input">

                </el-input>
                <!--                  <br>-->
                <!--                  <span class="badge badge-secondary countdown_badge">共计：0</span>-->
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
              @click="btnStarttiming">
              开始计时
            </el-button>
          </el-col>

          <el-col :lg="11">
            <el-button
              style=""
              size="large"
              type="primary"
              @click="btnSuspend">
              暂停
            </el-button>
          </el-col>

          <el-col :lg="2">
            <el-button
              style=""
              size="large"
              type="primary"
              @click="btnTimeEmpty">
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
        </el-card>
      </el-space>
    </el-col>
  </el-row>
</template>

<script lang='ts' setup>
import {ref} from "vue";
import moment, {months} from "moment";
import {formatTime} from "element-plus/es/components/countdown/src/utils";

const textareaIn0 = ref<number>();
const textareaIn1 = ref<string>("");
const second = ref<string>("00");
const minute = ref<string>("00");
const hour = ref<string>("00");
const datatimeValue = ref('')
let timer: any = null
const btnTimeStamp = (): void => {
  if (textareaIn0.value != null) {
    let timestamp: number = textareaIn0.value;
    const data = moment(moment.unix(timestamp).utc()).format('YYYY-MM-DD HH:mm:ss');
    textareaIn1.value = data;
  } else {
    textareaIn1.value = "时间戳类型错误！";
  }
};
const btnTime = (): void => {
  let timestampIn1 = datatimeValue.value
  debugger
  const data = moment(timestampIn1).unix().toString();
  textareaIn1.value = "";
  textareaIn1.value = data;
};
const btnEmpty = (): void => {

};

const value1 = ref(new Date(2016, 9, 10, 18, 30))

const makeRange = (start: number, end: number) => {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}
let featureTime: any;
const btnStarttiming = (): void => {
  debugger
  let datehourTime: number;
  let dateminuteTime: number;
  let datesecondTime: number;
  let h;
  let m;
  let s;
  let count: number;
  let dataTime = hour.value + ":" + minute.value + ":" + second.value;

  datehourTime = moment.duration(dataTime).hours();
  dateminuteTime = moment.duration(dataTime).minutes();
  datesecondTime = moment.duration(dataTime).seconds();
  h = parseInt(String(datehourTime * 3600));
  m = parseInt(String(dateminuteTime * 60));
  s = datesecondTime
  count = h + m + s;
  featureTime = moment().add(count, "seconds")
  timer = setInterval(() => {
      // var aa: number = count -= 1
      // featureTime = moment().add(aa,"seconds").format("HH:mm:ss");
      debugger
      moment().diff(featureTime)
      hour.value = featureTime.diff(moment(), 'hour')
      minute.value = featureTime.diff(moment().add(hour.value, 'hour'), 'minutes')
      second.value = featureTime.diff(moment().add(featureTime.diff(moment(), 'minutes'), 'minutes'), 'seconds')
      if (hour.value == "0" && minute.value == "0" && second.value == "0") {
        clearTimeout(timer);
        alert("时间到了，请刷新！！！")
      }
    },
    1000);
}
const btnTimeEmpty = (): void => {
  clearTimeout(timer);
  hour.value = "00"
  minute.value = "00"
  second.value = "00"
};

const btnSuspend = (): void => {
  clearTimeout(timer);
  alert("倒计时暂停！！！")
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 800px
}

.el_input_readonly {
  .el-input__wrapper {
    background-color: #e9ecef;
  }
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

.countdown_time {
  padding: 50px 0 20px;
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
</style>