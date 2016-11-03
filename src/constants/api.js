const HOST = 'http://api.yiweimatou.com'

export const ADMIN_DOMAIN = `${HOST}:4001/`

/**
 * api codes
 */
export const OK = 200
export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const FORBIDDEN = 403
export const INTERNAL_SERVER_ERROR = 500
/**
 * Auth
 */
export const USER_LOGIN = `${ADMIN_DOMAIN}account/login`
export const USER_LOGOUT = `${ADMIN_DOMAIN}account/logout`
/**
 * user
 */
export const USER_GET = `${ADMIN_DOMAIN}account/get`
export const USER_INFO = `${ADMIN_DOMAIN}account/info`
export const USER_LIST = `${ADMIN_DOMAIN}account/list`
/**
 * qrcode
 */
export const QRCODE_ADD = `${ADMIN_DOMAIN}qr_code/add`
export const QRCODE_LIST = `${ADMIN_DOMAIN}qr_code/list`
export const QRCODE_GET = `${ADMIN_DOMAIN}qr_code/get`
export const QRCODE_INFO = `${ADMIN_DOMAIN}qr_code/info`
export const QRCODE_REMOVE = `${ADMIN_DOMAIN}qr_code/del`
export const QRCODE_EDIT = `${ADMIN_DOMAIN}qr_code/put`
export const QRCODE_ZIP = `${ADMIN_DOMAIN}qr_code/zip`
