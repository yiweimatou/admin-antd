import React, { Component } from 'react';
import { Table, message, Button, Modal } from 'antd'
import { info, list } from '../../services/organize'
import SearchInput from '../SearchInput'

class SwiperSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            total: 0,
            dataSource: [],
            loading: false
        }
    }
    componentWillMount() {
        this.getInfo()
    }
    getInfo = () => {
        info({ title: this.state.title, state: 1 }).then((data) => {
            if (data.count === 0) {
                this.setState({ total: data.count, dataSource: [] })
            } else {
                this.setState({ total: data.count })
                this.getList(1)
            }
        }).catch(error => message.error(error))
    }
    getList = (offset) => {
        this.setState({ loading: true })
        list({ title: this.state.title, offset, limit: 6, state: 1 }).then((data) => {
            this.setState({ loading: false, dataSource: data.list })
        }).catch((error) => {
            this.setState({ loading: false })
            message.error(error)
        })
    }
    render() {
        const { loading, dataSource, total } = this.state
        const pagination = {
            total,
            showTotal: num => `共${num}条`,
            pageSize: 6,
            onChange: this.getList
        }
        const columns = [{
            title: '机构名称',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '创建时间',
            dataIndex: 'add_ms',
            key: 'add_ms',
            render: text => (new Date(text * 1000)).toLocaleString()
        }, {
            title: '操作',
            key: 'operate',
            render: (text, record) => <Button onClick={() => this.props.onSelect(record.id)}>选择</Button>
        }]
        return (
            <Modal footer={null} onCancel={this.props.onCancel} maskClosable={false} visible={this.props.visible}>
                <SearchInput
                  placeholder="机构名称"
                  onSearch={(value) => {
                      Promise.resolve(this.setState({ title: value }))
                      .then(this.getInfo)
                  }}
                  style={{ width: 200, marginBottom: 20 }}
                />
                <Table columns={columns} loading={loading} pagination={pagination} dataSource={dataSource} />
            </Modal>
        );
    }
}

export default SwiperSelector;
