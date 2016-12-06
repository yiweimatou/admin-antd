import React, { Component } from 'react'
import { Table, Button, Input, Col, message, Modal } from 'antd'
import { Link } from 'react-router'
import { list, info, remove } from '../../../services/h5'
import LessonSelect from '../../../components/lesson/select'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            dataSource: [],
            total: 0,
            loading: true,
            visible: false,
            records: []
        }
    }

    componentWillMount() {
        this.infoHandler()
    }

    infoHandler = () => {
        info({
            account_id: 0,
            title: this.state.title,
            state: 1
        }).then((data) => {
            if (data.count === 0) {
                this.setState({ loading: false, total: 0, dataSource: [] })
            } else {
                this.setState({ total: data.count })
                this.listHandler(1)
            }
        })
    }
    listHandler = (offset) => {
        list({
            offset, limit: 6, title: this.state.title, account_id: 0, state: 1
        }).then((data) => {
            this.setState({ loading: false, dataSource: data.list })
        }).catch((error) => {
            this.setState({ loading: false })
            message.error(error)
        })
    }
    searchHandler = () => {
        this.infoHandler()
    }
    removeHandler = (id) => {
        remove({ id }).then(() => {
            this.setState(prevState => ({
                total: prevState.total - 1,
                dataSource: prevState.dataSource.filter(val => val.id !== id)
            }))
        }).catch(error => message.error(error))
    }
    okHandler = () => {

    }
    toggleVisible = () => this.setState(prevState => ({
        visible: !prevState.visible
    }))
    render() {
        const { title, dataSource, loading, total, visible, records } = this.state
        const columns = [{
            title: '图文标题',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '操作',
            key: 'oper',
            render: (text, item) => (<div>
                    <a onClick={() => this.removeHandler(item.id)}>删除</a>
                    <a
                      style={{ marginLeft: 8 }} onClick={() => {
                            this.setState({ records: [item] })
                            this.toggleVisible()
                        }
                    }
                    >推送到课程</a>
                </div>)
        }]
        const pagination = {
            total,
            showTotal: num => `共${num}条`,
            onChange: this.listHandler
        }
        const rowSelection = {
             onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ records: selectedRows })
            },
        }
        const hasSelected = records.length > 0
        return (
            <div>
                <Modal title="选择课程" maskClosable={false} onOk={this.okHandler} onCancel={this.toggleVisible} visible={visible} width={720} footer={null}>
                    <LessonSelect records={records} />
                </Modal>
                <Input.Group style={{ marginBottom: '20px' }}>
                    <Col span={6}>
                        <Input value={title} onChange={e => this.setState({ title: e.target.value })} placeholder="图文标题" />
                    </Col>
                    <Col span={6}>
                        <Button style={{ marginLeft: 10 }} type="primary" onClick={this.searchHandler}>搜索</Button>
                    </Col>
                    <Col span={6} offset={6}>
                        <Button style={{ float: 'right' }} type="primary"><Link to="/h5/add">新建图文</Link></Button>
                    </Col>
                </Input.Group>
                <Table columns={columns} loading={loading} dataSource={dataSource} pagination={pagination} rowSelection={rowSelection} />
                <Button
                  type="primary"
                  onClick={this.toggleVisible}
                  disabled={!hasSelected}
                >批量推送</Button>
                <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${records.length} 篇图文` : ''}</span>
            </div>
        )
    }
}

export default List
