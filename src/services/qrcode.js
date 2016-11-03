import ApiClient from './ApiClient'
import { QRCODE_ADD, QRCODE_EDIT, QRCODE_LIST, QRCODE_INFO, QRCODE_GET, QRCODE_ZIP } from '../constants/api'

export function get(params) {
    return ApiClient.get(QRCODE_GET, params)
}

export function add(params) {
    return ApiClient.post(QRCODE_ADD, params, { needAuth: true })
}

export function edit(params) {
    return ApiClient.post(QRCODE_EDIT, params, { needAuth: true })
}

export function info(params) {
    return ApiClient.get(QRCODE_INFO, params)
}

export function list(params) {
    return ApiClient.get(QRCODE_LIST, params)
}

export function download(params) {
    return ApiClient.post(QRCODE_ZIP, params, { needAuth: true })
}
