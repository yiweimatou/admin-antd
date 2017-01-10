import React, { Component } from 'react'
import { Table, message, Button, Col } from 'antd'
import swiperService from '../../services/swiper'
import YM from './add_yemian'
import KC from './add_lesson'
import JG from './add_organize'
import ZJ from './add_user'

class Swiper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            total: 0,
            loading: true,
            yVisible: false, // 页面
            uVisible: false, // 主讲
            oVisible: false, // 机构
            lVisible: false // 课程
        }
        this.onOk = this.onOk.bind(this)
    }
    componentWillMount() {
        this.infoHandler()
    }
    infoHandler() {
        swiperService.info({ state: 1 }).then((data) => {
            if (data.count === 0) {
                this.setState({ total: 0, loading: false })
            } else {
                this.setState({ total: data.count })
                this.changeHandler(1)
            }
        })
    }
    changeHandler(offset) {
        swiperService.list({ offset, limit: 6, state: 1 }).then((data) => {
            this.setState({
                dataSource: data.list,
                loading: false
            })
        }).catch((err) => {
            message.error(err)
            this.setState({ loading: false })
        })
    }
    toggleY = () => {
        this.setState(prevState => ({ yVisible: !prevState.yVisible }))
    }
    toggleU = () => {
        this.setState(prevState => ({ uVisible: !prevState.uVisible }))
    }
    toggleO = () => {
        this.setState(prevState => ({ oVisible: !prevState.oVisible }))
    }
    toggleL = () => {
        this.setState(prevState => ({ lVisible: !prevState.lVisible }))
    }
    remove(id) {
        if (id > 0) {
            swiperService.remove({ id }).then(() => {
                this.setState(prevState => ({
                    dataSource: prevState.dataSource.filter(v => v.id !== id),
                    total: prevState.total - 1
                }))
                message.success('删除成功！')
            }).catch(err => message.error(err))
        } else {
            message.error('删除失败，缺少Id')
        }
    }
    onOk(item) {
        this.setState(prevState => ({
            dataSource: [item].concat(prevState.dataSource),
            total: prevState.total + 1,
            yVisible: false,
            lVisible: false,
            oVisible: false,
            uVisible: false
        }))
    }
    render() {
        const { dataSource, loading, total, yVisible, lVisible, oVisible, uVisible } = this.state
        const pagination = {
            total,
            showTotal: num => `共${num}条`,
            pageSize: 6,
            onChange: this.changeHandler
        }
        const columns = [{
            title: '图片',
            key: 'path',
            dataIndex: 'path',
            render: path => <img alt="img" src={path} width="45px" height="45px" />
        }, {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render: state =>
                (state === 1 && '正常')
                ||
                (state === 2 && '隐藏')
                ||
                (state === 3 && '删除')
        }, {
            title: '操作',
            key: 'oper',
            render: (text, item) =>
                <Button onClick={() => this.remove(item.id)} type="ghost">删除</Button>
        }]
        return (
            <div>
                <YM onOk={this.onOk} onCancel={this.toggleY} visible={yVisible} />
                <KC onOk={this.onOk} onCancel={this.toggleL} visible={lVisible} />
                <JG onOk={this.onOk} onCancel={this.toggleO} visible={oVisible} />
                <ZJ onOk={this.onOk} onCancel={this.toggleU} visible={uVisible} />
                <div style={{ marginBottom: 20, overflow: 'auto' }}>
                    <Col span={3}>
                        <Button onClick={this.toggleY} type="primary">添加-页面</Button>
                    </Col>
                    <Col span={3}>
                        <Button onClick={this.toggleL} type="primary">添加-课程</Button>
                    </Col>
                    <Col span={3}>
                        <Button onClick={this.toggleO} type="primary">添加-机构</Button>
                    </Col>
                    <Col span={3}>
                        <Button onClick={this.toggleU} type="primary">添加-主讲</Button>
                    </Col>
                </div>
                <div>
                    <Table
                      rowKey="id"
                      dataSource={dataSource}
                      loading={loading}
                      pagination={pagination}
                      columns={columns}
                    />
                </div>
            </div>
        )
    }
}

export default Swiper
