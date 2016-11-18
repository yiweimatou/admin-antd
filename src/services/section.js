import array from 'lodash/array'
import ApiClient from './ApiClient'
import { SECTION_EDIT, SECTION_INFO, SECTION_LIST, LESSON_TEAM_LIST, SECTION_DELETE } from '../constants/api'
import { get as getUser, } from './user'
import { listAsync as getLessonList } from './lesson'

export function edit(params: Object) {
    return ApiClient.post(SECTION_EDIT, params, { needAuth: true })
}

export function remove(params: Object) {
    return ApiClient.post(SECTION_DELETE, params, { needAuth: true })
}

export async function info(params: Object, callback: Function) {
    let user = { get: {} }
    if (params.mobile || params.cname) {
        user = await getUser({ mobile: params.mobile, cname: params.cname })
        if (!user.get.id) {
            return callback(0)
        }
    }
    let lessonTeamList = { list: [] }
    if (user.get.id > 0) {
        lessonTeamList = await ApiClient.get(LESSON_TEAM_LIST, { account_id: user.get.id, role: 1 })
        if (lessonTeamList.list.length === 0) {
            return callback(0)
        }
    }
    let lesson = []
    if (params.lessonTitle || lessonTeamList.list.length > 0) {
        lesson = await getLessonList({
            id_list: lessonTeamList.list.map(i => i.lesson_id).join(','),
            title: params.lessonTitle
        })
        if (lesson.length === 0) {
            return callback(0)
        }
    }
    const data = await ApiClient.get(SECTION_INFO, {
        title: params.sectionTitle,
        state_list: '1,2',
        lesson_id_list: lesson.map(i => i.id).join(',')
    })
    callback(data.count)
}

export function list(params: Object) {
    return ApiClient.get(SECTION_LIST, params)
}

/* eslint consistent-return: 0 */
export async function listAll(params: Object, callback: Function) {
    try {
        let user = { get: {} }
        if (params.mobile || params.cname) {
            user = await getUser({ mobile: params.mobile, cname: params.cname })
            if (!user.get.id) {
                return callback(null, null)
            }
        }
        let lessonTeamList = { list: [] }
        if (user.get.id > 0) {
            lessonTeamList = await ApiClient.get(LESSON_TEAM_LIST, { account_id: user.get.id, role: 1 })
            if (lessonTeamList.list.length === 0) {
                return callback(null, null)
            }
        }
        let lesson = []
        if (params.lessonTitle || lessonTeamList.list.length > 0) {
            lesson = await getLessonList({
                id_list: lessonTeamList.list.map(i => i.lesson_id).join(','),
                title: params.lessonTitle
            })
            if (lesson.length === 0) {
                return callback(null, null)
            }
        }
        const sectionList = await list({
            title: params.sectionTitle,
            limit: params.limit || 6,
            offset: params.offset || 1,
            state_list: '1,2',
            lesson_id_list: lesson.map(i => i.id).join(',')
        })
        if (sectionList.list.length === 0) {
            return callback(null, null)
        }
        if (lesson.length === 0) {
            const ids = array.uniq(sectionList.list.map(i => i.lesson_id)).join(',')
            lesson = await getLessonList({ id_list: ids })
        }
        // if (user.get.id) {
        //     callback(null, sectionList.list.map((item) => {
        //             const lessonTemp = lesson.list.find(i => i.id === item.lesson_id)
        //             return {
        //                 ...item,
        //                 lessonTitle: (lessonTemp && lessonTemp.title) || '',
        //                 cname: user.get.cname,
        //                 mobile: user.get.mobile
        //             }
        //     }))
        // }
        // lessonTeamList = await ApiClient.get(LESSON_TEAM_LIST, { lesson_id_list: sectionList.list.map(i => i.lesson_id).join(','), role: 1 })
        // if (lessonTeamList.list.length === 0) {
        //     user.list = []
        // } else {
        //     user = await getUserList({ id_list: lessonTeamList.list.map(i => i.account_id) })
        // }
        const result = sectionList.list.map((item) => {
            const lessonTemp = lesson && lesson.find(i => i.id === item.lesson_id)
            // const lessonTeamTemp = lessonTeamList.list.find(i => i.lesson_id === item.lesson_id)
            // const userTemp = lessonTeamTemp && user.list.find(i => i.id === lessonTeamTemp.account_id)
            // return {
            //     ...item,
            //     cname: (userTemp && userTemp.cname) || '',
            //     mobile: (userTemp && userTemp.mobile) || '',
            //     lessonTitle: (lessonTemp && lessonTemp.title) || ''
            // }
            if (lessonTemp) {
                return {
                    ...item,
                    cname: lessonTemp.cname,
                    mobile: lessonTemp.mobile,
                    lessonTitle: lessonTemp.title
                }
            }
            return item
        })
        callback(null, result)
    } catch (error) {
        callback(error)
    }
}
