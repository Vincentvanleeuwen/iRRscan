export const pushRelations = (selected, from, to) => {
  return selected.forEach(item => {
    if (item.node_id === from) {
      item.relations.push([from, to])
    } else if (item.node_id === to) {
      item.relations.push([to, from])
    }
  })
}
