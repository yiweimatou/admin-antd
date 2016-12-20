import React, { Component } from 'react'
import { Table, message, Input, Col, Button, Select } from 'antd'
import { asyncInfo, list, edit } from '../../services/lesson'

const Option = Select.Option
class LessonList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            cname: '',
            mobile: '',
            title: '',
            total: 0,
            current: 1,
            state: '',
            dataSource: []
        }
    }
    componentWillMount() {
        this.getInfo()
    }
    getList = (offset) => {
        const { cname, mobile, title, state } = this.state
        this.setState({ loading: true, current: 1 })
        list({
            state, cname, mobile, title, offset, limit: 6
        }, (error, dataSource) => {
            if (error) {
                message.error(error)
                this.setState({ loading: false })
            } else {
                this.setState({ dataSource, loading: false })
            }
        })
    }
    getInfo = () => {
        const { cname, mobile, title, state } = this.state
        asyncInfo({
            cname, mobile, title, state
        }, (error, count) => {
          if (error) {
            message.error(error)
          } else if (count === 0) {
                this.setState({ total: 0, dataSource: [] })
          } else {
              this.setState({ total: count, current: 1 })
              this.getList(1)
          }
        })
    }
    clickHandler = (lesson) => {
        edit({
            id: lesson.id,
            state: lesson.state === 3 ? 2 : 3
        }).then(() => {
            this.setState({
                dataSource: this.state.dataSource.map((item) => {
                    if (item.id === lesson.id) {
                        return {
                            ...item,
                            state: lesson.state === 3 ? 2 : 3
                        }
                    }
                    return item
                })
            })
            message.success('编辑成功!')
        }).catch(error => message.error(error))
    }
    render() {
        const {
          loading, cname, mobile, title, total, dataSource, current
        } = this.state
        const pagination = {
            total,
            current,
            pageSize: 6,
            showTotal: num => `共${num}条`,
            onChange: this.getList
        }
        const columns = [{
            title: '课程名称',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '主讲',
            dataIndex: 'cname',
            key: 'cname',
            render: (text, record) => `${record.cname}/${record.mobile}`
        }, {
            title: '创建时间',
            dataIndex: 'add_ms',
            key: 'add_ms',
            render: text => (new Date(text * 1000)).toLocaleString()
        }, {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render: text => (text === 1 && '正常')
                            || (text === 2 && '下架')
                            || (text === 3 && '冻结')
        }, {
            title: '操作',
            key: 'opreate',
            render: (text, record) =>
            <Button onClick={() => this.clickHandler(record)}>
                {record.state === 3 ? '解冻' : '冻结'}
            </Button>
        }]
        return (
            <div>
                <Input.Group style={{ marginBottom: '20px' }}>
                    <Col span="6">
                        <Input placeholder="昵称" value={cname} onChange={
                          e => this.setState({ cname: e.target.value })
                        } />
                    </Col>
                    <Col span="6">
                        <Input placeholder="手机号码" value={mobile} onChange={
                          e => this.setState({ mobile: e.target.value })
                        } />
                    </Col>
                    <Col span="6">
                        <Input placeholder="课程名称" value={title} onChange={
                          e => this.setState({ title: e.target.value })
                        } />
                    </Col>
                    <Col span="3">
                        <Select defaultValue="" style={{ width: '100%' }} onChange={
                          value => this.setState({ state: value })
                        }>
                            <Option value="">全部</Option>
                            <Option value="1">正常</Option>
                            <Option value="2">下架</Option>
                            <Option value="3">冻结</Option>
                        </Select>
                    </Col>
                    <Col span="3">
                        <Button type="primary" onClick={this.getInfo}>搜索</Button>
                    </Col>
                </Input.Group>
                <Table
                  bordered
                  loading={loading}
                  dataSource={dataSource}
                  columns={columns}
                  pagination={pagination} />
            </div>
        )
    }
}

export default LessonList
