import ApiClient from './ApiClient'
import { CATEGORY_API } from '../constants/api'
import { ORGANIZE } from '../constants'
import { get as getGrow } from './grow'

export function list(params) {
    return ApiClient.get(CATEGORY_API, params)
}

export function get(params) {
    return ApiClient.get(`${CATEGORY_API}/detail`, params)
}

export function detail(params) {
    return ApiClient.get(`${CATEGORY_API}/item`, params)
}

function convert(arr, opt, val) {
    return arr.map((item) => {
        if (item.value === val) {
            return {
                ...item,
                children: opt
            }
        }
        return item
    })
}

async function packaging(values) {
    const options = [{
        label: '医学专业人员',
        value: '1',
        isLeaf: false
    }, {
        value: '2',
        label: '普通大众',
        isLeaf: false
    }]
    const num = values.length
    const data = {}
    try {
        for (let i = 0; i < num - 1; i++) {
            const result = await list({
                parent_id: values[i]
            })
            data[values[i]] = result.list.map(item => ({
                label: item.title,
                value: item.id,
                isLeaf: false
            }))
        }
        let opt = []
        for (let i = num - 1; i > 0; i--) {
            if (i === num - 1) {
                opt = data[values[i - 1]]
            } else {
                opt = convert(data[values[i - 1]], opt, values[i])
            }
        }
        if (values[0].toString() === '1') {
            options[0].children = opt
        } else {
            options[1].children = opt
        }
        return options
    } catch (error) {
        return []
    }
}
// id = grow_id
export async function init(id, callback: Function) {
    if (id > 0) {
        try {
            const record = await getGrow({
                category_id: ORGANIZE,
                foreign_id: id
            }).get
            let category
            if (record.id > 0) {
                category = await get({
                    lat: record.lat,
                    lng: record.lng
                }).list
            } else {
                return callback(null, 0, [])
            }
            const length = category.length
            let values = []
            if (record.kind && record.kind.startsWith(2)) {
                values = values.concat(
                    record.kind.slice(0, 1),
                    record.kind.slice(0, 2),
                    record.kind)
                    .concat(category.slice(1, length).map(i => i.id))
            } else if (record.kind && record.kind.startsWith(1)) {
                values = values.concat(record.kind.slice(0, 1), record.kind)
                    .concat(category.slice(1, length).map(i => i.id))
            }
            if (values.length > 0) {
                const options = await packaging(values)
                callback(null, record.id, values, options)
            }
            callback(null, record.id, [], [])
        } catch (error) {
            callback(error, 0, [], [])
        }
    }
    return callback(null, 0, [], [])
}

