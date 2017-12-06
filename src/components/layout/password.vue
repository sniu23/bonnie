<template>
<el-dialog title="修改密码" :visible.sync="isVisible">
  <el-form :model="edit" label-width="120px" ref="edit" :rules="rules">
    <el-form-item label="老密码" prop="oldPwd">
      <el-input type="password" v-model="edit.oldPwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPwd">
      <el-input type="password" v-model="edit.newPwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="重复新密码" prop="cfmPwd">
      <el-input type="password" v-model="edit.cfmPwd" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="handleReset">取消</el-button>
    <el-button type="primary" @click="handleSubmit">确定</el-button>
  </div>
</el-dialog>
</template>

<script>
import fetch from '@/utils/fetch'

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formPwd.cfmPwd !== '') {
          this.$refs.formPwd.validateField('cfmPwd')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formPwd.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      edit: {
        oldPwd: '',
        newPwd: '',
        cfmPwd: ''
      },
      rules: {
        oldPwd: { type: 'string', message: '旧密码不能为空！', required: true, trigger: 'blur' },
        newPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        cfmPwd: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleSubmit() {
      const valid = await this.$refs.edit.validate()
      if (valid) {
        const { success, message } = await fetch({
          url: '/password',
          method: 'post',
          data: {
            no: this.$store.user.user.no || '',
            oldPwd: this.edit.oldPwd,
            newPwd: this.edit.newPwd
          }
        })
        this.$refs.edit.resetFields()
        if (success) {
          this.$message.success(message)
          this.$emit('update:isVisible', false)
        }
      }
    },
    handleReset() {
      this.$refs.edit.resetFields()
      this.$emit('update:isVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

