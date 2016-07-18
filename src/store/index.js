import {
    compose,
    applyMiddleware,
    createStore,
    combineReducers
} from 'redux'
import {
    routerMiddleware,
    routerReducer as routing
} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import SagaManager from '../sagas/SagaManager'
import reducers from '../reducers'

export default (initialState = {}, history) => {
    const middleware = routerMiddleware(history)
    const sagaMiddleware = createSagaMiddleware()
    const enhancer = compose(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
    const store = createStore(combineReducers({
        ...reducers,
        routing,
    }), initialState, enhancer)
    SagaManager.startSagas(sagaMiddleware)
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const reducers = require('../reducers');
            const combinedReducers = combineReducers({...reducers,
                routing
            });
            store.replaceReducer(combinedReducers);
        })
        module.hot.accept('../sagas/SagaManager', () => {
            SagaManager.cancelSagas(store);
            require('../sagas/SagaManager').default.startSagas(sagaMiddleware);
        })
    }
    return store
}