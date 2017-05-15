import React, { Component } from 'react'
import { Table, Button, message } from 'antd'
import deviceTypeService from '../../../services/device_type'
import DeviceTypeAdd from './add'

class DeviceType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            dataSource: [],
            total: 0,
            visible: false,
        }
    }

    componentWillMount() {
        this.infoHandler()
    }

    infoHandler = () => {
        deviceTypeService.info({}).then((data) => {
            if (data.count === 0) {
                this.setState({
                    dataSource: [],
                    total: 0
                })
            } else {
                this.listHandler(1)
            }
        })
    }

    listHandler = (offset) => {
        this.setState({ loading: true })
        deviceTypeService.list({
            offset, limit: 9, status: 0
        }).then((data) => {
            this.setState({
                dataSource: data.list,
                loading: false
            })
        })
    }

    okHandler = type =>
        deviceTypeService.add(type).then((data) => {
            type.id = data.identity
            this.setState(prevState => ({
                dataSource: prevState.dataSource.concat(type),
                total: prevState.total + 1,
                visible: false
            }))
        }).catch(err => message.error(err))

    deleteHandler = id =>
        deviceTypeService.remove({ id }).then(() => {
            message.success('删除成功')
            this.setState(prevState => ({
                dataSource: prevState.dataSource.filter(v => v.id !== id),
                total: prevState.total - 1
            }))
        }).catch(err => message.error(err))

    render() {
        const { loading, total, dataSource, visible } = this.state
        const columns = [
            { title: 'id', key: 'id', dataIndex: 'id' },
            { title: '名称', key: 'name', dataIndex: 'name' },
            { title: '备注', key: 'remark', dataIndex: 'remark' },
            { title: '操作', key: 'opea', render: (text, record) => <Button onClick={() => this.deleteHandler(record.id)}>删除</Button> }
        ]
        const pagiantion = {
            total,
            showTotal: num => `共${num}条`,
            onChange: this.listHandler
        }
        return (
            <div>
                <Button onClick={() => this.setState({ visible: true })} style={{ marginBottom: 20 }} type="primary">新增</Button>
                <DeviceTypeAdd
                  visible={visible}
                  cancelHandler={() => this.setState({ visible: false })}
                  okHandler={this.okHandler}
                />
                <Table rowKey="id" loading={loading} dataSource={dataSource} bordered columns={columns} pagination={pagiantion} />
            </div>
        )
    }
}

export default DeviceType
