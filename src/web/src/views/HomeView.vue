<script setup lang="ts">
import {reactive} from 'vue'
import {postData} from "@/api/utils";

// do not use same name with ref
const form = reactive({
  filterUrl: '',
})

const onSubmit = () => {
  console.log('submit!', form.filterUrl)
  postData('http://localhost:3000/query', {filterUrl: form.filterUrl}).then(res =>{
    console.log('res :>>', res);
  })

}
</script>

<template>
  <main>
    <h1>测试筛选链接</h1>
    <el-form :model="form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="筛选链接">
            <el-input rows="10" v-model="form.filterUrl" type="textarea"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>
