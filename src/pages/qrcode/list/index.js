import React, { Component } from 'react';
import { Table, message, Form, Button, Input, Select } from 'antd'
import { Link } from 'react-router'
import array from 'lodash/array'
import { info, list, download } from 'services/qrcode'
import { list as getUsers, get as getUser } from 'services/user'

const FormItem = Form.Item
const Option = Select.Option
class QRCodeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            dataSource: [],
            loading: false,
            downloading: false,
            tempUser: {},
            selectedRowKeys: []
        }
    }
    componentWillMount() {
        this.infoChangeHandler()
    }
    getList = (params) => {
        this.setState({ loading: true })
        list(params)
        .then((data) => {
            const idList = array.uniq(array.uniqBy(data.list, 'role2_account_id').map(i => i.role2_account_id)
                            .concat(array.uniqBy(data.list, 'role1_account_id').map(i => i.role1_account_id)))
                            .join(',')
            getUsers({ id_list: idList }).then((users) => {
                this.setState({
                    loading: false,
                    dataSource: data.list.map((item) => {
                        const user1 = users.list.find(i => i.id === item.role1_account_id)
                        const user2 = users.list.find(i => i.id === item.role2_account_id)
                        return {
                            ...item,
                            role1_account_name: (user1 && user1.cname) || '无',
                            role2_account_name: user2 && user2.cname
                        }
                    })
                })
            })
            this.setState({ loading: false, dataSource: data.list })
        })
        .catch((error) => {
            this.setState({ loading: false })
            message.error(error)
        })
    }
    changeHandler = (offset) => {
        const { role2, state, sales_mobile, sales_name } = this.props.form.getFieldsValue()
        const params = {
            account_id: localStorage.uid,
            state_list: (state === '0' ? '1,2,3' : state) || '',
            sales_mobile: sales_mobile || '',
            sales_name: sales_name || '',
            offset: offset || 1,
            limit: 6
        }
        if (role2) {
            if (this.state.tempUser.cname === role2) {
                this.getList({ ...params, role2_account_id: this.state.tempUser.id })
            } else {
                getUser({ cname: role2 }).then((user) => {
                    if (user.get.id) {
                        this.setState({ tempUser: { id: user.get.id, cname: user.get.cname } })
                        this.getList({
                            ...params,
                            role2_account_id: user.get.id
                        })
                    }
                })
            }
        } else {
            this.getList(params)
        }
    }
    infoChangeHandler = () => {
        const { role2, state, sales_mobile, sales_name } = this.props.form.getFieldsValue()
        const params = {
            account_id: localStorage.uid,
            state_list: (state === '0' ? '1,2,3' : state) || '',
            sales_mobile: sales_mobile || '',
            sales_name: sales_name || '',
        }
        if (role2) {
            getUser({ cname: role2 }).then((data) => {
                if (data.get.id) {
                    info({ ...params, role2_account_id: data.get.id }).then((res) => {
                        this.setState({ total: res.count, tempUser: { cname: data.get.cname, id: data.get.id } })
                        if (res.count === '0') {
                            this.setState({ dataSource: [] })
                        } else {
                            this.changeHandler(1)
                        }
                    })
                    .catch(error => message.error(error))
                } else {
                    message.warn(`没有叫${role2}的辅导员`)
                }
            }).catch(error => message.error(error))
        } else {
            info(params).then((res) => {
                this.setState({ total: res.count })
                if (res.count === '0') {
                    this.setState({ dataSource: [] })
                } else {
                    this.changeHandler(1)
                }
            })
            .catch(error => message.error(error))
        }
    }
    clickHandler = (code) => {
        this.setState({ downloading: true })
        download({ rcmd_code_list: code }).then((data) => {
            this.setState({ downloading: false })
            window.open(data.path)
        }).catch(error => message.error(error))
    }
    render() {
        const { total, dataSource, loading, selectedRowKeys, downloading } = this.state
        const pagination = {
            total,
            pageSize: 6,
            showTotal: num => `共${num}条`,
            onChange: offset => this.changeHandler(offset)
        }
        const columns = [{
            title: '辅导员',
            dataIndex: 'role2_account_name',
            key: 'role2_account_name'
        }, {
            title: '业务员/手机号',
            dataIndex: 'sales_name',
            key: 'sales_name',
            render: (text, record) => `${text}/${record.sales_mobile}`
        }, {
            title: '创建时间',
            dataIndex: 'add_ms',
            key: 'add_ms',
            render: text => new Date(text * 1000).toLocaleString()
        }, {
            title: '主讲',
            dataIndex: 'role1_account_name',
            key: 'role1_account_name'
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: (text) => {
                switch (text) {
                    case 1:
                        return '未使用'
                    case 3:
                        return '已使用'
                    case 2:
                        return '冻结'
                    default:
                        return ''
                }
            }
        }, {
            title: '备注',
            dataIndex: 'comment',
            key: 'comment'
        }, {
            title: '操作',
            key: 'operate',
            render: (text, record) => <Button onClick={() => this.clickHandler(record.rcmd_code)}>下载二维码</Button>
        }]
        const { getFieldDecorator } = this.props.form
        const rowSelection = {
            selectedRowKeys,
            onChange: keys => this.setState({ selectedRowKeys: keys })
        }
        const hasSelected = selectedRowKeys.length > 0
        const footer = () => (
             <div>
                <Button
                  type="primary" onClick={() => this.clickHandler(selectedRowKeys.join(','))}
                  disabled={!hasSelected} loading={downloading}
                >批量下载</Button>
                <span style={{ marginLeft: 8 }}>{hasSelected ? `选中 ${selectedRowKeys.length} 项` : ''}</span>
            </div>
        )
        return (
            <div>
                <Form inline onSubmit={this.handleSubmit} style={{ margin: '20px 0' }}>
                    <FormItem label="辅导员">
                        {getFieldDecorator('role2')(<Input placeholder="辅导员姓名" />)}
                    </FormItem>
                    <FormItem label="业务员">
                        {getFieldDecorator('sales_name')(<Input placeholder="业务员姓名" />)}
                    </FormItem>
                    <FormItem label="业务员手机号">
                        {getFieldDecorator('sales_mobile')(<Input placeholder="业务员手机号" />)}
                    </FormItem>
                    <FormItem label="状态">
                        {getFieldDecorator('state', { initialValue: '0' })(
                                <Select style={{ width: '100%' }}>
                                    <Option value="0">全部</Option>
                                    <Option value="1">未使用</Option>
                                    <Option value="3">已使用</Option>
                                    <Option value="2">冻结</Option>
                                </Select>
                            )}
                    </FormItem>
                    <FormItem>
                        <Button
                          onClick={() => {
                            this.infoChangeHandler()
                        }}
                        >搜索</Button>
                    </FormItem>
                    <FormItem><Button type="primary"><Link to="/qrcode/add">新建开课二维码</Link></Button></FormItem>
                </Form>
                <Table bordered footer={footer} rowKey="rcmd_code" rowSelection={rowSelection} loading={loading} dataSource={dataSource} pagination={pagination} columns={columns} />
            </div>
        );
    }
}

export default Form.create()(QRCodeList);
