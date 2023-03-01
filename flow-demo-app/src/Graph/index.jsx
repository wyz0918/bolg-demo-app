// Graph/index.jsx

import React, { useMemo, useRef, useContext } from 'react'
import ReactFlow, { ReactFlowProvider, Controls } from 'reactflow'
import RelationNode from '../components/Node/RelationNode'
import LinkEdge from '../components/Edge/LinkEdge'
import { FlowContext, Actions } from '../context'
import 'reactflow/dist/style.css'
import {
  initNodes,
  initNodesArr,
  initEdgesArr,
} from './initNodesEdges'
import { nodeShape } from '../Sider/allowedNodes'
import 'reactflow/dist/style.css'

function getHash(len) {
  let length = Number(len) || 8
  const arr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
      ''
    )
  const al = arr.length
  let chars = ''
  while (length--) {
    chars += arr[parseInt(Math.random() * al, 10)]
  }
  return chars
}

export default function FlowGraph(props) {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(FlowContext)
  // eslint-disable-next-line
  const { inputNode, relationNode, outputNode } = initNodes
  const { nodes, edges, reactFlowInstance } = state
  // 画布的 DOM 容器，用于计算节点坐标
  const graphWrapper = useRef(null)

  const setReactFlowInstance = (instance) => {
    dispatch({
      type: Actions.SET_INSTANCE,
      payload: instance,
    })
  }

  // const setNodes = (nodes) => {
  //   dispatch({
  //     type: Actions.SET_NODES,
  //     payload: nodes,
  //   })
  // }

  // 自定义节点
  const nodeTypes = useMemo(() => ({ relation: RelationNode }), [])

  // 自定义连线
  const edgeTypes = useMemo(() => ({ link: LinkEdge }), [])

  const reactFlowBounds = useRef(null)

  // 画布加载完毕，保存当前画布实例
  const onInit = (instance) => {
    setReactFlowInstance(instance)
    dispatch({
      type: Actions.SET_NODES,
      payload: nodes.concat(initNodesArr),
    })
    dispatch({
      type: Actions.SET_EDGES,
      payload: edges.concat(initEdgesArr),
    })

    reactFlowBounds.current =
      graphWrapper.current.getBoundingClientRect()
  }
  // 连线
  // const onConnect = (params) =>
  // setElements(
  //   addEdge(
  //     {
  //       ...params,
  //       type: 'link',
  //     },
  //     elements
  //   )
  // 拖拽完成后放置节点
  const onDrop = (event) => {
    event.preventDefault()

    const transferredNodeData = JSON.parse(
      event.dataTransfer.getData('application/reactflow')
    )
    // eslint-disable-next-line
    const nodeType = transferredNodeData.type
    const nodeDataType = transferredNodeData.dataType
    // console.log(transferredNodeData.type) .match(/(\S*)(?=(\-))/)
    const newNode = {
      id: getHash(),
      type: nodeType,
      className: `react-flow__node-default ${nodeType}-node`,
      dataType: nodeDataType,
    }
    console.log(newNode)

    const { width, height } = nodeShape
    // console.log(width, height)

    const centerPosition = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.current.left + width / 2,
      y: event.clientY - reactFlowBounds.current.top + height / 2,
    })
    // for (const i in nodes) {
    //   console.log(nodes[i])
    // }
    const targetNode = nodes.find(
      (n) =>
        n.dataType === newNode.dataType &&
        centerPosition.x > n.position.x &&
        centerPosition.x < n.position.x + n.style.width &&
        centerPosition.y > n.position.y &&
        centerPosition.y < n.position.y + n.style.height &&
        n.id !== newNode.id
    )
    if (targetNode) {
      const newDraggedNode = {
        ...newNode,
        data: { label: transferredNodeData.name },
        position: targetNode.position,
        style: {
          width,
          height,
        },
      }
      const tmp = nodes.concat(newDraggedNode)
      const newNodeArr = tmp.filter((t) => t !== targetNode)
      dispatch({
        type: Actions.SET_FLOW_NODE,
        payload: {
          id: newDraggedNode.id,
          ...newDraggedNode.data,
        },
      })
      dispatch({
        type: Actions.SET_NODES,
        payload: newNodeArr,
      })
    }
  }

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  return (
    <div className="graph" ref={graphWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onInit={onInit}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}
