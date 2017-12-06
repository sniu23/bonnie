<template>
<section class="box-flex">
  <div class="top"></div>
  <div class="content">
    <div class="title-website">{{title}}</div>
    <el-tabs value="first">
      <el-tab-pane label="注册" name="first">
        <el-form :model="formRegister" ref="formRegister" label-position="left" class="box-login" size="medium" :rules="rules">
          <el-form-item prop="no">
            <el-input v-model="formRegister.no" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input v-model="formRegister.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="formRegister.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="mail">
            <el-input v-model="formRegister.mail" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input v-model="formRegister.mobile" placeholder="11位手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlerRegister('formRegister')" style="width: 100%">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div class="clearfix">
      <router-link to="/login">
        <el-button type="text" style="float:right" size="medium">使用已有帐号登录</el-button>      
      </router-link>
    </div>
  </div>

  <el-alert type="info" class="copyright"
    title="Copyright 2017 XX技术部出品"
    :closable="false" center>
  </el-alert>

</section>
</template>

<script>
import { mapState } from 'vuex'
import fetch from '@/utils/fetch'

export default {
  data: function() {
    return {
      formRegister: {
        no: '',
        name: '',
        password: '',
        mail: '',
        mobile: ''
      },
      rules: {
        no: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
          { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: '^\\d{11}$', message: '正确的手机号：长度11位、数字', trigger: 'blur,change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      title: state => state.app.title
    })
  },
  methods: {
    async handlerRegister(formName) {
      const valid = await this.$refs[formName].validate()
      if (valid) {
        const { success, message } = await fetch({
          url: '/register',
          method: 'post',
          data: this.formRegister
        })
        if (success) {
          this.$message({
            message,
            type: 'success',
            duration: 5 * 1000
          })
          this.$router.push({ path: '/login' })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/vars.scss';

.box-flex {
	background-image: url(../assets/rebc.gif);
	background-color: #f5f5f5;
  display:flex; 
  flex-direction: column;
  justify-content: space-between;
  align-items:center;
  height: 100vh;
  padding: 0;
  margin: 0;
  .content {
    width: 360px;
    .title-website {
      text-align: center;
      color: $color-blue;
      font-size: $size-title1;
      font-weight: bolder;
      margin: 40px 0;
    }
    .explorer {
      margin: 40px 0;
    }
  }
  .copyright {
    height: 80px;
  }
}

</style>


