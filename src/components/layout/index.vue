<template>
<el-container :class="{clsMenuCollapse:menuCollapsed}">
  <el-aside :width="sideWidth">
    <!--标题-->
    <div class="clearfix header">
      <div class="title-wrap">
        <span class="title">{{title}}</span>
      </div>
      <el-button class="toRight toggle" type="text" @click.native="handleMenuCollapse">
        <i class="el-icon-x-menu"></i>
      </el-button>
    </div>
    <!--用户信息-->
    <user-info v-if="!menuCollapsed"></user-info>
    <!--导航菜单-->
    <navigation :isCollapsed="menuCollapsed" :activePage="currPage" />
  </el-aside>
  <el-main>
    <el-tabs class="pages" v-model="currPage" type="card" closable @tab-click="handleClickTab" @tab-remove="handleRemoveTab">
      <el-tab-pane v-for="(item, index) in pageTabs" :key="item.name" :label="item.title" :name="item.name">
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
    <!--嵌套视图-->
    <div class="page-box">
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </div>
  </el-main>
</el-container>
</template>

<script>
import { mapState } from 'vuex'
import navigation from '@/components/layout/navigation.vue'
import userInfo from '@/components/layout/userInfo.vue'

export default {
  components: {
    navigation,
    userInfo
  },
  data: function() {
    return {
      sideWidth: '240px',
      currPage: '/dashboard',
      pageTabs: [
        { name: '/dashboard', title: '主页', closable: false }
      ],
      menuCollapsed: false
    }
  },
  computed: {
    ...mapState({
      title: state => state.app.title,
      user: state => state.user.user,
      uris: state => state.user.uris
    })
  },
  watch: {
    '$route': 'handleCreateTab'
  },
  methods: {
    handleMenuCollapse() {
      this.$data.menuCollapsed = !(this.$data.menuCollapsed)
      this.$data.menuCollapsed ? this.$data.sideWidth = '66px' : this.$data.sideWidth = '240px'
    },
    handleCreateTab() {
      const newTab = {
        name: this.$route.path
      }
      this.uris.forEach(function(item) {
        if (item.path === newTab.name) {
          newTab.title = item.name
        }
      })
      const hasOne = this.pageTabs.filter(tab => tab.name === newTab.name)
      if (hasOne.length === 0) {
        this.pageTabs.push(newTab)
      }
      this.currPage = newTab.name
    },
    handleRemoveTab(targetName) {
      const tabs = this.pageTabs
      let activeName = this.currPage
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              this.$router.push({ path: activeName })
            } else {
              this.$router.push({ path: '/dashboard' })
            }
          }
        })
      }
      this.currPage = activeName
      this.pageTabs = tabs.filter(tab => tab.name !== targetName)
    },
    handleClickTab(tab) {
      this.$router.push({ path: tab.name })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
@import '../../assets/icon/iconfont.css';

.header {
  color: $color-blue;
  .title-wrap {
      display: inline-block;
    .title {
      padding-left: 10px;
      font-size: 24px;
      line-height: 40px;
    }
  }
  .toggle {
    padding: 10px;
    .el-icon-x-menu {
      font-size: 24px;
    }
  }
}

.el-container {
  min-height: 100vh;
  .el-aside {
    width: 240px;
    border-right: 1px solid $color-border;   
  }
  .el-main {
	  background-color: white;
    padding: 4px 12px;
    .el-tabs__header {
	      background-color: red;
        margin-bottom: 0;
    }
    .page-box {
      border-style: solid;
      border-color:$color-border;
      border-width: 0 1px 1px 1px;
      padding: $size-text;
      min-height: 93vh;
    }
  }
}


.clsMenuCollapse {
  .el-aside {
    overflow: visible;
  }
  .title-wrap {
    display: none;
  }
  .toggle {
    padding: 10px 20px;
  }
}
</style>

