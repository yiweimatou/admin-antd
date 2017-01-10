import { ADMIN_DOMAIN } from '../constants/api'
import ApiClient from './ApiClient'

export default function generate(api) {
    return {
        get: params => ApiClient.get(`${ADMIN_DOMAIN}/${api}/get`, params),
        add: params => ApiClient.post(`${ADMIN_DOMAIN}/${api}/add`, params, { needAuth: true }),
        edit: params => ApiClient.post(`${ADMIN_DOMAIN}/${api}/put`, params, { needAuth: true }),
        remove: params => ApiClient.post(`${ADMIN_DOMAIN}/${api}/del`, params, { needAuth: true }),
        info: params => ApiClient.get(`${ADMIN_DOMAIN}/${api}/info`, params),
        list: params => ApiClient.get(`${ADMIN_DOMAIN}/${api}/list`, params),
    }
}
