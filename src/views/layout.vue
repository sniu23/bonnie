<template>
<el-container :class="{clsMenuCollapse:menuCollapsed}">
  <el-aside :width="sideWidth">
  	<el-card :body-style="{ padding: '0px' }">
      <!--标题-->
      <div slot="header" class="clearfix">
        <span class="menu-title">{{title}}</span>
        <span class="menu-toggle">
          <el-button type="text" @click.native="handleMenuCollapse">
            <i class="el-icon-x-menu"></i>
          </el-button>
        </span>
      </div>
      <!--用户信息-->
      <div class="user-box clearfix">
        <span class="user-name">{{user.name}}</span>
        <el-button class="user-button" type="text" @click.native="handleLogOut">登出</el-button>
        <el-button class="user-button" type="text" @click.native="passwordVisible = true">修改密码</el-button>
      </div>
    </el-card>
    <!--菜单-->
    <el-menu unique-opened text-color="#2D2F33" router :collapse="menuCollapsed">
      <li v-for="r1 in children('/')" :key="r1.path" 
        :is="r1.isLeaf ? 'el-menu-item' : 'el-submenu' "
        :index="r1.path">
        <i v-if="r1.isLeaf" :class="'el-icon-' + randomIcon()"></i>
        <span v-if="r1.isLeaf" slot="title">{{r1.name}}</span>
        <template v-if="!r1.isLeaf" slot="title">
          <i :class="'el-icon-' + randomIcon()"></i>
          <span slot="title">{{r1.name}}</span>
        </template>
        <template v-if="!r1.isLeaf">

          <li v-for="r2 in children(r1.path)" :key="r2.path" 
            :is="r2.isLeaf ? 'el-menu-item' : 'el-submenu' "
            :index="r2.path">
            <i v-if="r2.isLeaf" :class="'el-icon-' + randomIcon()"></i>
            <span v-if="r2.isLeaf" slot="title">{{r2.name}}</span>
            <template v-if="!r2.isLeaf" slot="title">
              <i :class="'el-icon-' + randomIcon()"></i>
              <span slot="title">{{r2.name}}</span>
            </template>
            <template v-if="!r2.isLeaf">

              <li v-for="r3 in children(r2.path)" :key="r3.path" 
                :is="r3.isLeaf ? 'el-menu-item' : 'el-submenu' "
                :index="r3.path">
                <i v-if="r3.isLeaf" :class="'el-icon-' + randomIcon()"></i>
                <span v-if="r3.isLeaf" slot="title">{{r3.name}}</span>
                <template v-if="!r3.isLeaf" slot="title">
                  <i :class="'el-icon-' + randomIcon()"></i>
                  <span slot="title">{{r3.name}}</span>
                </template>

              </li>    
            </template>
          </li>
        </template>
      </li>
    </el-menu>
  </el-aside>
  <!--主显示区-->
  <el-main>
    <el-tabs v-model="currTab" type="card" closable @tab-click="handleClickTab" @tab-remove="handleRemoveTab">
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
    <!--修改密码-->
    <el-dialog title="修改密码" :visible.sync="passwordVisible">
      <el-form :model="formPwd" label-width="120px">
        <el-form-item label="老密码">
          <el-input v-model="formPwd.oldPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="formPwd.newPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码">
          <el-input v-model="formPwd.cfmPwd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChangePwd">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</el-container>
</template>

<script>
import { mapState } from 'vuex'
import { changePwd } from '@/api/user'

