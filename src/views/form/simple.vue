<template>
<el-form :model="formSimple" ref="formSimple" :rules="rules" label-width="80px">
  <el-form-item label="帐号" prop="no">
    <el-input v-model="formSimple.no"></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="name">
    <el-input v-model="formSimple.name"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="formSimple.password"></el-input>
  </el-form-item>
  <el-form-item label="角色" prop="roleId">
    <el-input v-model="formSimple.roleId"></el-input>
  </el-form-item>
  <el-form-item label="状态" prop="status">
    <el-input v-model="formSimple.status"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('formSimple')">立即创建</el-button>
    <el-button @click="resetForm('formSimple')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    data() {
      return {
        formSimple: {
          no: '',
          name: '',
          password: '',
          roleId: 'guest',
          status: 'created'
        },
        rules: {
          no: { required: true, message: '请输入帐号', trigger: 'blur' },
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: { required: true, message: '请输入密码', trigger: 'blur' },
          roleId: { required: true, message: '请输入角色', trigger: 'blur' },
          status: { required: true, message: '请输入状态', trigger: 'blur' }
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!')
          } else {
            console.log('validate error!!')
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="scss" scoped>
.el-form-item {
  width: 600px;
}
</style>

