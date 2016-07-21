const HOST = 'http://121.41.92.56'

export const ADMIN_BASE_URL = `${HOST}:90/`
export const USER_BASE_URL = `${HOST}:91/`

/**
 * api codes
 */
export const OK = 200
export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const FORBIDDEN = 403
export const INTERNAL_SERVER_ERROR = 500
/**
 * Login
 */
export const ADMIN_LOGIN_API = `${ADMIN_BASE_URL}admin/login`
export const ADMIN_LOGOUT_API = `${ADMIN_BASE_URL}admin/logout`
export const ADMIN_PUT_API = `${ADMIN_BASE_URL}admin/put`
/**
 * User
 */
export const USER_ADD_API = `${ADMIN_BASE_URL}user/add`
export const USER_GET_API = `${ADMIN_BASE_URL}user/get`
export const USER_PUT_API = `${ADMIN_BASE_URL}user/put`
export const USER_LIST_API = `${ADMIN_BASE_URL}user/list`
export const USER_INFO_API = `${ADMIN_BASE_URL}user/info`
/**
 * Organize
 */
export const ORG_ADD_API = `${ADMIN_BASE_URL}organize/add`
export const ORG_PUT_API = `${ADMIN_BASE_URL}organize/put`
export const ORG_LIST_API = `${ADMIN_BASE_URL}organize/list`
export const ORG_INFO_API = `${ADMIN_BASE_URL}organize/info`
export const ORG_GET_API = `${ADMIN_BASE_URL}organize/get`
/**
 * Area
 */
export const AREA_GET_API = `${ADMIN_BASE_URL}area/get`
export const AREA_LIST_API = `${ADMIN_BASE_URL}area/list`
export const AREA_INFO_API = `${ADMIN_BASE_URL}area/info`