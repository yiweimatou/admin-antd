import ApiClient from './ApiClient'
import {
    ORGANIZE_TEAM_GET, ORGANIZE_TEAM_EDIT
} from '../constants/api.js'

export function get(params) {
    return ApiClient.get(ORGANIZE_TEAM_GET, params)
}

export function edit(params) {
    return ApiClient.post(ORGANIZE_TEAM_EDIT, params, { needAuth: true })
}
