<template>
<section>
  <el-tabs value="first">
    <el-tab-pane label="单头信息" name="first">
      <el-form :model="formHead" ref="formHead" label-width="80px" inline>
        <br/>
        <el-form-item label="帐号" prop="no">
          <el-input v-model="formHead.no"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formHead.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formHead.password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-input v-model="formHead.roleId"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="formHead.status"></el-input>
        </el-form-item>
        <br/>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formHead')">保存单头</el-button>
          <el-button @click="resetForm('formHead')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  <el-tabs value="second">
    <el-tab-pane label="单身信息" name="second">
      <el-form :model="formBody" ref="formBody" label-width="80px" inline>
        <br/>
        <el-form-item label="帐号" prop="no">
          <el-input v-model="formBody.no"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formBody.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formBody.password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-input v-model="formBody.roleId"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="formBody.status"></el-input>
        </el-form-item>
        <br/>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formBody')">追加单身</el-button>
          <el-button @click="resetForm('formBody')">重置</el-button>
        </el-form-item>
      </el-form>
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
        formBody: {
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
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="scss" scoped>
.el-form-item__content {
  width: 500px;
}
</style>
