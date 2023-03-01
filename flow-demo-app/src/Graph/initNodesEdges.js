// 可用节点
const initNodes = {
  inputNode: {
    id: 'input-node',
    position: { x: 0, y: 100 },
    data: { label: 'Input Node' },
    type: 'input',
    dataType: 'operator1',
    style: {
      width: 150,
      height: 40,
    },
    className: 'default-node',
  },
  relationNode: {
    id: 'relation-node',
    position: { x: 0, y: 250 },
    data: { label: 'Relation Node' },
    type: 'default',
    dataType: 'operator2',
    style: {
      width: 150,
      height: 40,
    },
    className: 'default-node',
  },
  outputNode: {
    id: 'output-node',
    position: { x: 0, y: 400 },
    data: { label: 'Output Node' },
    type: 'output',
    dataType: 'operator3',

    style: {
      width: 150,
      height: 40,
    },
    className: 'default-node',
  },
}
const { inputNode, relationNode, outputNode } = initNodes

const initNodesArr = [inputNode, relationNode, outputNode]

const initEdgesArr = [
  {
    id: 'input-relation',
    type: 'straight',
    source: 'input-node',
    target: 'relation-node',
    animated: true,
    // label: 'edge label',
  },
  {
    id: 'relation-output',
    type: 'straight',
    source: 'relation-node',
    target: 'output-node',
    animated: true,
    // label: 'edge label',
  },
]

export { initNodes, initNodesArr, initEdgesArr }
