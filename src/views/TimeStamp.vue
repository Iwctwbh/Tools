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
                  v-on:input="Validatehours"
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
              :disabled="btnTimeClickdisabled"
              @click="btnStarttiming"
            >
              开始计时
            </el-button>
          </el-col>

          <el-col :lg="11">
            <el-button
              style=""
              size="large"
              type="primary"
              :disabled="btnSuspenddisabled"
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
                  v-model="Starttimevalue"
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
                  v-model="Starttimestamp"
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
                  v-model="Endtimevalue"
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
                  v-model="Endtimestampvalue"
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
                @click="btnStartcalculationtime"
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
                  v-model="Timepvalue"
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
                  v-model="Stampvalue"
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
                  <span style="left: 50.4213%; top: 26.3889%;"></span><span
                  style="left: 65.3611%; top: 35.9444%;"></span><span
                  style="left: 69.2222%; top: 30.8241%;"></span><span
                  style="left: 55.5093%; top: 27.0371%;"></span><span
                  style="left: 62.3611%; top: 27.6759%;"></span><span
                  style="left: 80.6991%; top: 86.5093%;"></span><span
                  style="left: 71.6574%; top: 87.4537%;"></span><span
                  style="left: 67.4676%; top: 86.8889%;"></span><span style="left: 32.25%; top: 85.1111%;"></span><span
                  style="left: 31.1481%; top: 86.9074%;"></span><span
                  style="left: 50.7042%; top: 89.9937%;"></span><span
                  style="left: 34.0139%; top: 68.5556%;"></span><span style="left: 32.2731%; top: 67%;"></span><span
                  style="left: 32.0602%; top: 62.8982%;"></span><span
                  style="left: 32.0278%; top: 63.2315%;"></span><span
                  style="left: 32.0046%; top: 63.9907%;"></span><span style="left: 32.162%; top: 65.2963%;"></span><span
                  style="left: 31.9028%; top: 65.8704%;"></span><span
                  style="left: 31.2546%; top: 66.9259%;"></span><span style="left: 31.338%; top: 67.2871%;"></span><span
                  style="left: 31.7639%; top: 68.1574%;"></span><span
                  style="left: 30.8935%; top: 77.9815%;"></span><span
                  style="left: 31.1944%; top: 79.5556%;"></span><span
                  style="left: 2.97222%; top: 57.6296%;"></span><span style="left: 54.537%; top: 23.2129%;"></span><span
                  style="left: 94.1898%; top: 66.9167%;"></span><span
                  style="left: 94.1528%; top: 79.7222%;"></span><span
                  style="left: 90.9213%; top: 72.8426%;"></span><span
                  style="left: 90.2685%; top: 70.1018%;"></span><span
                  style="left: 92.0046%; top: 67.8518%;"></span><span
                  style="left: 89.2917%; top: 66.6944%;"></span><span
                  style="left: 92.5092%; top: 64.7407%;"></span><span
                  style="left: 91.3889%; top: 60.9629%;"></span><span
                  style="left: 88.4954%; top: 68.3796%;"></span><span
                  style="left: 86.3426%; top: 56.4074%;"></span><span
                  style="left: 82.1806%; top: 66.6944%;"></span><span
                  style="left: 85.7963%; top: 66.8241%;"></span><span
                  style="left: 63.8472%; top: 27.5648%;"></span><span
                  style="left: 33.7824%; top: 42.7222%;"></span><span
                  style="left: 75.1157%; top: 36.8241%;"></span><span
                  style="left: 51.2037%; top: 21.7593%;"></span><span
                  style="left: 56.4769%; top: 26.2871%;"></span><span
                  style="left: 32.4352%; top: 32.0648%;"></span><span
                  style="left: 31.1528%; top: 58.6111%;"></span><span
                  style="left: 41.2269%; top: 51.1944%;"></span><span
                  style="left: 36.8009%; top: 50.3056%;"></span><span
                  style="left: 39.5833%; top: 51.2685%;"></span><span
                  style="left: 40.8056%; top: 54.4167%;"></span><span
                  style="left: 36.7222%; top: 53.7778%;"></span><span
                  style="left: 40.4769%; top: 54.6296%;"></span><span style="left: 39.588%; top: 56.1204%;"></span><span
                  style="left: 37.3935%; top: 62.4815%;"></span><span
                  style="left: 35.1713%; top: 60.8611%;"></span><span
                  style="left: 34.4676%; top: 58.0093%;"></span><span
                  style="left: 35.2408%; top: 50.8704%;"></span><span style="left: 32.75%; top: 54.0185%;"></span><span
                  style="left: 33.5185%; top: 48.4352%;"></span><span style="left: 33.338%; top: 51.5926%;"></span><span
                  style="left: 31.0741%; top: 52.9629%;"></span><span
                  style="left: 31.6111%; top: 54.4629%;"></span><span
                  style="left: 74.9028%; top: 34.7407%;"></span><span
                  style="left: 57.6574%; top: 20.0556%;"></span><span
                  style="left: 25.6111%; top: 40.2778%;"></span><span
                  style="left: 35.7546%; top: 23.5741%;"></span><span
                  style="left: 32.6667%; top: 25.1944%;"></span><span style="left: 33.875%; top: 24.3333%;"></span><span
                  style="left: 32.4398%; top: 24.3889%;"></span><span
                  style="left: 33.4491%; top: 20.3704%;"></span><span style="left: 28.162%; top: 25.75%;"></span><span
                  style="left: 31.2408%; top: 14.5926%;"></span><span
                  style="left: 23.0972%; top: 22.2871%;"></span><span
                  style="left: 24.1192%; top: 8.50244%;"></span><span
                  style="left: 24.4675%; top: 15.1018%;"></span><span style="left: 21.2917%; top: 22%;"></span><span
                  style="left: 20.5092%; top: 22.0648%;"></span><span style="left: 18.7408%; top: 20.25%;"></span><span
                  style="left: 20.848%; top: 11.6034%;"></span><span style="left: 13.2546%; top: 12.0279%;"></span><span
                  style="left: 16.7315%; top: 19.0185%;"></span><span
                  style="left: 16.3056%; top: 17.3333%;"></span><span
                  style="left: 12.5139%; top: 16.2685%;"></span><span
                  style="left: 11.5046%; top: 14.4074%;"></span><span
                  style="left: 15.8657%; top: 22.6296%;"></span><span
                  style="left: 52.3704%; top: 23.6759%;"></span><span
                  style="left: 48.8981%; top: 47.0463%;"></span><span
                  style="left: 6.04631%; top: 61.5371%;"></span><span
                  style="left: 30.7407%; top: 68.0833%;"></span><span
                  style="left: 30.8102%; top: 79.3611%;"></span><span
                  style="left: 19.8426%; top: 64.9167%;"></span><span
                  style="left: 83.7407%; top: 32.6482%;"></span><span
                  style="left: 74.3287%; top: 25.6667%;"></span><span
                  style="left: 29.4676%; top: 47.4444%;"></span><span
                  style="left: 26.6898%; top: 44.4815%;"></span><span
                  style="left: 27.3241%; top: 37.1482%;"></span><span
                  style="left: 43.7546%; top: 41.7129%;"></span><span
                  style="left: 59.2685%; top: 30.4629%;"></span><span
                  style="left: 59.4306%; top: 30.4907%;"></span><span
                  style="left: 54.0092%; top: 22.1759%;"></span><span style="left: 53.713%; top: 20.8333%;"></span><span
                  style="left: 31.0833%; top: 39.7407%;"></span><span
                  style="left: 50.8472%; top: 29.5648%;"></span><span style="left: 28.287%; top: 51.0185%;"></span><span
                  style="left: 25.4444%; top: 49.5%;"></span><span style="left: 56.875%; top: 16.9907%;"></span><span
                  style="left: 58.6806%; top: 33.3056%;"></span><span
                  style="left: 46.4444%; top: 34.9167%;"></span><span
                  style="left: 49.3565%; top: 27.5556%;"></span><span
                  style="left: 48.6991%; top: 30.0648%;"></span><span
                  style="left: 45.9444%; top: 34.3889%;"></span><span
                  style="left: 56.9352%; top: 16.5741%;"></span><span
                  style="left: 99.5602%; top: 59.9259%;"></span><span
                  style="left: 34.4028%; top: 77.9444%;"></span><span
                  style="left: 95.2731%; top: 47.0463%;"></span><span
                  style="left: 48.5463%; top: 15.5463%;"></span><span
                  style="left: 50.6481%; top: 22.8518%;"></span><span
                  style="left: 50.0348%; top: 21.3843%;"></span><span
                  style="left: 62.4491%; top: 26.8241%;"></span><span
                  style="left: 35.6481%; top: 47.2593%;"></span><span
                  style="left: 48.7083%; top: 29.9259%;"></span><span style="left: 36.037%; top: 14.3426%;"></span><span
                  style="left: 45.1852%; top: 7.35183%;"></span><span
                  style="left: 44.4352%; top: 10.8426%;"></span><span
                  style="left: 31.3287%; top: 7.46294%;"></span><span style="left: 56.588%; top: 28.9074%;"></span><span
                  style="left: 40.1481%; top: 79.8518%;"></span><span
                  style="left: 25.1435%; top: 41.8704%;"></span><span
                  style="left: 90.2083%; top: 42.5185%;"></span><span
                  style="left: 45.9954%; top: 43.4167%;"></span><span
                  style="left: 33.9352%; top: 46.2222%;"></span><span
                  style="left: 81.7083%; top: 37.6204%;"></span><span
                  style="left: 25.8935%; top: 42.1667%;"></span><span
                  style="left: 30.0926%; top: 39.7037%;"></span><span
                  style="left: 55.3009%; top: 23.6111%;"></span><span
                  style="left: 79.6667%; top: 53.2407%;"></span><span
                  style="left: 80.3704%; top: 49.9815%;"></span><span
                  style="left: 83.1667%; top: 52.7129%;"></span><span
                  style="left: 89.0833%; top: 50.8148%;"></span><span
                  style="left: 48.4028%; top: 20.3704%;"></span><span
                  style="left: 59.7844%; top: 32.3441%;"></span><span
                  style="left: 74.5463%; top: 37.4815%;"></span><span
                  style="left: 70.1158%; top: 53.7037%;"></span><span style="left: 62.338%; top: 31.4722%;"></span><span
                  style="left: 64.287%; top: 30.1852%;"></span><span style="left: 53.4676%; top: 26.7222%;"></span><span
                  style="left: 29.1093%; top: 40.0177%;"></span><span style="left: 59.9815%; top: 32.25%;"></span><span
                  style="left: 88.818%; top: 30.192%;"></span><span style="left: 60.2269%; top: 50.3982%;"></span><span
                  style="left: 70.7222%; top: 26.1667%;"></span><span
                  style="left: 98.0556%; top: 49.2129%;"></span><span
                  style="left: 2.69908%; top: 50.6759%;"></span><span
                  style="left: 6.48147%; top: 48.9629%;"></span><span
                  style="left: 84.9306%; top: 28.3241%;"></span><span
                  style="left: 85.2685%; top: 29.1389%;"></span><span style="left: 71.375%; top: 25.9722%;"></span><span
                  style="left: 68.1852%; top: 25.1111%;"></span><span
                  style="left: 67.6713%; top: 20.4444%;"></span><span
                  style="left: 65.8796%; top: 22.0648%;"></span><span style="left: 63.963%; top: 25.2685%;"></span><span
                  style="left: 64.4259%; top: 23.8241%;"></span><span
                  style="left: 64.2639%; top: 21.5463%;"></span><span
                  style="left: 59.8611%; top: 31.1759%;"></span><span
                  style="left: 72.1806%; top: 46.1482%;"></span><span style="left: 47.4398%; top: 46.5%;"></span><span
                  style="left: 57.0324%; top: 19.6204%;"></span><span
                  style="left: 56.6944%; top: 18.3611%;"></span><span style="left: 53.662%; top: 31.7222%;"></span><span
                  style="left: 48.2176%; top: 31.3056%;"></span><span
                  style="left: 58.0093%; top: 23.8889%;"></span><span
                  style="left: 96.4815%; top: 44.9537%;"></span><span style="left: 76.713%; top: 40.6759%;"></span><span
                  style="left: 79.6898%; top: 23.3796%;"></span><span
                  style="left: 75.4583%; top: 23.3241%;"></span><span
                  style="left: 81.8056%; top: 23.2963%;"></span><span
                  style="left: 81.5394%; top: 37.6682%;"></span><span
                  style="left: 33.0787%; top: 41.8889%;"></span><span
                  style="left: 54.0324%; top: 30.0556%;"></span><span
                  style="left: 65.9722%; top: 61.0185%;"></span><span
                  style="left: 70.4167%; top: 47.6852%;"></span><span
                  style="left: 22.5417%; top: 39.2222%;"></span><span
                  style="left: 26.3241%; top: 38.2871%;"></span><span
                  style="left: 25.4491%; top: 38.3518%;"></span><span
                  style="left: 22.3102%; top: 35.7407%;"></span><span
                  style="left: 23.1944%; top: 35.6482%;"></span><span
                  style="left: 20.5787%; top: 34.0926%;"></span><span
                  style="left: 20.6898%; top: 32.3704%;"></span><span
                  style="left: 21.2269%; top: 33.5741%;"></span><span
                  style="left: 20.6713%; top: 37.1018%;"></span><span
                  style="left: 20.9028%; top: 38.4444%;"></span><span style="left: 19.713%; top: 33.8518%;"></span><span
                  style="left: 17.5046%; top: 31.9259%;"></span><span
                  style="left: 80.6481%; top: 49.1389%;"></span><span
                  style="left: 59.0509%; top: 63.3518%;"></span><span style="left: 54.75%; top: 61.9074%;"></span><span
                  style="left: 96.2361%; top: 62.0741%;"></span><span
                  style="left: 96.6574%; top: 66.0833%;"></span><span
                  style="left: 50.9444%; top: 46.4167%;"></span><span style="left: 26.1898%; top: 43.25%;"></span><span
                  style="left: 73.6991%; top: 34.6018%;"></span><span
                  style="left: 96.3657%; top: 49.7129%;"></span><span
                  style="left: 3.31019%; top: 60.5463%;"></span><span
                  style="left: 98.5463%; top: 69.5185%;"></span><span
                  style="left: 1.26389%; top: 73.3611%;"></span><span
                  style="left: 28.2037%; top: 45.0185%;"></span><span style="left: 28.625%; top: 56.6389%;"></span><span
                  style="left: 8.76853%; top: 59.1482%;"></span><span style="left: 11.5278%; top: 55%;"></span><span
                  style="left: 13.0417%; top: 62.7037%;"></span><span
                  style="left: 90.8796%; top: 54.7222%;"></span><span style="left: 93.213%; top: 53.2129%;"></span><span
                  style="left: 83.6111%; top: 41.8982%;"></span><span style="left: 68.625%; top: 36.1852%;"></span><span
                  style="left: 55.8333%; top: 20.9722%;"></span><span style="left: 34.537%; top: 23.8611%;"></span><span
                  style="left: 13.912%; top: 63.8518%;"></span><span style="left: 31.6961%; top: 39.7398%;"></span><span
                  style="left: 59.5741%; top: 32.5%;"></span><span style="left: 59.7486%; top: 32.4815%;"></span><span
                  style="left: 47.537%; top: 28.4907%;"></span><span style="left: 45.8056%; top: 31.8704%;"></span><span
                  style="left: 43.2407%; top: 29.0371%;"></span><span
                  style="left: 87.3565%; top: 45.9259%;"></span><span
                  style="left: 34.3519%; top: 63.7407%;"></span><span
                  style="left: 64.3148%; top: 35.9537%;"></span><span style="left: 57.25%; top: 25.3148%;"></span><span
                  style="left: 55.6944%; top: 25.0926%;"></span><span
                  style="left: 55.6944%; top: 19.6018%;"></span><span
                  style="left: 60.4494%; top: 19.0246%;"></span><span
                  style="left: 59.4722%; top: 25.0278%;"></span><span
                  style="left: 63.7917%; top: 17.4444%;"></span><span style="left: 62.338%; top: 22.9259%;"></span><span
                  style="left: 63.3472%; top: 24.25%;"></span><span style="left: 62.787%; top: 21.3518%;"></span><span
                  style="left: 63.4444%; top: 19.8148%;"></span><span
                  style="left: 63.9306%; top: 20.4444%;"></span><span
                  style="left: 66.8333%; top: 18.4167%;"></span><span
                  style="left: 70.3889%; top: 19.4444%;"></span><span
                  style="left: 73.0324%; top: 19.4259%;"></span><span
                  style="left: 73.2639%; top: 20.3518%;"></span><span
                  style="left: 73.6019%; top: 18.6111%;"></span><span
                  style="left: 74.1991%; top: 20.1389%;"></span><span style="left: 75.787%; top: 18.8796%;"></span><span
                  style="left: 78.9815%; top: 20.9629%;"></span><span
                  style="left: 81.5185%; top: 21.0833%;"></span><span
                  style="left: 86.0185%; top: 15.5556%;"></span><span
                  style="left: 87.6539%; top: 15.1909%;"></span><span
                  style="left: 86.6481%; top: 26.0185%;"></span><span
                  style="left: 89.7852%; top: 14.1332%;"></span><span
                  style="left: 91.8889%; top: 16.9074%;"></span><span
                  style="left: 89.6389%; top: 23.9074%;"></span><span
                  style="left: 92.6991%; top: 12.5185%;"></span><span
                  style="left: 94.0694%; top: 20.5463%;"></span><span
                  style="left: 99.3009%; top: 14.0278%;"></span><span
                  style="left: 62.9769%; top: 36.3148%;"></span><span style="left: 94.5%; top: 54.7037%;"></span><span
                  style="left: 59.037%; top: 41.3333%;"></span><span style="left: 78.8472%; top: 49.2871%;"></span><span
                  style="left: 34.7685%; top: 46.7593%;"></span><span
                  style="left: 58.7824%; top: 47.3056%;"></span><span
                  style="left: 51.8704%; top: 49.8148%;"></span><span
                  style="left: 25.3333%; top: 42.3889%;"></span><span
                  style="left: 60.0833%; top: 31.3889%;"></span><span
                  style="left: 30.3148%; top: 38.0741%;"></span><span
                  style="left: 54.1806%; top: 43.2685%;"></span><span
                  style="left: 77.9213%; top: 42.3611%;"></span><span
                  style="left: 69.1111%; top: 28.5648%;"></span><span
                  style="left: 2.56481%; top: 54.7963%;"></span><span
                  style="left: 84.8843%; top: 54.1389%;"></span><span
                  style="left: 66.2176%; top: 28.9167%;"></span><span
                  style="left: 52.8287%; top: 29.5556%;"></span><span
                  style="left: 1.44444%; top: 61.5926%;"></span><span
                  style="left: 58.0463%; top: 27.2129%;"></span><span style="left: 83.75%; top: 36.0833%;"></span><span
                  style="left: 58.4769%; top: 21.9815%;"></span><span style="left: 29.4462%; top: 27.381%;"></span><span
                  style="left: 26.9572%; top: 26.4826%;"></span><span
                  style="left: 26.5998%; top: 28.7477%;"></span><span
                  style="left: 26.9026%; top: 29.5391%;"></span><span style="left: 26.155%; top: 27.9065%;"></span><span
                  style="left: 25.9802%; top: 28.5127%;"></span><span
                  style="left: 26.2786%; top: 27.1937%;"></span><span
                  style="left: 26.2069%; top: 28.6802%;"></span><span
                  style="left: 25.9107%; top: 28.6156%;"></span><span
                  style="left: 26.4076%; top: 28.4734%;"></span><span style="left: 26.0139%; top: 26.75%;"></span><span
                  style="left: 26.3226%; top: 28.9149%;"></span><span
                  style="left: 26.2847%; top: 27.0579%;"></span><span
                  style="left: 26.0039%; top: 24.9401%;"></span><span
                  style="left: 22.0276%; top: 23.8242%;"></span><span style="left: 22.0586%; top: 23.975%;"></span><span
                  style="left: 22.1605%; top: 23.7421%;"></span><span
                  style="left: 21.3845%; top: 27.9227%;"></span><span style="left: 17.834%; top: 25.7702%;"></span><span
                  style="left: 18.9093%; top: 31.4176%;"></span><span
                  style="left: 17.2897%; top: 31.0821%;"></span><span
                  style="left: 8.86119%; top: 15.9899%;"></span><span
                  style="left: 12.8944%; top: 17.6101%;"></span><span
                  style="left: 12.5839%; top: 18.2353%;"></span><span
                  style="left: 13.7712%; top: 19.3739%;"></span><span
                  style="left: 11.5909%; top: 16.9184%;"></span><span
                  style="left: 4.27956%; top: 14.1661%;"></span><span
                  style="left: 1.29392%; top: 21.1778%;"></span><span
                  style="left: 6.62731%; top: 38.1628%;"></span><span
                  style="left: 34.5035%; top: 68.3838%;"></span><span
                  style="left: 68.5556%; top: 27.9629%;"></span><span style="left: 69.25%; top: 27.0371%;"></span><span
                  style="left: 31.9259%; top: 44.1667%;"></span><span
                  style="left: 79.6296%; top: 44.0278%;"></span><span
                  style="left: 96.7824%; top: 59.0741%;"></span><span
                  style="left: 2.70369%; top: 56.7593%;"></span><span
                  style="left: 57.7778%; top: 64.3056%;"></span><span
                  style="left: 33.2778%; top: 40.5278%;"></span><span
                  style="left: 32.5185%; top: 39.8889%;"></span><span style="left: 53.6759%; top: 54%;"></span><span
                  style="left: 96.2778%; top: 92.3148%;"></span><span
                  style="left: 88.8935%; top: 86.2963%;"></span><span
                  style="left: 60.9972%; top: 88.3299%;"></span><span
                  style="left: 79.6944%; top: 93.1111%;"></span><span
                  style="left: 31.1019%; top: 43.0556%;"></span><span
                  style="left: 55.5417%; top: 16.6111%;"></span><span
                  style="left: 55.1157%; top: 25.6296%;"></span><span
                  style="left: 49.8657%; top: 43.1296%;"></span><span
                  style="left: 64.0509%; top: 35.3426%;"></span><span
                  style="left: 58.1574%; top: 51.4537%;"></span><span
                  style="left: 50.7269%; top: 46.3982%;"></span><span
                  style="left: 33.0139%; top: 40.0648%;"></span><span
                  style="left: 81.9213%; top: 47.2593%;"></span><span style="left: 31.188%; top: 43.2496%;"></span><span
                  style="left: 28.7083%; top: 36.0648%;"></span><span
                  style="left: 57.1991%; top: 62.9722%;"></span><span
                  style="left: 34.1991%; top: 21.4352%;"></span><span
                  style="left: 24.8949%; top: 22.9119%;"></span><span
                  style="left: 17.9213%; top: 22.7222%;"></span><span
                  style="left: 76.9213%; top: 56.5741%;"></span><span style="left: 54.25%; top: 52.0556%;"></span><span
                  style="left: 57.6296%; top: 55.7407%;"></span><span style="left: 55.162%; top: 47.5741%;"></span><span
                  style="left: 54.2454%; top: 52.0741%;"></span><span style="left: 52.6944%; top: 47.75%;"></span><span
                  style="left: 30.8333%; top: 43.2315%;"></span><span
                  style="left: 79.3658%; top: 55.3241%;"></span><span style="left: 52.412%; top: 23.5%;"></span><span
                  style="left: 61.9861%; top: 43.5556%;"></span><span
                  style="left: 53.4954%; top: 19.0741%;"></span><span style="left: 33.1667%; top: 41.5%;"></span><span
                  style="left: 60.8009%; top: 41.4815%;"></span><span style="left: 60.75%; top: 44.9815%;"></span><span
                  style="left: 92.162%; top: 45.8796%;"></span><span style="left: 93.9491%; top: 46.1296%;"></span><span
                  style="left: 52.625%; top: 49.7871%;"></span><span style="left: 33.2639%; top: 43.3056%;"></span><span
                  style="left: 49.5934%; top: 22.5252%;"></span><span
                  style="left: 50.0602%; top: 46.9167%;"></span><span
                  style="left: 45.7361%; top: 42.5185%;"></span><span style="left: 46.588%; top: 44.7129%;"></span><span
                  style="left: 33.2037%; top: 40.9815%;"></span><span
                  style="left: 52.4398%; top: 47.9167%;"></span><span
                  style="left: 54.4352%; top: 24.5556%;"></span><span
                  style="left: 49.0185%; top: 19.9167%;"></span><span
                  style="left: 44.4028%; top: 14.3611%;"></span><span
                  style="left: 49.4741%; top: 22.6758%;"></span><span
                  style="left: 79.1435%; top: 43.5833%;"></span><span
                  style="left: 62.0185%; top: 55.7315%;"></span><span
                  style="left: 32.9769%; top: 40.3889%;"></span><span
                  style="left: 63.3287%; top: 33.7037%;"></span><span
                  style="left: 27.6065%; top: 39.2778%;"></span><span style="left: 78.5%; top: 40.0185%;"></span><span
                  style="left: 33.0556%; top: 42.2129%;"></span><span
                  style="left: 52.6435%; top: 23.8056%;"></span><span
                  style="left: 57.6389%; top: 65.8518%;"></span><span
                  style="left: 51.7083%; top: 22.4444%;"></span><span
                  style="left: 52.0509%; top: 25.7222%;"></span><span
                  style="left: 55.3519%; top: 26.4259%;"></span><span
                  style="left: 32.5231%; top: 39.9629%;"></span><span
                  style="left: 63.1991%; top: 59.4907%;"></span><span
                  style="left: 97.5556%; top: 46.0278%;"></span><span
                  style="left: 55.9537%; top: 26.6759%;"></span><span
                  style="left: 47.7778%; top: 42.9722%;"></span><span
                  style="left: 90.4861%; top: 41.5556%;"></span><span
                  style="left: 46.0972%; top: 39.9444%;"></span><span style="left: 32.838%; top: 40.7129%;"></span><span
                  style="left: 59.7222%; top: 57.8982%;"></span><span style="left: 78.25%; top: 48.2407%;"></span><span
                  style="left: 50.588%; top: 42.4907%;"></span><span style="left: 51.3611%; top: 20.9074%;"></span><span
                  style="left: 52.9861%; top: 16.7129%;"></span><span
                  style="left: 66.2731%; top: 36.8889%;"></span><span
                  style="left: 65.4074%; top: 60.6296%;"></span><span
                  style="left: 58.3519%; top: 50.0278%;"></span><span
                  style="left: 65.4074%; top: 51.8518%;"></span><span
                  style="left: 55.0139%; top: 17.0371%;"></span><span
                  style="left: 48.8056%; top: 57.8241%;"></span><span
                  style="left: 54.0324%; top: 24.4167%;"></span><span
                  style="left: 54.4444%; top: 6.66667%;"></span><span style="left: 54.7546%; top: 23.25%;"></span><span
                  style="left: 46.4583%; top: 45.2778%;"></span><span style="left: 53.463%; top: 25.6018%;"></span><span
                  style="left: 45.3981%; top: 41.8518%;"></span><span
                  style="left: 62.6019%; top: 48.8518%;"></span><span
                  style="left: 32.5131%; top: 39.9714%;"></span><span
                  style="left: 58.6389%; top: 64.2778%;"></span><span
                  style="left: 69.5049%; top: 77.0262%;"></span><span style="left: 50.338%; top: 46.5926%;"></span><span
                  style="left: 33.1991%; top: 44.0833%;"></span><span
                  style="left: 99.7824%; top: 54.1574%;"></span><span style="left: 60.912%; top: 52.8889%;"></span><span
                  style="left: 59.0046%; top: 49.8241%;"></span><span
                  style="left: 0.935194%; top: 34.3241%;"></span><span
                  style="left: 96.2824%; top: 39.2871%;"></span><span style="left: 53.4592%; top: 26.721%;"></span><span
                  style="left: 33.1204%; top: 42.6944%;"></span><span style="left: 32.3935%; top: 39.75%;"></span><span
                  style="left: 32.4815%; top: 39.8056%;"></span><span
                  style="left: 1.15742%; top: 57.0556%;"></span><span
                  style="left: 62.5556%; top: 42.9167%;"></span><span
                  style="left: 62.5648%; top: 56.2315%;"></span><span
                  style="left: 57.8565%; top: 58.1018%;"></span><span style="left: 58.625%; top: 58.9815%;"></span>
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

