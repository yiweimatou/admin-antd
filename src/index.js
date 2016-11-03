import React from 'react'
import ReactDom from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { message } from 'antd'
import routes from './routes/index'

message.config({
  duration: 6
})

ReactDom.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('root')
)
