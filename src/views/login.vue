<template>
<section class="box-top">
  <el-form :model="formSign" label-position="top" class="box-login" size="medium">
    <div class="title-website">{{title}}</div>
    <el-form-item label="用户名">
      <el-input v-model="formSign.no" placeholder="demo"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formSign.password" placeholder="demo"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="medium" @click="handlerSignIn" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
  <el-alert type="info"
    title="推荐使用chrome、firefox等现代浏览器。"
    :closable="false" center show-icon>
  </el-alert>
</section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function() {
    return {
      formSign: {
        no: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      title: state => state.app.title
    })
  },
  methods: {
    async handlerSignIn() {
      await this.$store.dispatch('LOGIN', this.formSign)
      if (this.user) {
        this.$router.push({ path: '/dashboard' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/vars.scss';

.box-top {
	background-image: url(../assets/rebc.gif);
	background-color: #f5f5f5;
  display:flex; 
  flex-direction: column;
  align-items:center;
  justify-content:center;
  height: 100vh;
  .box-login {
    background-color: $color-border-1;
    width: 320px;
    border: 1px solid $color-border1;
    padding: 16px;
    box-shadow: 0 0 8px $color-border;
    margin: 0 0 40px 0;
    .title-website {
      text-align: center;
      color: $color-blue;
      font-size: $size-title;
      font-weight: bolder;
      margin: 24px 0 ;
    }
  }
  .el-alert {
    width: 320px;
  }
}


</style>


