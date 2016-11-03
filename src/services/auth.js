import ApiClient from './ApiClient'
import {
    USER_LOGIN,
    USER_LOGOUT,
} from '../constants/api'

export function login(mobile: string, pwd: string) {
    return ApiClient.post(USER_LOGIN, {
        mobile, pwd
    })
}

export function logout() {
    return ApiClient.post(USER_LOGOUT, { needAuth: true })
}
