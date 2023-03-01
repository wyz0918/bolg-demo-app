const allowedNodes = [
  {
    name: '算子1',
    className: 'input-node',
    type: 'input',
    dataType: 'operator1',
  },
  {
    name: '算子2',
    className: 'relation-node',
    type: 'relation', //
    dataType: 'operator2',
  },
  {
    name: '算子3',
    className: 'output-node',
    type: 'output',
    dataType: 'operator3',
  },
]
const nodeShape = {
  width: 150,
  height: 40,
}
export { allowedNodes, nodeShape }
