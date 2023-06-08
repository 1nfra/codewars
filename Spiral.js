function spiralize(size) {
  if (size === 0) return []
  if (size === 1) return [[1]]
  return [Array(size).fill(1), Array(size).fill(0).fill(1, size - 1),
    ...spiralize(size - 2).reverse().map(row => row.reverse()).map((cur, ind, arr) => [...cur, +(arr.length === ind + 1), 1])]
}
