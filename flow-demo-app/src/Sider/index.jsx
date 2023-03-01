// Sider/index.jsx

import React from 'react'
import classnames from 'classnames'
import { useNodes } from 'reactflow'
import { allowedNodes } from './allowedNodes'

// const allowedNodes =
// 可用节点
// const allowedNodes = [
//   {
//     name: 'Input Node',
//     className: 'input-node',
//     type: 'input',
//   },
//   {
//     name: 'Relation Node',
//     className: 'relation-node',
//     type: 'relation', // 这是自定义节点类型
//   },
//   {
//     name: 'Output Node',
//     className: 'output-node',
//     type: 'output',
//   },
// ]

export default function FlowSider() {
  // 获取画布上的节点
  const nodes = useNodes()
  const onDragStart = (evt, node) => {
    // 记录被拖拽的节点类型

    evt.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(node)
    )
    evt.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="sider">
      <div className="nodes">
        {allowedNodes.map((x, i) => (
          <div
            key={`${x.dataType}-${i}`}
            className={classnames(['sider-node', x.className])}
            onDragStart={(e) => onDragStart(e, x)}
            draggable
          >
            {x.name}
          </div>
        ))}
      </div>
      <div className="print">
        <div className="print-line">
          节点数量：{nodes?.length || '-'}
        </div>
        <ul className="print-list">
          {nodes.map((x) => (
            <li key={x.id} className="print-item">
              <span className="print-item-title">{x.data.label}</span>
              <span className="print-item-tips">({x.type})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
