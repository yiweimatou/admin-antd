import ApiClient from './ApiClient'
import { list as getUserList } from './user'
// import array from 'lodash/array'
import { LESSON_EDIT, LESSON_INFO, LESSON_LIST, LESSON_TEAM_LIST } from '../constants/api'

export function info(params: Object) {
    return ApiClient.get(LESSON_INFO, params)
}

export async function asyncInfo(params: Object, callback: Function) {
  try {
    const { cname, mobile, ...rest } = params
    let count = 0
    if (cname || mobile) {
      const users = await getUserList({ cname, mobile })
      if (users.list && users.list.length > 0) {
        const teams = await ApiClient.get(LESSON_TEAM_LIST, {
          account_id_list: users.list.map(i => i.id).join(','),
          role: 1,
          offset: 1,
          limit: 10000
        })
        if (teams.list && teams.list.length > 0) {
          const result = await info({ ...rest, id_list: teams.list.map(i => i.lesson_id).join(',') })
          count = result.count
        }
      }
    } else {
      const result = await info(rest)
      count = result.count
    }
    callback(null, count)
  } catch (error) {
    callback(error)
  }
}

export async function list(params: Object, callback: Function) {
    try {
      const { cname, mobile, ...rest } = params
      let result = []
      if (cname || mobile) {
        const userList = await getUserList({ cname, mobile, offset: 1, limit: 10000 })
        if (userList.list && userList.list.length > 0) {
          const lessonTeamList = await ApiClient.get(LESSON_TEAM_LIST, {
            account_id_list: userList.list.map(i => i.id).join(','),
            role: 1,
            offset: 1,
            limit: 10000
          })
          if (lessonTeamList.list && lessonTeamList.list.length > 0) {
            const lessons = await ApiClient.get(LESSON_LIST, {
              id_list: lessonTeamList.list.map(i => i.lesson_id).join(','),
              ...rest
            })
            if (lessons.list && lessons.list.length > 0) {
              result = lessons.list.map((item) => {
                const lessonTeam = lessonTeamList.list.find(i => i.lesson_id === item.id)
                if (lessonTeam) {
                  const user = userList.list.find(i => i.id === lessonTeam.account_id)
                  if (user) {
                    item.cname = user.cname
                    item.mobile = user.mobile
                  }
                }
                return item
              })
            }
          }
        }
      } else {
        const lessons = await ApiClient.get(LESSON_LIST, rest)
        if (lessons.list && lessons.list.length > 0) {
          const lessonTeamList = await ApiClient.get(LESSON_TEAM_LIST, {
            lesson_id_list: lessons.list.map(i => i.id).join(','),
            role: 1,
            offset: 1,
            limit: 10000
          })
          if (lessonTeamList.list && lessonTeamList.list.length > 0) {
            const userList = await getUserList({ id_list: lessonTeamList.list.map(i => i.account_id).join(',') })
            if (userList.list && userList.list.length > 0) {
              result = lessons.list.map((item) => {
                const team = lessonTeamList.list.find(i => i.lesson_id === item.id)
                if (team) {
                  const user = userList.list.find(i => i.id === team.account_id)
                  if (user) {
                    item.cname = user.cname
                    item.mobile = user.mobile
                  }
                }
                return item
              })
            }
          }
        }
      }
      callback(null, result)
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
