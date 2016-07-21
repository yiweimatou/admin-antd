import rootSaga from './index'
const sagas = [rootSaga]

const SagaManager = {
  startSagas(sagaMiddleware) {
    sagas.forEach(saga => {
      sagaMiddleware.run(saga)
    })
  }
}

export default SagaManager