import moment from 'moment-timezone';

const textareaIn0 = ref<number>();
const Timestampvalue = ref<number>();
const textareaIn1 = ref<string>("");
const second = ref<string>("00");
const minute = ref<string>("00");
const hour = ref<string>("00");
const datatimeValue = ref('')
const Starttimevalue = ref('')
const Starttimestamp = ref('')
const Timepvalue = ref('')
const Stampvalue = ref('')
const Endtimevalue = ref('')
const Endtimestampvalue = ref('')
const timeValue = ref('')
const btnTimeClickdisabled = ref<boolean>(false)
const btnSuspenddisabled = ref<boolean>(true)
let timer: any = null

moment().tz("America/Los_Angeles").format();

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
  const data = moment(timestampIn1).unix().toString();
  textareaIn1.value = "";
  textareaIn1.value = data;
};
const btnEmpty = (): void => {

};

let featureTime: any;
const btnStarttiming = (): void => {
  if (!btnTimeClickdisabled.value) {
    btnTimeClickdisabled.value = true;
  }
  if (btnSuspenddisabled.value) {
    btnSuspenddisabled.value = false
  }
  let datehourTime: number;
  let dateminuteTime: number;
  let datesecondTime: number;
  let h;
  let m;
  let s;
  let count: number;
  let dataTime;
  let timevalueinfo = moment(timeValue.value).format('HH:mm:ss');
  debugger
  if (timevalueinfo == '' || timevalueinfo == "Invalid date") {
    dataTime = hour.value + ":" + minute.value + ":" + second.value;
  } else {
    dataTime = timevalueinfo;
  }
  datehourTime = moment.duration(dataTime).hours();
  dateminuteTime = moment.duration(dataTime).minutes();
  datesecondTime = moment.duration(dataTime).seconds();
  h = parseInt(String(datehourTime * 3600));
  m = parseInt(String(dateminuteTime * 60));
  s = datesecondTime
  count = h + m + s;
  featureTime = moment().add(count, "seconds")
  timer = setInterval(() => {
      hour.value = featureTime.diff(moment(), 'hour')
      minute.value = featureTime.diff(moment().add(hour.value, 'hour'), 'minutes')
      second.value = featureTime.diff(moment().add(featureTime.diff(moment(), 'minutes'), 'minutes'), 'seconds')
      if (hour.value == "0" && minute.value == "0" && second.value == "0") {
        clearTimeout(timer);
        alert("倒计时结束 !!!")
        window.location.reload();
      }
    },
    100);
}
const btnTimeEmpty = (): void => {
  clearTimeout(timer);
  hour.value = "00";
  minute.value = "00";
  second.value = "00";
  timeValue.value = ""
};

