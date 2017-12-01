<template>
<section class="box-flex">
  <div class="top"></div>
  <div>
    <div class="title-website">{{title}}</div>
    <el-tabs value="first">
      <el-tab-pane label="帐号登录" name="first">
        <el-form :model="formSign" ref="formSign" :rules="rules" label-position="left" class="box-login" size="medium">
          <el-form-item prop="no">
            <el-input v-model="formSign.no" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="formSign.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="handlerSignIn('formSign')" style="width: 100%">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="clearfix">
      <router-link to="/register">
        <el-button type="text" style="float:right" size="medium">没有帐号，注册新帐号</el-button>      
      </router-link>
    </div>
    <el-alert type="error" class="explorer"
      title="推荐使用chrome、firefox等现代浏览器。"
      :closable="false" center show-icon>
    </el-alert>
  </div>

  <el-alert type="info" class="copyright"
    title="Copyright 2017 XX技术部出品"
    :closable="false" center>
  </el-alert>

</section>
</template>

<script>
import { mapState } from 'vuex'
import { ok } from '@/api/user'

export default {
  data: function() {
    return {
      formSign: {
        no: '',
        password: ''
      },
      rules: {
        no: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      title: state => state.app.title
    })
  },
  mounted: async function() {
    await ok()
  },
  methods: {
    async handlerSignIn(formName) {
      const valid = await this.$refs[formName].validate()
      if (valid) {
        await this.$store.dispatch('LOGIN', this.formSign)
        if (this.user) {
          this.$router.push({ path: '/dashboard' })
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
  .title-website {
    text-align: center;
    color: $color-blue;
    font-size: $size-title1;
    font-weight: bolder;
    margin: 40px 0;
  }
  .explorer {
    width: 360px;
    margin: 40px 0;
  }
  .copyright {
    height: 80px;
  }
}

</style>


