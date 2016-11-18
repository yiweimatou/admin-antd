import React, { Component } from 'react'
import { Table, message, Icon, Input, Button, Col } from 'antd'
import { list, info, edit } from '../../services/user'
import Auth from './authenticate'

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            visible: false,
            total: 0,
            current: 1,
            dataSource: [],
            mobile: '',
            cname: '',
            user: {}
        }
    }
    componentWillMount() {
        this.getInfo()
    }
    getInfo = () => {
        const { mobile, cname } = this.state
        info({
            mobile, cname
        }).then((data) => {
            if (data.count === 0) {
                this.setState({ total: 0, dataSource: [] })
            } else {
                this.setState({ total: data.count, current: 1 })
                this.getList(1)
            }
        })
    }
    getList = (offset) => {
        const { mobile, cname } = this.state
        this.setState({ loading: true, current: offset })
        list({
            mobile, cname, offset, limit: 6
        }).then((data) => {
            this.setState({
                dataSource: data.list,
                loading: false
            })
        }).catch((error) => {
            this.setState({ loading: false })
            message.error(error)
        })
    }
    toggleVisible = () => this.setState({ visible: !this.state.visible })
    cancel = (id) => {
        edit({ id, cet: 1 }).then(() => {
            this.setState({
                dataSource: this.state.dataSource.map((i) => {
                    if (i.id === id) {
                        return {
                            ...i,
                            cet: 1
                        }
                    }
                    return i
                })
            })
        })
    }
    render() {
        const { total, dataSource, loading, cname, mobile, current, visible, user } = this.state
        const pagination = {
            total,
            current,
            pageSize: 6,
            showTotal: num => `共${num}条`,
            onChange: this.getList
        }
        const columns = [{
            title: '昵称',
            key: 'cname',
            dataIndex: 'cname'
        }, {
            title: '认证姓名',
            key: 'cet_cname',
            dataIndex: 'cet_cname'
        }, {
            title: '手机号码',
            key: 'mobile',
            dataIndex: 'mobile'
        }, {
            title: '权限',
            key: 'lesson',
            render: (text, record) => {
                if (record.lesson_num > 0) {
                    if (record.rcmd_lesson_num > 0) {
                        return '主讲/推荐开课'
                    }
                    return '主讲'
                }
                return '普通用户'
            }
        }, {
            title: '认证状态',
            key: 'cet',
            dataIndex: 'cet',
            render: text => (text === 1 && '未认证') || (text === 2 && '认证中') || (text === 3 && '已认证')
        }, {
            title: '注册时间',
            key: 'add_ms',
            dataIndex: 'add_ms',
            render: text => (new Date(text * 1000)).toLocaleString()
        }, {
            title: '操作',
            key: 'opreate',
            render: (text, record) => {
                if (record.cet === 3) {
                    return (
                        <div>
                            <a href={`/user/edit/${record.id}`}><Icon type="edit" />编辑</a>
                            <a onClick={() => this.cancel(record.id)} style={{ marginLeft: '10px' }}><Icon type="close" />取消认证</a>
                            <a
                              onClick={() => {
                                this.setState({ user: record })
                                this.toggleVisible()
                            }} style={{ marginLeft: '10px' }}
                            ><Icon type="check" />修改认证</a>
                        </div>
                    )
                }
                return (
                    <div>
                        <a href={`/user/edit/${record.id}`}><Icon type="edit" />编辑</a>
                        <a
                          onClick={() => {
                            this.setState({ user: record })
                            this.toggleVisible()
                        }}
                          style={{ marginLeft: '10px' }}
                        ><Icon type="check" />认证</a>
                    </div>
                )
            }
        }]
        return (
            <div>
                <Auth
                  record={user}
                  visible={visible} onOk={(cet_cname) => {
                        this.setState({ dataSource: this.state.dataSource.map((i) => {
                            if (i.id === user.id) {
                                return {
                                    ...i,
                                    cet_cname,
                                    cet: 3
                                }
                            }
                            return i
                        }) })
                        this.toggleVisible()
                }} onCancel={this.toggleVisible}
                />
                <Input.Group style={{ marginBottom: '20px' }}>
                    <Col span="6">
                        <Input placeholder="昵称" value={cname} onChange={e => this.setState({ cname: e.target.value })} />
                    </Col>
                    <Col span="6">
                        <Input placeholder="手机号码" value={mobile} onChange={e => this.setState({ mobile: e.target.value })} />
                    </Col>
                    <Col span="8">
                        <Button type="primary" onClick={this.getInfo}>搜索</Button>
                    </Col>
                </Input.Group>
                <Table bordered loading={loading} dataSource={dataSource} pagination={pagination} columns={columns} />
            </div>
        )
    }
}

export default UserList
