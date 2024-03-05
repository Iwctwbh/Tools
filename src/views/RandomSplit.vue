<template>
  <h1 class="title">
    随机分割 RandomSplit
  </h1>
  <el-row>
    <el-col :lg="9">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <el-button type="primary" @click="CreateExample()">
          例子 Sample
        </el-button>
      </div>
      <div style="position: relative; display: flex; justify-content: center;">
        <el-input
          id="textareaIn"
          v-model="textareaIn"
          :autosize="{ minRows: 15, maxRows: 30 }"
          size="large"
          type="textarea"
          placeholder="请输入需要随机分割的文本，按换行分割。 Please enter the text to be randomly split, separated by line breaks."
        />
      </div>
    </el-col>
    <el-col :lg="5" class="paddingTop40px" style="margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <el-button type="primary" style="visibility: hidden">
          例子 Sample
        </el-button>
      </div>
      <div style="padding-bottom: 10px; width: 100%;display: flex;flex-direction: column;align-items: center;">
        随机次数 RandomTimes
        &nbsp;
        <el-input-number
          v-model="RandomTimes"
          min="1"
          size="large"
        />

        <br />

        分割份数 DividedCount
        &nbsp;
        <el-input-number
          v-model="DividedCount"
          min="1"
          size="large"
        />

        <br />

        <el-button
          style="width: 100%;"
          type="primary"
          @click="RandomSplit()"
        >
          分割 Split
        </el-button>
      </div>
    </el-col>
    <el-col :lg="9" style="display: flex; align-items: center; flex-direction: column; position: relative;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <el-button type="primary" style="visibility: hidden">
          例子 Sample
        </el-button>
      </div>
      <el-input
        id="textareaOut"
        v-model="textareaOut"
        :autosize="{ minRows: 15, maxRows: 30 }"
        size="large"
        type="textarea"
        placeholder="随机分割结果。 Random split result."
      />
    </el-col>
  </el-row>
</template>

<script lang='ts' setup>
// import
import {ref} from "vue";

// Init
let sloth: any = {}; // 是否使用命名空间？
const RandomTimes = ref<number>(7);
const DividedCount = ref<number>(7);
const textareaIn = ref<string>("");
const textareaOut = ref<string>("");

// Function
const RandomSplit = () => {
  let result:any[] = [];
  [...Array(RandomTimes.value)].forEach((f) => {
    let arr: string[] = textareaIn.value.split("\n").map(m => m.trim());
    let tempArr:string[] = [];
    [...Array(DividedCount.value)].forEach((f) => {
      let r: number = Math.random() * arr.length;
      tempArr.push(...arr.splice(r, 1));
    });
    result.push(tempArr);
  });
  textareaOut.value = JSON.stringify(result, null, 4);
};

const CreateExample = () => {
  textareaIn.value = ["旺旺仙贝", "旺旺雪饼", "ad钙奶", "米多奇 椒盐味", "小浣熊 紫色袋子的 意式红烩味", "趣多多 曲奇风味巧克力 最爱", "乐事薯片 青柠味 黄瓜味", "小卫龙", "洽洽瓜子 核桃味", "素毛肚", "好丽友派", "波力海苔", "旺旺小小酥 不是葱香味 原味", "星球杯", "小瓜子 椒盐味", "阿华田风味蛋糕卷", "贤哥小小脆", "呀土豆 番茄味", "喜之郎果冻", "奥利奥威化小饼干", "奥利奥香草慕斯卷", "香蕉片", "星星杯 巧克力味", "好多鱼 番茄味", "奥利奥浓郁巧克力味脆卷", "张君雅小妹妹 日式 和风", "闲趣小饼干", "王子饼干", "蛋酥卷", "妙芙 奶油味欧式蛋糕 经常吃"].join("\n");
};
</script>