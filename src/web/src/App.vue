<template>
  <el-container>
    <el-header>头部位置</el-header>
    <el-container>
      <el-aside width="200px">侧边菜单</el-aside>
      <el-main>
        <HomeView></HomeView>
      </el-main>
    </el-container>
  </el-container>


</template>

<script lang="ts" setup>

import HomeView from "@/views/HomeView.vue";
</script>


<style scoped>

</style>
