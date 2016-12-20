import ApiClient from './ApiClient'
import {
  RECORD_CATEGORY_GET,
  RECORD_CATEGORY_ADD,
  RECORD_CATEGORY_INFO,
  RECORD_CATEGORY_EDIT,
  RECORD_CATEGORY_LIST,
  RECORD_CATEGORY_REMOVE
} from '../constants/api'

export function add(params) {
  return ApiClient.post(RECORD_CATEGORY_ADD, params, { needAuth: true })
}

export function get(params) {
  return ApiClient.get(RECORD_CATEGORY_GET, params)
}

export function info(params) {
  return ApiClient.get(RECORD_CATEGORY_INFO, params)
}

export function list(params) {
  return ApiClient.get(RECORD_CATEGORY_LIST, params)
}

export function remove(params) {
  return ApiClient.post(RECORD_CATEGORY_REMOVE, params, { needAuth: true })
}

export function edit(params) {
  return ApiClient.post(RECORD_CATEGORY_EDIT, params, { needAuth: true })
}
