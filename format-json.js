const attachChild = data => {
  /*  let input = {
    "0": [{ id: 10, title: "House", level: 0, children: [], parent_id: null }],
    "1": [
      { id: 12, title: "Red Roof", level: 1, children: [], parent_id: 10 },
      { id: 18, title: "Blue Roof", level: 1, children: [], parent_id: 10 },
      { id: 13, title: "Wall", level: 1, children: [], parent_id: 10 }
    ],
    "2": [
      { id: 17, title: "Blue Window", level: 2, children: [], parent_id: 12 },
      { id: 16, title: "Door", level: 2, children: [], parent_id: 13 },
      { id: 15, title: "Red Window", level: 2, children: [], parent_id: 12 }
    ]
  }; */
  let input = data;
  let arr = [];
  Object.values(input).forEach(values => {
    arr.push(...values);
  });
  console.log(transform(arr));

  function transform(input) {
    let parent = null;
    input.forEach(item => {
      if (item.level === 0) {
        item.children = input.filter(value => value.id !== item.id);
        parent = item;
        transform(item.children);
      } else if (item.level === 1) {
        parent = input.find(value => value.id === item.parent_id);
        if (parent) {
          parent.children.concat(item);
          transform(item.children);
        }
      } else {
        // parent = input.find(value => value.id === item.parent_id);
        if (parent) {
          // parent.children.concat(item);
          // transform(item.children);
        }
      }
    });
    return parent;
  }
};

module.exports = (request, h) => {
  const jsonData = request.payload;
  return attachChild(jsonData);
};
