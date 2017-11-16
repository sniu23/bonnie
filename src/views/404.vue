<template>
<div class="flex-box">

  <el-card class="item-card" style="">
    <i class="el-icon-x-404"></i>
    <el-alert type="error" :closable="false"
      :title="$t('message.notfound')" show-icon>
    </el-alert>
    <router-link to="/dashboard">
      <el-button type="info" plain size="medium">返回首页</el-button>
    </router-link>
  </el-card>

</div>
</template>

<script>
export default {
  // data: function() {
  //   return {
  //     notfound: '未找到该页！'
  //   }
  // }
}
</script>

<style lang="scss" scope>
@import '../assets/icon/iconfont.css';

.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .item-card {
  background-color: #EDF2FC;
    box-sizing: border-box;
    width: 600px;
    min-height: 300px;
    margin: 0 0 240px 0;
    text-align: center;
      .el-icon-x-404 {
        margin: 48px 0;
        font-size: 80px;
        color: #409EFF;
      }
      .el-alert {
        margin: 16px 0;
      }
      .el-button {
        margin: 16px 0;
      }
  }
}
</style>
