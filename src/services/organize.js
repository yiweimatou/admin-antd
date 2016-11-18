import ApiClient from './ApiClient'
import {
    ORGANIZE_ADD,
    ORGANIZE_EDIT,
    ORGANIZE_List,
    ORGANIZE_GET,
    ORGANIZE_INFO
} from '../constants/api'

export function get(params) {
    return ApiClient.get(ORGANIZE_GET, params)
}

export function info(params) {
    return ApiClient.get(ORGANIZE_INFO, params)
}

export function edit(params) {
    return ApiClient.post(ORGANIZE_EDIT, params, { needAuth: true })
}

export function list(params) {
    return ApiClient.get(ORGANIZE_List, params)
}

export function add(params) {
    return ApiClient.post(ORGANIZE_ADD, params, { needAuth: true })
}