export default {
  name: 'layout',
  data() {
    return {
      menuCollapsed: false,
      passwordVisible: false,
      sideWidth: '240px',
      formPwd: {
        oldPwd: '',
        newPwd: '',
        cfmPwd: ''
      },
      pageTabs: [
        { name: '/dashboard', title: '主页', closable: false }
      ],
      currTab: '/dashboard'
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      title: state => state.app.title,
      uris: state => state.user.uris
    }),
    root: function() {
      let home
      this.$router.options.routes.forEach(function(item) {
        if (item.path === '/') {
          home = item.children
        }
      })
      const allowed = this.uris
      const root = home.filter(function(item) {
        return allowed.indexOf(item.path) >= 0
      })
      return root
    }
  },
  mounted: async function() {
    // this.$data.user = JSON.parse(sessionStorage.getItem('user'))
    await this.$store.dispatch('NAVIGATE')
  },
  watch: {
    '$route': 'handleCreateTab'
  },
  methods: {
    children: function(fatherName) {
      const children = this.root.filter(function(item) {
        return item.father === fatherName
      })
      return children
    },
    handleMenuCollapse() {
      this.$data.menuCollapsed = !(this.$data.menuCollapsed)
      this.$data.menuCollapsed ? this.$data.sideWidth = '66px' : this.$data.sideWidth = '240px'
    },
    handleCreateTab() {
      const newTab = {
        name: this.$route.path,
        title: this.$route.name
      }
      const hasOne = this.pageTabs.filter(tab => tab.name === newTab.name)
      if (hasOne.length === 0) {
        this.pageTabs.push(newTab)
      }
      this.currTab = newTab.name
    },
    handleRemoveTab(targetName) {
      const tabs = this.pageTabs
      let activeName = this.currTab
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
      this.currTab = activeName
      this.pageTabs = tabs.filter(tab => tab.name !== targetName)
    },
    handleClickTab(tab) {
      this.$router.push({ path: tab.name })
    },
    async handleChangePwd() {
      const { success, message } = await changePwd({
        no: this.$data.user.no,
        oldpwd: this.formPwd.oldPwd,
        newpwd: this.formPwd.newPwd
      })
      this.formPwd.oldPwd = ''
      this.formPwd.newPwd = ''
      this.formPwd.cfmPwd = ''
      if (success) {
        this.$data.passwordVisible = false
        this.$message.success(message)
      }
    },
    async handleLogOut() {
      this.$router.push({ path: '/login' })
    },
    randomIcon() {
      const iconArray = [
        'document', 'goods', 'message', 'edit', 'more-outline',
        'location-outline', 'bell', 'mobile-phone', 'news', 'phone-outline',
        'view', 'picture', 'service', 'star-off', 'tickets', 'date', 'time'
      ]
      const index = Math.floor((Math.random() * iconArray.length))
      return iconArray[index]
    }
  }
}
</script>

<style lang="scss" scope>
@import '../styles/vars.scss';
@import '../assets/icon/iconfont.css';

.el-container {
  min-height: 100vh;
  .el-aside {
    width: 240px;
    border-right: 1px solid $color-border;
    .el-card {
      border: 0px;
      .el-card__header {
        color: $color-blue;
        padding: 16px 20px 8px 13px;
        line-height: $size-title;
        .menu-title {
          font-size: $size-title;
          font-weight: bolder;
        }
        .menu-toggle {
          padding: 0;
          margin: 0;
          float: right;
          .el-button {
            margin: 0;
            padding: 0;
            .el-icon-x-menu {
              font-size: $size-title;
            }
          }
        }
      }
    }
    .user-box {
      padding: $size-text;
      line-height: $size-text;
      background-color: $color-border;
      .user-name {
        font-size: $size-text;
        color: $color-font-1;
      }
      .user-button {
        padding: 0;
        margin-left: 10px;
        float: right;
      }
    }
    .el-menu {
      border-right: 0;
      .el-submenu__title {
        font-weight: bolder;        
      }
    }
  }
  .el-main {
	  background-color: white;
    padding: 4px 12px;
    .el-tabs__header {
      margin-bottom: 0;
    }
    .page-box {
      border-style: solid;
      border-color:$color-border;
      border-width: 0 1px 1px 1px;
      padding: $size-text/2 $size-text;  
    }
  }
}
.clsMenuCollapse {
  .el-aside {
    overflow: visible;
    .menu-title, .user-box {
      display: none;
    }
  }
}
</style>
