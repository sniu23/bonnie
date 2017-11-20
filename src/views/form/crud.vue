<template>
<section>
  <el-form :model="formSearch" ref="formSearch" label-width="80px" inline>
    <br/>
    <el-form-item label="帐号" prop="no">
      <el-input v-model="formSearch.no"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="formSearch.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formSearch.password"></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="roleId">
      <el-input v-model="formSearch.roleId"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input v-model="formSearch.status"></el-input>
    </el-form-item>
    <br/>
    <el-form-item>
      <el-button type="primary" @click="submitForm('formSearch')">查询</el-button>
      <el-button @click="resetForm('formSearch')">重置</el-button>
      <el-button type="danger" @click="dialogVisible = true">新增</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData">
    <el-table-column prop="date" label="日期" width="140">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
    <el-table-column
      fixed="left"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

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
        formSearch: {
          no: '',
          name: '',
          password: '',
          roleId: 'guest',
          status: 'created'
        },
        dialogVisible: false,
        tableData: Array(10).fill(item)
      }
    },
    methods: {
      submitForm(formName) {
        console.log('submit!')
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

