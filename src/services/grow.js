import ApiClient from './ApiClient'
import {
    GROW_ADD, GROW_GET, GROW_EDIT
} from '../constants/api'

export function get(params) {
    return ApiClient.get(GROW_GET, params)
}

export function add(params) {
    return ApiClient.post(GROW_ADD, params, { needAuth: true })
}

export function edit(params) {
    return ApiClient.post(GROW_EDIT, params, { needAuth: true })
}

