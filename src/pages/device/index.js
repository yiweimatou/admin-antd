import React, { Component } from 'react'
import { Table, Button, message } from 'antd'
import deviceService from '../../services/device'
import DeviceAdd from './add'

class Device extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            total: 0,
            dataSource: [],
            visible: false,
        }
    }
    componentWillMount() {
        this.infoHandler()
    }

    toggleVisible = () => this.setState(prveState => ({
        visible: !prveState.visible
    }))

    infoHandler = () => {
        deviceService.info({ status: 0 }).then((data) => {
            if (data.count === 0) {
                this.setState({ dataSource: [], total: 0 })
            } else {
                this.listHandler(1)
            }
        }).catch(err => message.error(err))
    }

    listHandler = (offset) => {
        this.setState({ loading: true })
        const dataSource = deviceService.syncList({
            offset, limit: 9, status: 0
        })
        this.setState({ loading: false, dataSource })
    }

    deleteHandler = (id) => {
        deviceService.remove({ id }).then(() => {
            message.success('删除成功')
            this.setState(prevState => ({
                dataSource: prevState.dataSource.filter(v => v.id !== id),
                total: prevState.total - 1
            }))
        }).catch(err => message.error(err))
    }
    okHandler = (device) => {
        deviceService.add(device).then((data) => {
            this.setState(prevState => ({
                dataSource: prevState.dataSource.concat({
                    ...device,
                    id: data.identity
                }),
                visible: false,
                total: prevState.total + 1
            }))
        }).catch(err => message.error(err))
    }
    render() {
        const { loading, total, dataSource, visible } = this.state

        const columns = [
            { title: '标识符', key: 'idcard', dataIndex: 'idcard' },
            { title: '设备类型', key: 'type_name', dataIndex: 'type_name' },
            { title: '备注', key: 'remark', dataIndex: 'remark' },
            { title: '操作', key: 'oper', render: (text, record) => <Button onClick={() => this.deleteHandler(record.id)}>删除</Button> }
        ]
        const pagination = {
            total,
            showTotal: num => `共${num}条`,
            onChange: this.listHandler
        }
        return (
            <div>
                <Button style={{ marginBottom: 20 }} onClick={this.toggleVisible}>新增设备</Button>
                <DeviceAdd visible={visible} okHandler={this.okHandler} cancelHandler={this.toggleVisible} />
                <Table bordered loading={loading} dataSource={dataSource} columns={columns} pagination={pagination} />
            </div>
        )
    }
}

export default Device
