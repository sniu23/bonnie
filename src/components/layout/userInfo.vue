<template>
<div class="wrap">
  <div class="info">
    <img class="avatar" :src="head" alt="head">
    <div class="user">
      <div class="no">{{user.no}}</div>
      <div class="name">{{user.name}}</div>
    </div>
  </div>
  <div class="clearfix">
    <el-button class="action" type="text" @click.native="handleLogOut">登出</el-button>
    <el-button class="action" type="text" @click.native="passwordVisible = true">修改密码</el-button>
    <!--修改密码-->
    <password :isVisible.sync="passwordVisible" />
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import head from '@/assets/user.png'
import password from '@/components/layout/password.vue'

export default {
  components: {
    password
  },
  data: function() {
    return {
      head,
      passwordVisible: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    async handleLogOut() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';

.wrap {
  display:flex; 
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-style: solid;
  border-color: #E6EBF5;
  border-width: 1px 0 1px 0;
  .info {
    display:flex; 
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 8px;
    font-size: 13px;
    .avatar {
      width: 40px;
      height: 40px;
      margin-right: 8px;
    }
    .user {
      .no {
        color: #878D99;
        margin-bottom: 4px;
      }
      .name {
        font-size: 14px;
      }
    }
  }
  .action {
    padding: 4px;
    margin-left: 10px;
    float: right;
  }
}
</style>
