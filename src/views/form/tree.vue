<template>
<section>
  <el-tree :data="data4" :props="defaultProps" show-checkbox="" node-key="id" 
    default-expand-all :expand-on-click-node="false" :render-content="renderContent">
  </el-tree>
</section>
</template>

<script>
export default {
  data: function() {
    return {
      data4: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2',
          children: []
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {

    remove: function(store, data) {
      store.remove(data)
    },

    renderContent(createElement, { node, data, store }) {
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
            createElement('span', node.label)
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
                  const newChild = { id: 99, label: 'testtest', children: [] }
                  data.children.push(newChild)
                }
              }
            }, 'Append'),
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
            }, 'Delete')
          ])
        ]
      )
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
