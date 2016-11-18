import ApiClient from './ApiClient'
import { list as getUserList } from './user'
// import array from 'lodash/array'
import { LESSON_EDIT, LESSON_INFO, LESSON_LIST, LESSON_TEAM_LIST } from '../constants/api'

export function info(params: Object) {
    return ApiClient.get(LESSON_INFO, params)
}

export async function list(params: Object, callback: Function) {
    try {
        const lessonList = await ApiClient.get(LESSON_LIST, params)
        const lessonIds = lessonList.list.map(i => i.id).join(',')
        const lessonTeamList = await ApiClient.get(LESSON_TEAM_LIST, { lesson_id_list: lessonIds, role: 1 })
        const userIds = lessonTeamList.list.map(i => i.account_id)
        const userList = await getUserList({ id_list: userIds })
        callback(null, lessonList.list.map((item) => {
            const userId = lessonTeamList.list.find(i => i.lesson_id === item.id)
            if (userId) {
                const user = userList.list.find(val => val.id === userId.account_id)
                return {
                    ...item,
                    cname: user && user.cname,
                    mobile: user && user.mobile
                }
            }
            return item
        }))
    } catch (error) {
        callback(error)
    }
}

export async function listAsync(params: Object) {
    try {
        const lessonList = await ApiClient.get(LESSON_LIST, params)
        const lessonIds = lessonList.list.map(i => i.id).join(',')
        const lessonTeamList = await ApiClient.get(LESSON_TEAM_LIST, { lesson_id_list: lessonIds, role: 1 })
        const userIds = lessonTeamList.list.map(i => i.account_id)
        const userList = await getUserList({ id_list: userIds })
        return lessonList.list.map((item) => {
            const userId = lessonTeamList.list.find(i => i.lesson_id === item.id)
            if (userId) {
                const user = userList.list.find(val => val.id === userId.account_id)
                return {
                    ...item,
                    cname: user && user.cname,
                    mobile: user && user.mobile
                }
            }
            return item
        })
    } catch (error) {
        return []
    }
}

export function edit(params: Object) {
    return ApiClient.post(LESSON_EDIT, params, { needAuth: true })
}
