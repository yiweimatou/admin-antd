import React, { Component } from 'react'
import { Table, Input, Button, Col, Icon, message, Popconfirm } from 'antd'
import { info, listAll, remove } from '../../services/section'

class SectionList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sectionTitle: '',
            lessonTitle: '',
            cname: '',
            mobile: '',
            loading: false,
            dataSource: [],
            current: 1,
            total: 0
        }
    }
    componentWillMount() {
        this.getInfo()
    }
    getList = (offset) => {
        const { sectionTitle, lessonTitle, cname, mobile } = this.state
        this.setState({ loading: true })
        listAll({
            offset,
            limit: 6,
            sectionTitle,
            lessonTitle,
            cname,
            mobile,
        }, (error, dataSource) => {
            if (error) {
                message.error(error)
                this.setState({ loading: false })
            } else {
                this.setState({ loading: false, dataSource })
            }
        })
    }
    getInfo = () => {
        const { sectionTitle, lessonTitle, cname, mobile } = this.state
        info({
            sectionTitle, lessonTitle, cname, mobile
        }, (count) => {
            if (count === 0) {
                this.setState({ total: 0, dataSource: null, current: 1 })
            } else {
                this.setState({ total: count, current: 1 })
                this.getList(1)
            }
        })
    }
    clickHandler = (id) => {
        remove({ id }).then(() => {
            this.setState({
                dataSource: this.state.dataSource.filter(i => i.id !== id)
            })
            message.success('删除成功!')
        }).catch(error => message.error(error))
    }
    render() {
        const { sectionTitle, lessonTitle, mobile, cname, total, dataSource, loading, current } = this.state
        const pagination = {
            total,
            current,
            pageSize: 6,
            showTotal: num => `共${num}条`,
            onChange: (offset) => {
                this.setState({ current: offset })
                this.getList(offset)
            }
        }
        const columns = [{
            title: '文章标题',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '课程名称',
            dataIndex: 'lessonTitle',
            key: 'lessonTitle'
        }, {
            title: '主讲',
            key: 'user',
            render: (text, record) => `${record.cname}/${record.mobile}`
        }, {
            title: '创建时间',
            key: 'add_ms',
            dataIndex: 'add_ms',
            render: text => (new Date(text * 1000)).toLocaleString()
        }, {
            title: '操作',
            key: 'opreate',
            render: (text, record) => <Popconfirm title="确定删除这篇文章?" onConfirm={() => this.clickHandler(record.id)}>
                <a href="#"><Icon type="delete" /></a></Popconfirm>
        }]
        return (
            <div>
                <Input.Group style={{ marginBottom: '20px' }}>
                    <Col span="5">
                        <Input placeholder="文章标题" value={sectionTitle} onChange={e => this.setState({ sectionTitle: e.target.value })} />
                    </Col>
                    <Col span="5">
                        <Input placeholder="课程标题" value={lessonTitle} onChange={e => this.setState({ lessonTitle: e.target.value })} />
                    </Col>
                    <Col span="5">
                        <Input placeholder="主讲姓名" value={cname} onChange={e => this.setState({ cname: e.target.value })} />
                    </Col>
                    <Col span="5">
                        <Input placeholder="主讲手机号码" value={mobile} onChange={e => this.setState({ mobile: e.target.value })} />
                    </Col>
                    <Col span="4"><Button type="primary" onClick={this.getInfo}>搜索</Button></Col>
                </Input.Group>
                <Table bordered loading={loading} dataSource={dataSource} pagination={pagination} columns={columns} />
            </div>
        )
    }
}

export default SectionList
