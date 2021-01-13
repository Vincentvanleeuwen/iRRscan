export const pushRelations = (selected, from, to, category) => {
  // i.e acc.people
  return selected.forEach(item => {
    // Check if node id is the same as edge id one
    if (item.node_id === from) {
      // Push array into relations
      item.relations.push([from, to, category])
      // Check if node id is the same as edge id two
    } else if (item.node_id === to) {
      // Push array into relations
      item.relations.push([to, from, category])
    }
  })
}
