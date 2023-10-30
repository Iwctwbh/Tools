<template>
  <h1 class="title">
    首页 Home Page
  </h1>
  <el-row
    style="justify-content: center;"
    :gutter="10"
  >
    <el-col
      v-for="(item, index) in useRouter().getRoutes().filter(f => f.path.split('/').length > 2)"
      :lg="6"
      style="text-align: center;"
      class="home-page-card"
    >
      <el-card>
        <a :href="item.path">{{ item.name }}</a>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.home-page-card {
  margin-top: 10px;
}
</style>

<script lang='ts' setup>
import {useRouter} from "vue-router";

//const router = useRouter();
//const route = useRoute();
</script>