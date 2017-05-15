import generator from './generator'
import deviceTypeService from './device_type'

const DeviceService = generator('device')

DeviceService.syncList = async (params) => {
    try {
        const data = DeviceService.list(params)
        if (data.list.length > 0) {
            const typeIds = data.list.map(v => v.type_id).join(',')
            const types = await deviceTypeService.list({ id_list: typeIds })
            data.list = data.list.map((v) => {
                const type = types.list.find(x => x.id === v.typs_id)
                if (type) {
                    return {
                        ...v,
                        type_name: type.name
                    }
                }
                return v
            })
        }
        return data.list
    } catch (error) {
        return []
    }
}

export default DeviceService
