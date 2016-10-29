import NotFound from '../pages/NotFound'
import App from '../components/app'
import DashBoard from '../pages/dashboard'

const routes = [{
  path: '/',
  indexRoute: { component: DashBoard },
  component: App
}, {
    path: '*',
    component: NotFound
}]

export default routes
