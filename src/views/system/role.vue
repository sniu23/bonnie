<template>
<section>
  <el-form :model="search" ref="search" class="search" label-width="80px" inline>
    <br/>
    <el-form-item label="代码" prop="code">
      <el-input v-model="search.code"></el-input>
    </el-form-item>
    <el-form-item label="名字" prop="name">
      <el-input v-model="search.name"></el-input>
    </el-form-item>
    <el-form-item label="有效否" prop="valid">
      <el-select v-model="search.valid" placeholder="请选择">
        <el-option label="是" :value="true"/>
        <el-option label="否" :value="false"/>
      </el-select>
    </el-form-item>
    <br/>
    <el-button-group>
      <el-button type="primary" @click="searchSubmit()">查询</el-button>
      <el-button @click="searchReset()">重置</el-button>
      <el-button type="danger" @click="handleMake()">新增</el-button>
    </el-button-group>
  </el-form>

  <div v-loading.body="loading">
    <el-table :data="list" ref="list">
      <el-table-column label="代码" prop="code" width="140">
      </el-table-column>
      <el-table-column label="名字" prop="name" width="120">
      </el-table-column>
      <el-table-column label="有效否" prop="valid">
      </el-table-column>
      <el-table-column fixed="left" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleRowEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleRowDrop(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination layout="total, ->, sizes, prev, pager, next, jumper" 
      @current-change="handlePageChange" @size-change="handleSizeChange"
      :current-page.sync="pageNumber" :page-size="pageSize" :total="total" :page-sizes="[5, 10, 20, 50]">
    </el-pagination>
  </div>

  <el-dialog title="新增" :visible.sync="makeVisible" width="50%">
    <el-form :model="make" ref="make" label-width="80px">
      <el-form-item label="代码" prop="code">
        <el-input v-model="make.code"></el-input>
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input v-model="make.name"></el-input>
      </el-form-item>
      <el-form-item label="有效否" prop="valid">
        <el-switch v-model="make.valid" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="makeReset">取消</el-button>
      <el-button type="primary" @click="makeSubmit">保存</el-button>
    </span>
  </el-dialog>

  <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
    <el-form :model="edit" ref="edit" label-width="80px">
      <el-form-item label="代码" prop="code">
        <el-input v-model="edit.code" disabled></el-input>
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input v-model="edit.name"></el-input>
      </el-form-item>
      <el-form-item label="有效否" prop="valid">
        <el-switch v-model="edit.valid" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editReset">取消</el-button>
      <el-button type="primary" @click="editSubmit">保存</el-button>
    </span>
  </el-dialog>

</section>
</template>

<script>
import fetch from '@/utils/fetch'

export default {
  data() {
    return {
      search: {
        code: undefined,
        name: undefined,
        valid: undefined
      },
      list: [],
      total: 0,
      pageNumber: 1,
      pageSize: 5,
      loading: false,
      make: {
        code: '',
        name: '',
        valid: true
      },
      edit: {},
      currentCode: undefined,
      makeVisible: false,
      editVisible: false
    }
  },
  methods: {
    searchSubmit() {
      this.handlePageChange()
    },
    searchReset() {
      this.$refs.search.resetFields()
    },
    async handlePageChange(pageNumber) {
      if (pageNumber) {
        this.pageNumber = pageNumber
      }
      this.loading = true
      const { success, data } = await fetch({
        url: '/role',
        method: 'get',
        params: {
          where: this.search,
          limit: this.pageSize,
          offset: (this.pageNumber - 1) * this.pageSize
        }
      })
      if (success) {
        this.list = data.rows
        this.total = data.count
      }
      this.loading = false
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.handlePageChange()
    },
    handleMake() {
      this.edit = {}
      this.makeVisible = true
    },
    handleRowEdit(row) {
      this.currentCode = row.code
      this.edit = Object.assign({}, { code: row.code, name: row.name, valid: Boolean(row.valid) })
      this.editVisible = true
    },
    async handleRowDrop(row) {
      const { success, message } = await fetch({
        url: '/role/' + row.code,
        method: 'delete'
      })
      if (success) {
        this.$message.success(message)
        await this.handlePageChange()
      }
    },
    async makeSubmit() {
      const { success, message } = await fetch({
        url: '/role/',
        method: 'post',
        data: this.make
      })
      if (success) {
        this.$message.success(message)
        this.$refs.make.resetFields()
        this.makeVisible = false
        await this.handlePageChange()
      }
    },
    async editSubmit() {
      const { success, message } = await fetch({
        url: '/role/' + this.currentCode,
        method: 'post',
        data: this.edit
      })
      if (success) {
        this.$message.success(message)
        this.$refs.edit.resetFields()
        this.editVisible = false
        await this.handlePageChange()
      }
    },
    makeReset() {
      this.$refs.make.resetFields()
      this.makeVisible = false
    },
    editReset() {
      this.$refs.edit.resetFields()
      this.editVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  .el-input, .el-select {
    width: 200px;
  }
}
.el-pagination {
  margin-top: 10px;
}
</style>

