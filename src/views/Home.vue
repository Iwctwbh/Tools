<template>
  <h1 class="title">
    首页 Home Page
  </h1>
  <el-row
      v-for="(item, index) in useRouter().getRoutes().filter(f => f.path.split('/').length > 2)"
      style="justify-content: center;"
  >
    <el-col style="text-align: center;">
      <a :href="item.path">{{ item.name }}</a>
    </el-col>
  </el-row>
</template>

<script lang='ts' setup>
import {useRouter} from "vue-router";

//const router = useRouter();
//const route = useRoute();
</script>