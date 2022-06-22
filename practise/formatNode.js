const treeData = {
  name: 1,
  children: [
    {
      name: 2,
      children: [
        {
          name: 4,
          children: [
            {
              name: 7,
              children: []
            }
          ]
        },
        {
          name: 5,
          children: []
        }
      ]
    },
    {
      name: 3,
      children: [
        {
          name: 6,
          children: []
        }
      ]
    }
  ]
}

const formatTree2Array = (tree) => {
  const result = []

  const countTree = (treeData, parentKey) => {
    if (treeData.children && treeData.children.length > 0) {
      if (treeData.children[0]) countTree(treeData.children[0], treeData.name)
      if (treeData.children[1]) countTree(treeData.children[1], treeData.name)
    }

    result.push({
      name: treeData.name,
      parentKey
    })
  }

  countTree(tree)

  return result
}

const formatArray2Tree = (array) => {
  for (const child of array) {
    array.some((parent) => {
      if (parent.name === child.parentKey) {
        if (parent.children) {
          parent.children.push(child)
        } else {
          // eslint-disable-next-line no-param-reassign
          parent.children = [child]
        }
        return true
      }
      return false
    })
  }

  return array.find((el) => !el.parentKey)
}

console.log(formatArray2Tree(formatTree2Array(treeData)))
// console.log(formatTree2Array(treeData))
