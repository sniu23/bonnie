<template>
<section>
  <el-tree :data="tree" ref="tree" :props="props" node-key="path" show-checkbox 
    default-expand-all accordion highlight-current :expand-on-click-node="false"
    :render-content="renderContent">
  </el-tree>

  <el-dialog title="页面信息" :visible.sync="dialogVisible">
    <el-form :model="formPage" ref="formPage" label-width="80px">
      <el-form-item label="路径" prop="path">
        <el-input v-model="formPage.path"></el-input>
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input v-model="formPage.name"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit">保 存</el-button>
    </div>
  </el-dialog>
</section>
</template>

<script>
export default {
  data: function() {
    return {
      props: {
        label: 'name',
        children: 'children'
      },
      list: [],
      tree: [],
      dialogVisible: false,
      formPage: {
        path: '',
        name: '',
        children: []
      },
      currKey: ''
    }
  },
  mounted: function() {
    this.list = [
      { path: '/page1', name: '页面1', father: '/', allow: 'Q,A' },
      { path: '/menu2', name: '菜单2', father: '/', allow: 'Q,A' },
      { path: '/page21', name: '页面21', father: '/menu2', allow: 'Q,A' },
      { path: '/page22', name: '页面22', father: '/menu2', allow: 'Q,A' },
      { path: '/menu23', name: '菜单23', father: '/menu2', allow: 'Q,A' },
      { path: '/page231', name: '页面231', father: '/menu23', allow: 'Q,A' },
      { path: '/page232', name: '页面232', father: '/menu23', allow: 'Q,A' }
    ]
    this.tree = this.list2tree(this.list)
  },
  methods: {
    list2tree(list) {
      const getChildren = function(fatherName) {
        const _son = list.filter(function(item) {
          return item.father === fatherName
        })
        let _grandson
        if (_son.length > 0) {
          _grandson = _son.map(function(item) {
            item = Object.assign({}, item, { children: getChildren(item.path) })
            return item
          })
        } else {
          _grandson = []
        }
        return _grandson
      }
      const root = {
        path: '/',
        name: '根',
        father: ''
      }
      root.children = getChildren('/') || []
      return [root]
    },
    renderContent(createElement, { node, data, store }) {
      const self = this
      const pageName = createElement('el-tooltip', {
        attrs: {
          content: data.path,
          placement: 'right'
        }
      }, [
        createElement('span', data.name)
      ])
      const pageAllow = createElement('el-tag', {
        attrs: {
          size: 'mini'
        }
      }, data.allow)
      const makeNew = createElement('el-button', {
        style: {
          'font-size': '12px'
        },
        attrs: {
          type: 'text'
        },
        nativeOn: {
          click: function() {
            self.currKey = data.path
            self.formPage.path = data.path
            self.formPage.name = data.name
            self.formPage.children = data.children
            self.dialogVisible = true
          }
        }
      }, '修改')
      const makeSon = createElement('el-button', {
        style: {
          'font-size': '12px'
        },
        attrs: {
          type: 'text'
        },
        nativeOn: {
          click: function() {
            const newChild = { name: '新增页面', children: [] }
            self.formPage = newChild
            data.children.push(newChild)
          }
        }
      }, '追加下级页面')
      const remove = createElement('el-button', {
        style: {
          'font-size': '12px'
        },
        attrs: {
          type: 'text'
        },
        nativeOn: {
          click: function() {
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
          }
        }
      }, '删除')
      const left = createElement('span', [pageName])
      const right = createElement('span', [pageAllow])
      return createElement(
        'span', {
          style: {
            'flex': '1',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'space-between',
            'font-size': '14px',
            'padding-right': '8px'
          }
        }
        , [left, right]
      )
    },
    handleEdit(key) {
      console.log(this.currKey)
      console.log(this.formPage)
      this.$refs.tree.updateKeyChildren(this.currKey, [{
        path: this.formPage.path,
        name: this.formPage.name,
        children: this.formPage.children
      }])
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
