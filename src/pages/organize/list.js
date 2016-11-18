import React, { Component } from 'react';
import { Table, message, Button } from 'antd'
import { Link } from 'react-router'
import { info, list } from 'services/organize'
import SearchInput from '../../components/SearchInput'

class OrganizeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            total: 0,
            current: 1,
            dataSource: [],
            loading: false
        }
    }
    componentWillMount() {
        this.getInfo()
    }
    getInfo = () => {
        info({ title: this.state.title }).then((data) => {
            if (data.count === 0) {
                this.setState({ total: data.count, dataSource: [] })
            } else {
                this.setState({ total: data.count, current: 1 })
                this.getList(1)
            }
        }).catch(error => message.error(error))
    }
    getList = (offset) => {
        this.setState({ loading: true, current: offset })
        list({ title: this.state.title, offset, limit: 6 }).then((data) => {
            this.setState({ loading: false, dataSource: data.list })
        }).catch((error) => {
            this.setState({ loading: false })
            message.error(error)
        })
    }
    render() {
        const { loading, dataSource, total, current } = this.state
        const pagination = {
            total,
            current,
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
            render: (text, record) => <Button><Link to={`/organize/edit/${record.id}`}>编辑</Link></Button>
        }]
        return (
            <div>
                <SearchInput
                  placeholder="机构名称"
                  onSearch={(value) => {
                      Promise.resolve(this.setState({ title: value }))
                      .then(this.getInfo)
                  }}
                  style={{ width: 200, marginBottom: 20 }}
                />
                <Button style={{ float: 'right' }} type="primary"><Link to="/organize/add">添加机构</Link></Button>
                <Table columns={columns} loading={loading} pagination={pagination} dataSource={dataSource} />
            </div>
        );
    }
}

export default OrganizeList;
