import React, { Component } from 'react'
import { message, Table, Icon, Button } from 'antd'
import Add from './add'
import Edit from './edit'
import helpService from '../../services/help'

class Help extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            total: 0,
            loading: false,
            addVisible: false,
            editVisible: false,
            record: {}
        }
        this.onAddVisibleToggle = this.onAddVisibleToggle.bind(this)
        this.onAddOk = this.onAddOk.bind(this)
        this.onEditVisibleToggle = this.onEditVisibleToggle.bind(this)
        this.onEditOk = this.onEditOk.bind(this)
        this.listHandler = this.listHandler.bind(this)
        this.infoHandler = this.infoHandler.bind(this)
    }
    componentWillMount() {
        this.infoHandler()
    }
    onAddVisibleToggle() {
        this.setState(prevState => ({
            addVisible: !prevState.addVisible
        }))
    }
    onEditVisibleToggle() {
        this.setState(prevState => ({
            editVisible: !prevState.editVisible
        }))
    }
    onAddOk(params) {
        return helpService.add(params).then((data) => {
            this.setState(prevState => ({
                dataSource: [{ ...params, id: data.identity }].concat(prevState.dataSource),
                total: prevState.total + 1,
                addVisible: false
            }))
        })
    }
    onEditOk(params) {
        return helpService.edit(params).then(() => {
            this.setState(prevState => ({
                dataSource: prevState.dataSource.map((v) => {
                    if (v.id === params.id) {
                        return params
                    }
                    return v
                }),
                editVisible: false
            }))
        })
    }
    delete(id) {
        helpService.remove({ id }).then(() => {
            this.setState(prevState => ({
                dataSource: prevState.dataSource.filter(v => v.id !== id),
                total: prevState.total - 1
            }))
            message.success('删除成功！')
        }).catch((err) => {
            message.error(err)
        })
    }

    edit(record) {
        this.setState({
            editVisible: true,
            record
        })
    }
    infoHandler() {
        helpService.info({}).then((data) => {
            if (data.count === 0) {
                this.setState({
                    dataSource: [],
                    total: 0
                })
            } else {
                this.setState({
                    total: data.count
                })
                this.listHandler(1)
            }
        })
    }
    listHandler(offset) {
        this.setState({
            loading: true
        })
        helpService.list({
            offset, limit: 6
        }).then((data) => {
            this.setState({
                dataSource: data.list,
                loading: false
            })
        }).catch((err) => {
            message.error(err)
            this.setState({
                loading: false
            })
        })
    }
    render() {
        const { addVisible, dataSource, total, loading, editVisible, record } = this.state
        const columns = [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render: (text) => {
                    switch (text) {
                        case 1:
                            return '正常'
                        case 2:
                            return '冻结'
                        case 3:
                            return '删除'
                        default:
                            return '未知'
                    }
                }
            },
            {
                title: '操作',
                key: 'oper',
                render: (text, item) =>
                    <div>
                        <a style={{ marginRight: 5 }} onClick={() => this.delete(item.id)}><Icon type="delete" /></a>
                        <a onClick={() => this.edit(item)}><Icon type="edit" /></a>
                    </div>
            }
        ]
        const pagination = {
            total,
            showTotal: num => `共${num}条`,
            pageSize: 6,
            onChange: this.listHandler
        }
        return (
            <div>
                <Add visible={addVisible} onCancel={this.onAddVisibleToggle} onOk={this.onAddOk} />
                <Edit record={record} visible={editVisible} onCancel={this.onEditVisibleToggle} onOk={this.onEditOk} />
                <Button onClick={this.onAddVisibleToggle} style={{ marginBottom: 10 }} type="primary">新增</Button>
                <Table
                  rowKey="id"
                  loading={loading}
                  dataSource={dataSource}
                  total={total}
                  columns={columns}
                  pagination={pagination}
                />
            </div>
        );
    }
}

export default Help
