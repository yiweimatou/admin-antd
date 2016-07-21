import ApiClient from './ApiClient'
import {
    ADMIN_LOGIN_API,
    ADMIN_LOGOUT_API,
    ADMIN_PUT_API
} from '../constants/api'

export function login(account,pwd) {
    return ApiClient.post(ADMIN_LOGIN_API,{
        account,pwd
    })
}

export function logout() {
    return ApiClient.get(ADMIN_LOGOUT_API,null,{needAuth:true})
}

export function changePassword(old_pwd,pwd) {
    return ApiClient.put(ADMIN_PUT_API,{
        old_pwd,pwd
    })
}