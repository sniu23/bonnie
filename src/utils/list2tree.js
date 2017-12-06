
const list2tree = function(list) {
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
  // const root = {
  //   path: '/',
  //   name: '根',
  //   father: ''
  // }
  const children = getChildren('/') || []
  return children
}

export default list2tree
