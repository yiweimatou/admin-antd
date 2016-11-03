import React, { Component, PropTypes } from 'react';
import { Table, Modal, message } from 'antd'
import SearchInput from '../../SearchInput'
import { list, info } from 'services/user'

class UserSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            loading: true,
            total: 0,
            selected: null,
            mobile: ''
        }
    }
    componentWillMount() {
        this.searchHandler()
    }
    changeHandler = (offset) => {
        this.setState({ loading: true })
        list({ state: 1, offset, limit: 6, mobile: this.state.mobile })
        .then(data => this.setState({ dataSource: data.list, loading: false }))
        .catch((error) => {
            this.setState({ loading: false })
            message.error(error)
        })
    }
    searchHandler = (mobile) => {
        info({ state: 1, mobile: mobile || '' }).then((data) => {
            this.setState({ total: data.count })
            if (data.count === 0) {
                this.setState({ dataSource: [] })
            } else {
                this.changeHandler(1)
            }
        }).catch(error => message.error(error))
    }
    render() {
        const { visible, selectHandler, cancelHandler } = this.props
        const { dataSource, loading, total, selected } = this.state
        const rowSelection = {
            type: 'radio',
            selectRowkeys: [selected],
            onChange: (selectRowkeys, selectedRows) => this.setState({
                selected: {
                    id: selectedRows[0].id,
                    name: selectedRows[0].cname
                } })
        }
        const columns = [{
            title: '姓名',
            dataIndex: 'cname',
            key: 'cname'
        }, {
            title: '手机号码',
            dataIndex: 'mobile',
            key: 'mobile'
        }]
        const pagination = {
            total,
            pageSize: 6,
            showTotal: num => `共${num}条`,
            onChange: offset => this.changeHandler(offset)
        }
        return (
            <Modal
              title="选择辅导员"
              visible={visible} onOk={() => {
                    if (!selected) {
                        message.error('请选择一名辅导员!')
                    } else {
                        selectHandler(selected)
                    }
            }} onCancel={cancelHandler} maskClosable={false}
            >
                <SearchInput
                  placeholder="请输入手机号码"
                  onSearch={(value) => {
                        this.setState({ mobile: value })
                        this.searchHandler(value)
                    }} style={{ width: 200, marginBottom: 10 }}
                />
                <Table rowKey="id" dataSource={dataSource} loading={loading} columns={columns} rowSelection={rowSelection} pagination={pagination} />
            </Modal>
        );
    }
}

UserSelector.propTypes = {
    selectHandler: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    cancelHandler: PropTypes.func.isRequired
};

export default UserSelector