const btnSuspend = (): void => {
  if (btnTimeClickdisabled.value) {
    btnTimeClickdisabled.value = false;
  }
  if (!btnSuspenddisabled.value) {
    btnSuspenddisabled.value = true;
  }
  clearTimeout(timer);
  alert("倒计时暂停！！！")
};

const btnStartcalculationtime = (): void => {
  debugger
  let startdata = moment(Starttimevalue.value).format('YYYY-MM-DD').split("-");
  let enddata = moment(Endtimevalue.value).format('YYYY-MM-DD').split("-");
  let startdataobj = new Date(Number(startdata[0]), (Number(startdata[1]) - 1), Number(startdata[2]));
  let enddataobj = new Date(Number(enddata[0]), (Number(enddata[1]) - 1), Number(enddata[2]));

  let t1 = startdataobj.getTime();
  let t2 = enddataobj.getTime();
  let dataTime = 1000 * 60 * 60 * 24;
  let minusDays = Math.floor(((t2 - t1) / dataTime));
  let days = Math.abs(minusDays)
  let timedays;

  let starthoursTime = moment.duration(moment(Starttimevalue.value).format('HH:mm:ss')).hours();
  let startminutesTime = moment.duration(moment(Starttimevalue.value).format('HH:mm:ss')).minutes();
  let startsecondsTime = moment.duration(moment(Starttimevalue.value).format('HH:mm:ss')).seconds();
  let endhoursTime = moment.duration(moment(Endtimevalue.value).format('HH:mm:ss')).hours();
  let endminutesTime = moment.duration(moment(Endtimevalue.value).format('HH:mm:ss')).minutes();
  let endsecondsTime = moment.duration(moment(Endtimevalue.value).format('HH:mm:ss')).seconds();

  let hours = starthoursTime - endhoursTime == 0 ? "00" : starthoursTime - endhoursTime;
  let minutes = startminutesTime - endminutesTime == 0 ? "00" : startminutesTime - endminutesTime;
  let seconds = startsecondsTime - endsecondsTime == 0 ? "00" : startsecondsTime - endsecondsTime;

  if (days == 0) {
    timedays = "0000-00-00 "
  }
  let datatimevalue = timedays + hours.toString() + ":" + minutes + ":" + seconds.toString().replace("-", "");
  Timepvalue.value = datatimevalue
  Stampvalue.value = moment(datatimevalue).unix().toString();
  // let starttimestamp: number = _.toNumber(Starttimestamp.value);
  // Timepvalue.value = moment(moment.unix(starttimestamp - _.toNumber(Endtimestampvalue.value)).utc()).format('YYYY-MM-DD HH:mm:ss');
  // Stampvalue.value = moment(Timepvalue.value).unix().toString();

};

