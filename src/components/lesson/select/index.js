import React, { Component } from 'react'
import { Table, message, Input, Col, Button, Modal } from 'antd'
import { add } from '../../../services/section'
import { HTML } from '../../../constants'
import { asyncInfo, list } from '../../../services/lesson'

class LessonSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            cname: '',
            mobile: '',
            title: '',
            total: 0,
            current: 1,
            dataSource: []
        }
    }
    componentWillMount() {
        this.getInfo()
    }
    getList = (offset) => {
        const { cname, mobile, title } = this.state
        this.setState({ loading: true, current: 1 })
        list({
            cname, mobile, title, offset, limit: 6
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
        const { cname, mobile, title } = this.state
        asyncInfo({
            cname, mobile, title
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
        if (this.props.records.length === 0) {
            return
        }
        let scount = 0
        const fArr = []
        const total = this.props.records.length
        Promise.all(this.props.records.map((record) => {
            const { title, content, descript, cover, id } = record
            return add({
                organize_id: 0, category_id: HTML, lesson_id: lesson.id, title, content, descript, cover, foreign_id: id
            }).then(() => {
                scount++
            }).catch((error) => {
                message.error(error)
                fArr.push({
                    lessonTitle: lesson.title,
                    h5Title: record.title
                })
            })
        })).then(() => {
            Modal.info({
                title: '推送结果',
                content: <div>
                            <p>共推送{total}篇,成功{scount}篇</p>
                            {
                                fArr.length > 0 &&
                                <div>失败列表:
                                    <ul>
                                    {fArr.map(item => (<li>课程:{item.lessonTitle} 图文:{item.h5Title}</li>))}
                                    </ul>
                                </div>
                            }
                         </div>
            })
        })
    }
    render() {
        const { loading, cname, mobile, title, total, dataSource, current } = this.state
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
            render: text => (text === 1 && '正常') || (text === 2 && '下架') || (text === 3 && '冻结')
        }, {
            title: '操作',
            key: 'opreate',
            render: (text, record) => <Button onClick={() => this.clickHandler(record)}>
                                        推送到课程
                                     </Button>
        }]
        return (
            <div>
                <Input.Group style={{ marginBottom: '20px' }}>
                    <Col span="6">
                        <Input placeholder="昵称" value={cname} onChange={e => this.setState({ cname: e.target.value })} />
                    </Col>
                    <Col span="6">
                        <Input placeholder="手机号码" value={mobile} onChange={e => this.setState({ mobile: e.target.value })} />
                    </Col>
                    <Col span="6">
                        <Input placeholder="课程名称" value={title} onChange={e => this.setState({ title: e.target.value })} />
                    </Col>
                    <Col span="3">
                        <Button type="primary" onClick={this.getInfo}>搜索</Button>
                    </Col>
                </Input.Group>
                <Table bordered loading={loading} dataSource={dataSource} columns={columns} pagination={pagination} />
            </div>
        )
    }
}

export default LessonSelect
