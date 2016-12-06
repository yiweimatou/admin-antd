import ApiClient from './ApiClient'
import {
    H5_ADMIN_ADD, H5_ADMIN_EDIT, H5_ADMIN_DEL, H5_GET, H5_LIST, H5_INFO
} from '../constants/api'

export function add(params) {
    return ApiClient.post(H5_ADMIN_ADD, params, { needAuth: true })
}

export function edit(params) {
    return ApiClient.post(H5_ADMIN_EDIT, params, { needAuth: true })
}

export function remove(params) {
    return ApiClient.post(H5_ADMIN_DEL, params, { needAuth: true })
}

export function get(params) {
    return ApiClient.get(H5_GET, params)
}

export function list(params) {
    return ApiClient.get(H5_LIST, params)
}

export function info(params) {
    return ApiClient.get(H5_INFO, params)
}
