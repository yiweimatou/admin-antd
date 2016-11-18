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
 * grow apis
 */
export const GROW_GET = `${ADMIN_DOMAIN}/grow/get`
export const GROW_INFO = `${ADMIN_DOMAIN}/grow/info`
export const GROW_ADD = `${ADMIN_DOMAIN}/grow/add`
export const GROW_EDIT = `${ADMIN_DOMAIN}/grow/put`
export const GROW_DELETE = `${ADMIN_DOMAIN}/grow/del`
export const GROW_LIST = `${ADMIN_DOMAIN}/grow/list`
/**
 * category api
 */
export const CATEGORY_API = 'http://m.yiweimatou.com/api/area'
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
export const USER_EDIT = `${ADMIN_DOMAIN}account/put/admin`
export const USER_RESET_PWD = `${ADMIN_DOMAIN}/account/put/admin/pwd`
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
/**
 * organize
 */
export const ORGANIZE_ADD = `${ADMIN_DOMAIN}organize/add`
export const ORGANIZE_GET = `${ADMIN_DOMAIN}organize/get`
export const ORGANIZE_INFO = `${ADMIN_DOMAIN}organize/info`
export const ORGANIZE_List = `${ADMIN_DOMAIN}organize/list`
export const ORGANIZE_EDIT = `${ADMIN_DOMAIN}organize/put`
/**
 * organizeTeam
 */
export const ORGANIZE_TEAM_GET = `${ADMIN_DOMAIN}organize_team/get`
export const ORGANIZE_TEAM_EDIT = `${ADMIN_DOMAIN}organize_team/put`
export const ORGANIZE_TEAM_ADD = `${ADMIN_DOMAIN}organize_team/add`
/**
 * lesson
 */
export const LESSON_GET = `${ADMIN_DOMAIN}lesson/get`
export const LESSON_INFO = `${ADMIN_DOMAIN}lesson/info`
export const LESSON_LIST = `${ADMIN_DOMAIN}lesson/list`
export const LESSON_EDIT = `${ADMIN_DOMAIN}lesson/put/admin`
/**
 * lesson TEAM
 */
export const LESSON_TEAM_GET = `${ADMIN_DOMAIN}lesson_team/get`
export const LESSON_TEAM_INFO = `${ADMIN_DOMAIN}lesson_team/info`
export const LESSON_TEAM_LIST = `${ADMIN_DOMAIN}lesson_team/list`
/**
 * section
 */
export const SECTION_INFO = `${ADMIN_DOMAIN}section/info`
export const SECTION_LIST = `${ADMIN_DOMAIN}section/list`
export const SECTION_EDIT = `${ADMIN_DOMAIN}section/put`
export const SECTION_DELETE = `${ADMIN_DOMAIN}section/del`

