<template>
<section>
  <el-tabs value="first">
    <el-tab-pane label="单头信息" name="first">
      <el-form :model="formHead" ref="formHead" label-width="80px" inline label-suffix=":">
        <el-form-item label="帐号" prop="no">
          <span>{{formHead.no}}</span>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <span>{{formHead.name}}</span>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <span>{{formHead.password}}</span>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <span>{{formHead.roleId}}</span>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <span>{{formHead.status}}</span>
        </el-form-item>
        </br>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formHead')">复制单头</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  <el-tabs value="second">
    <el-tab-pane label="单身信息" name="second">
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</section>
</template>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
      return {
        formHead: {
          no: '',
          name: '',
          password: '',
          roleId: 'guest',
          status: 'created'
        },
        tableData: Array(10).fill(item)
      }
    },
    methods: {
      submitForm(formName) {
        console.log('validate error!!')
      }
    }
  }
</script>

<style lang="scss" scoped>
.el-form-item {
  width: 240px;
  span {
    color: #2D2F33;
    font-weight: bold;
  }
}
</style>
