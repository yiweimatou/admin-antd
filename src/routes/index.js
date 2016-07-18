import MainContainer from '../containers/MainContainer'
import Dashboard from '../components/Dashboard'
import NotFound from '../components/NotFound'

const routes = store => ({
    path: '/',
    component: MainContainer,
    indexRoute: {
        component: Dashboard
    },
    childRoutes: [{
        path: 'dashboard',
        component: Dashboard
    }, {
        path: '*',
        component: NotFound
    }]
})

export default routes