function StartTimeFillValue() {
  Starttimestamp.value = moment(Starttimevalue.value).unix().toString();
}

function StartTimestampValue() {
  debugger
  let starttimestamp: number = _.toNumber(Starttimestamp.value);
  Starttimevalue.value = moment(moment.unix(starttimestamp).utc()).format('YYYY-MM-DD HH:mm:ss');

}

function EndTimeFillValue() {
  Endtimestampvalue.value = moment(Endtimevalue.value).unix().toString();
}

function EndTimestampValue() {
  debugger
  let endtimestampvalue: number = _.toNumber(Endtimestampvalue.value);
  Endtimevalue.value = moment(moment.unix(endtimestampvalue).utc()).format('YYYY-MM-DD HH:mm:ss');

}

function Validatehours() {
  hour.value = hour.value.replace(new RegExp(/[a-z]|[A-Z]|2[5-9]|[3-9]\d|[^\w\u4E00-\u9FA5]/g), (r) => r.length > 1 ? r.substring(0, 1) : '');
}

function ValidateMinutes() {
  minute.value = minute.value.replace(/[a-z]|[A-Z]|[6-9]\d|[^\w\u4E00-\u9FA5]/g, (r) => r.length > 1 ? r.substring(0, 1) : '')
}

function ValidateSeconds() {
  second.value = second.value.replace(/[a-z]|[A-Z]|[6-9]\d|[^\w\u4E00-\u9FA5]/g, (r) => r.length > 1 ? r.substring(0, 1) : '')
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

.map-inset {
  padding-bottom: 50%;
  background: url(public/world.png) 50% 50%;
  background-size: cover;
  position: relative;
  border-radius: 2px;
}

.map-wrap {
  background: #4e7cad url(public/bg.png);
  padding: 1px;
  border-radius: 3px;
  position: relative;
}

.map-label {
  line-height: 60px;
  font-size: 24px;
  margin: 0;
  color: #4e7cad;
  font-family: monospace;
}

</style>