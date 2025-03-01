// context/index.js

import React, { createContext, useReducer } from 'react'
import reducer from './reducer'
import * as Actions from './actions'

const FlowContext = createContext()

const initState = {
  // 画布实例
  reactFlowInstance: null,
  // 节点数据、连线数据
  elements: [],
  // 画布数据
  flowData: new Map(),
  businessData: {
    id2node: new Map(),
    param: '',
    nodeType: '',
    sourceNode: '',
    TargetNode: '',
  },

  workFlow: [],
  // 弹窗信息
  modalConfig: {
    visible: false,
    nodeType: '',
    nodeId: '',
  },
}

const FlowContextProvider = (props) => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <FlowContext.Provider value={{ state, dispatch }}>
      {children}
    </FlowContext.Provider>
  )
}

export { FlowContext, FlowContextProvider, Actions }
