<template>
<section>
  <el-tree :data="tree" :props="props" node-key="id" default-expand-all 
    @node-click="handleClick" ref="tree"
    :expand-on-click-node="false" :render-content="renderContent">
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
      <el-button type="primary" @click="handleSave">保 存</el-button>
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
        name: ''
      },
      currNode: {}
    }
  },
  mounted: function() {
    this.list = [
      // { path: '/page1', name: '页面1', father: '/', isLeaf: true },
      // { path: '/menu2', name: '菜单2', father: '/', isLeaf: false },
      // { path: '/page21', name: '页面21', father: '/menu2', isLeaf: true },
      // { path: '/page22', name: '页面22', father: '/menu2', isLeaf: true },
      // { path: '/menu23', name: '菜单23', father: '/menu2', isLeaf: false },
      // { path: '/page231', name: '页面231', father: '/menu23', isLeaf: true },
      // { path: '/page232', name: '页面232', father: '/menu23', isLeaf: true }
      { path: '/page1', name: '页面1', father: '/' },
      { path: '/menu2', name: '菜单2', father: '/' },
      { path: '/page21', name: '页面21', father: '/menu2' },
      { path: '/page22', name: '页面22', father: '/menu2' },
      { path: '/menu23', name: '菜单23', father: '/menu2' },
      { path: '/page231', name: '页面231', father: '/menu23' },
      { path: '/page232', name: '页面232', father: '/menu23' }
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
        }, [
          createElement('span', [
            createElement('el-tooltip', {
              attrs: {
                content: data.path,
                placement: 'right'
              }
            }, [
              createElement('span', data.name)
            ]),
            createElement('el-button', {
              style: {
                'font-size': '12px'
              },
              attrs: {
                type: 'text'
              },
              nativeOn: {
                click: function() {
                  self.formPage = data
                  self.currNode = data
                  self.dialogVisible = true
                  console.log(JSON.stringify(self.formPage))
                  console.log(JSON.stringify(self.currNode))
                }
              }
            }, '修改')
          ]),
          createElement('span', [
            createElement('el-button', {
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
            }, '追加下级页面'),
            createElement('el-button', {
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
          ])
        ]
      )
    },
    handleClick(data) {
      // console.log(JSON.stringify(data))
    },
    handleSave() {
      console.log(JSON.stringify(this.formPage))
      console.log(JSON.stringify(this.currNode))
      this.$refs['tree'].updateKeyChildren(this.currNode.path, this.formPage)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
