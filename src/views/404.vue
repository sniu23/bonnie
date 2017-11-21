<template>
<section class="flex-column">
  <div class="top"></div>
  <section class="flex-row">
    <div class="box left">
      <i class="el-icon-x-404"></i>
    </div>
    <div class="box right">
      <h2>{{notfound}}</h2>
      <router-link to="/dashboard">
        <el-button type="primary" plain size="medium">返回首页</el-button>
      </router-link>
    </div>
  </section>
  <el-alert type="info" class="copyright"
    title="Copyright 2017 XX技术部出品"
    :closable="false" center>
  </el-alert>
</section>
</template>

<script>
export default {
  data: function() {
    return {
      notfound: '未找到该页！'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/icon/iconfont.css';

.flex-column {
  background-image: url(../assets/rebc.gif);
	background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items:center;
  height: 100vh;
  .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    width: 100%;
    flex-wrap: wrap;
    .box {
      width: 360px;
      margin: 20px 12px 60px 0;
      .el-icon-x-404 {
        margin: 48px 0;
        font-size: 120px;
        font-weight: bold;
        color: #409EFF;
      }
      .left {
        text-align: center;
      }
      .right {
        text-align: left;
      }
    }
  }
  .copyright {
    height: 80px;
  }
}
</style>
