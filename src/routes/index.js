import NotFound from '../pages/NotFound'
import App from '../components/app/index'
import DashBoard from '../pages/dashboard'
import Login from '../pages/login'
import addQrcode from '../pages/qrcode/add'
import listQrcode from '../pages/qrcode/list'
import WXLogin from '../pages/login/wxlogin'
import AddOrganize from '../pages/organize/add'
import OrganizeList from '../pages/organize/list'
import EditOrganize from '../pages/organize/edit'
import UserList from '../pages/user/list'
import UserEdit from '../pages/user/edit'
import LessonList from '../pages/lesson/list'
import SectionList from '../pages/section/list'
import { WECHATLOGIN } from '../constants'

const routes = [{
  path: '/',
  indexRoute: { component: DashBoard },
  component: App,
  onEnter: ({ location }) => {
    const query = location.query
    if (query && query.key && query.token) {
      localStorage.uid = query.key
      localStorage.token = query.token
    } else if (!localStorage.token) {
      window.location.replace(WECHATLOGIN)
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
  }, {
    path: 'organize',
    indexRoute: { component: OrganizeList },
    childRoutes: [{
      path: 'add',
      component: AddOrganize
    }, {
      path: 'list',
      component: OrganizeList
    }, {
      path: 'edit/:id',
      component: EditOrganize
    }]
  }, {
    path: 'user',
    indexRoute: { component: UserList },
    childRoutes: [{
      path: 'list',
      component: UserList
    }, {
      path: 'edit/:id',
      component: UserEdit
    }]
  }, {
      path: 'lesson',
      indexRoute: { component: LessonList },
      childRoutes: [{
        path: 'list',
        component: LessonList
      }]
    }, {
      path: 'section',
      indexRoute: { component: SectionList },
      childRoutes: [{
        path: 'list',
        component: SectionList
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
