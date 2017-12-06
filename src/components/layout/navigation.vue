<template>
<el-menu unique-opened text-color="#2D2F33" router :collapse="isCollapsed" :default-active="activePage">
  <li v-for="r1 in uris" :key="r1.path"
    :is="(!r1.children || r1.children.length === 0) ? 'el-menu-item' : 'el-submenu' " 
    :index="r1.path">
    <i v-if="(!r1.children || r1.children.length == 0)" :class="'el-icon-' + randomIcon()"></i>
    <span v-if="(!r1.children || r1.children.length === 0)" slot="title">{{r1.name}}</span>
    <template v-if="(!!r1.children && r1.children.length !== 0)" slot="title">
      <i :class="'el-icon-' + randomIcon()"></i>
      <span slot="title">{{r1.name}}</span>
    </template>

    <template v-if="r1.children.length">
      <li v-for="r2 in r1.children" :key="r2.path"
        :is="(!r2.children || r2.children.length === 0) ? 'el-menu-item' : 'el-submenu' " 
        :index="r2.path">
        {{(!r2.children || r2.children.length === 0) ?  r2.name : ''}}
        <template v-if="(!!r2.children && r2.children.length !== 0)" slot="title">{{r2.name}}</template>       

        <template v-if="r2.children.length">
          <li v-for="r3 in r2.children" :key="r3.path"
            :is="(!r3.children || r3.children.length === 0) ? 'el-menu-item' : 'el-submenu' " 
            :index="r3.path">
            {{(!r3.children || r3.children.length === 0) ?  r3.name : ''}}
            <template v-if="(!!r3.children && r3.children.length !== 0)" slot="title">{{r3.name}}</template>
          </li>
        </template>    

      </li>
    </template>

  </li>
</el-menu>
</template>

<script>
import { mapState } from 'vuex'
import list2tree from '@/utils/list2tree'

export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    },
    activePage: {
      type: String,
      default: '/dashboard'
    }
  },
  computed: {
    ...mapState({
      uris: state => list2tree(state.user.uris)
    })
  },
  methods: {
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

<style lang="scss" scoped>
.el-menu {
  border-right: 0;
  .el-submenu__title {
    font-weight: bolder;        
  }
}
</style>
