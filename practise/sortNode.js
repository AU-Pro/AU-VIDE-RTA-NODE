const arr = [1, 2, 3, 4, 5, 6, 7, 8]

const sortArr2Node = (array) => {
  if (array.length === 0) {
    return null
  }
  if (array.length === 1) {
    return array[0]
  }

  const mid = Number.parseInt(array.length / 2, 10)

  const root = {
    value: array[mid],
    left: sortArr2Node(array.slice(0, mid)),
    right: sortArr2Node(array.slice(mid + 1))
  }

  return root
}

const Node = (value) => {
  return sortArr2Node(value)
}

console.log(Node(arr))
