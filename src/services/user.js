import ApiClient from './ApiClient'
import { USER_GET, USER_INFO, USER_LIST } from '../constants/api'

export function get(params: Object) {
    return ApiClient.get(USER_GET, params, { needAuth: true })
}

export function info(params: Object) {
    return ApiClient.get(USER_INFO, params)
}

export function list(params: Object) {
    return ApiClient.get(USER_LIST, params)
}
