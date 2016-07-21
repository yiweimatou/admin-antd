import {
    takeLatest
} from 'redux-saga'
import {
    fork,put,call
} from 'redux-saga/effects'
import {
    login,
    changePassword
} from '../services/auth'
import {
    message
} from 'antd'

function* loginHandler(action){
    try {
        const {
            account,
            pwd
        } = action.payload
        const res = yield call(login,account,pwd)
        const {
            key,token
        } = res
        const lastLoginTime = Date.now()
        yield put({
            type:'login/success',
            payload:{
                key,token,lastLoginTime
            }
        })
        localStorage.setItem('auth',JSON.stringify({
            key,token,isAuthed:true,lastLoginTime
        }))
        message.success('登录成功!')
    } catch (error) {
        message.error(error)
        yield put({
            type:'login/failure'
        })
    }
}

function* watchLogin(){
    yield* takeLatest('login',loginHandler)
}

function* watchLogout() {
    yield* takeLatest('logout',function(){
        localStorage.clear()
        message.success('成功登出')
        window.location.reload()
    })
}

function* changePasswordHandler(action){
    try {
        const {
            pwd,
            old_pwd
        } = action.payload
        yield call(changePassword,old_pwd,pwd)
        yield put({
            type:'changePassword/success'
        })
        message.success('修改成功!')
    } catch (error) {
        message.error(error)
        yield put({
            type:'changePassword/failure'
        })
    }
}

function* watchChangePassword() {
    yield* takeLatest('changePassword',changePasswordHandler)
}

export default function* () {
    yield [
        fork(watchLogin),
        fork(watchLogout),
        fork(watchChangePassword)
    ]
}