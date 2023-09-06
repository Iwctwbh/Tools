<template>
  <h1 class="title">
    Markdown编辑器 MdEditor
  </h1>
  <el-row style="justify-content: center;">
    <md-editor
        v-model="editorMarkdown"
    ></md-editor>
  </el-row>

  <el-row style="justify-content: center;">
    <el-col span="5" style="text-align: center;">
      <p>
        源码参考: <a href="https://github.com/imzbf/md-editor-v3" target="_blank">md-editor-v3</a>
      </p>
    </el-col>
  </el-row>
</template>

<style>
@import "md-editor-v3/lib/style.css";
</style>

<script lang='ts' setup>
// Import
import {MdEditor} from "md-editor-v3";
import { ref } from "vue";

// Init
const editorMarkdown = ref<string>("");
</script>