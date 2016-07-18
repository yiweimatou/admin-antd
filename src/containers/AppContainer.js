import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import routesFunc from '../routes'

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render () {
    const { history, store } = this.props
    const routes = routesFunc(store)    
    return (
      <Provider store = { store }>
          <Router 
            history = { history } 
            routes = { routes }
            onUpdate = { () => window.scrollTo(0, 0) }
           />
      </Provider>
    )
  }
}

export default AppContainer
