import ApiClient from './ApiClient'
import { USER_GET, USER_INFO, USER_LIST, USER_EDIT, USER_RESET_PWD } from '../constants/api'

export function get(params: Object) {
    return ApiClient.get(USER_GET, params, { needAuth: true })
}

export function info(params: Object) {
    return ApiClient.get(USER_INFO, params)
}

export function list(params: Object) {
    return ApiClient.get(USER_LIST, params)
}

export function edit(params: Object) {
    return ApiClient.post(USER_EDIT, params, { needAuth: true })
}

export function resetPassword(id) {
    return ApiClient.post(USER_RESET_PWD, { id }, { needAuth: true })
}
