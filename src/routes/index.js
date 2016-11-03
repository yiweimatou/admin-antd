import NotFound from '../pages/NotFound'
import App from '../components/app/index'
import DashBoard from '../pages/dashboard'
import Login from '../pages/login'
import addQrcode from '../pages/qrcode/add'
import listQrcode from '../pages/qrcode/list'
import WXLogin from '../pages/login/wxlogin'
import QRCodeResult from '../pages/qrcode/result'

const routes = [{
  path: '/',
  indexRoute: { component: DashBoard },
  component: App,
  onEnter: ({ location }, replace) => {
    if (!localStorage.token) {
      replace(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`)
    }
  },
  childRoutes: [{
    path: 'dashboard',
    component: DashBoard
  }, {
    path: 'qrcode',
    indexRoute: { component: listQrcode },
    childRoutes: [{
      path: 'add',
      component: addQrcode
    }, {
      path: 'list',
      component: listQrcode
    }]
  }]
}, {
  path: '/login',
  component: Login
}, {
  path: '/wxlogin',
  component: WXLogin
}, {
    path: '*',
    component: NotFound
}]

export default routes
