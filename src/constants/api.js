const HOST = 'http://api.yiweimatou.com'

export const ADMIN_DOMAIN = `${HOST}:4001/`
export const UPLOAD_DOMAIN = 'http://image.yiweimatou.com:999'
/**
 * default images
 */
export const DEFAULT_FACE = 'http://image.yiweimatou.com/ywmt/face/default.png'
export const DEFAULT_COVER = 'http://image.yiweimatou.com/ywmt/cover/lesson.png'
export const DEFAULT_LOGO = 'http://image.yiweimatou.com/ywmt/logo/default.png'
export const DEFAULT_TOPICS = 'http://image.yiweimatou.com/topics.png'
/**
 * api codes
 */
export const OK = 200
export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const FORBIDDEN = 403
export const INTERNAL_SERVER_ERROR = 500

export const HTML_GET = `${UPLOAD_DOMAIN}/header/info`
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
 * upload apis
 */
export const UPLOAD_YUNBOOK_API = `${UPLOAD_DOMAIN}/book/img`
export const UPLOAD_LOGO_API = `${UPLOAD_DOMAIN}/logo`
export const UPLOAD_AVATAR_API = `${UPLOAD_DOMAIN}/face`
export const UPLOAD_COVER_API = `${UPLOAD_DOMAIN}/cover`
export const UPLOAD_PPT_API = `${UPLOAD_DOMAIN}/book/ppt`
export const UPLOAD_IMG_API = `${UPLOAD_DOMAIN}/img`
export const UPLOAD_FILE_API = `${UPLOAD_DOMAIN}/file`
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
export const SECTION_ADMIN_ADD = `${ADMIN_DOMAIN}section/admin/add`
/**
 * h5
 */
export const H5_ADMIN_ADD = `${ADMIN_DOMAIN}/h5/admin/add`
export const H5_ADMIN_EDIT = `${ADMIN_DOMAIN}/h5/admin/put`
export const H5_ADMIN_DEL = `${ADMIN_DOMAIN}/h5/admin/del`
export const H5_LIST = `${ADMIN_DOMAIN}/h5/list`
export const H5_INFO = `${ADMIN_DOMAIN}/h5/info`
export const H5_GET = `${ADMIN_DOMAIN}/h5/get`
/**
 * source apis
 */
export const SOURCE_GET_API = `${ADMIN_DOMAIN}/source/get`
export const SOURCE_Add_API = `${ADMIN_DOMAIN}/source/add`
export const SOURCE_INFO_API = `${ADMIN_DOMAIN}/source/info`
export const SOURCE_LIST_API = `${ADMIN_DOMAIN}/source/list`
export const SOURCE_EDIT_API = `${ADMIN_DOMAIN}/source/put`
export const SOURCE_DELETE_API = `${ADMIN_DOMAIN}/source/del`
/**
* records_category apis
*/
export const RECORD_CATEGORY_GET = `${ADMIN_DOMAIN}/records_category/get`
export const RECORD_CATEGORY_EDIT = `${ADMIN_DOMAIN}/records_category/put`
export const RECORD_CATEGORY_INFO = `${ADMIN_DOMAIN}/records_category/info`
export const RECORD_CATEGORY_LIST = `${ADMIN_DOMAIN}/records_category/list`
export const RECORD_CATEGORY_REMOVE = `${ADMIN_DOMAIN}/records_category/del`
export const RECORD_CATEGORY_ADD = `${ADMIN_DOMAIN}/records_category/add`
