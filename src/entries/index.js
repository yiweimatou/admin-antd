import React from 'react'
import { render } from 'react-dom'
import {
    browserHistory
} from 'react-router'
import {
    syncHistoryWithStore
} from 'react-router-redux'
import configStore from '../store'
import AppContainer from '../containers/AppContainer'
import './index.css'

const authorization = localStorage.getItem('auth')
const initialState = authorization?{auth:JSON.parse(authorization)}:{}
const store = configStore(initialState,browserHistory)
const history = syncHistoryWithStore(browserHistory,store,{
    selectLocationState:state => state.routing
})
render(
    <AppContainer
        history={history}
        store={store}
    />,
    document.getElementById('root')
)
