import React, { Component } from 'react'
import { Table, Button, message, Icon } from 'antd'
import { info, list, remove } from '../../services/record_category'
import Add from './add'
import Edit from './edit'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      total: 0,
      loading: false,
      title: '',
      record: {},
      editVisible: false,
      addVisible: false
    }
    this.infoHandler = this.infoHandler.bind(this)
    this.listHandler = this.listHandler.bind(this)
    this.editClick = this.editClick.bind(this)
    this.removeClick = this.removeClick.bind(this)
    this.addVisibleToggle = this.addVisibleToggle.bind(this)
    this.addOnOk = this.addOnOk.bind(this)
    this.editOnOk = this.editOnOk.bind(this)
    this.editVisibleToggle = this.editVisibleToggle.bind(this)
  }
  componentWillMount() {
    this.infoHandler()
  }

  infoHandler() {
    info({
      title: this.state.title
    }).then((data) => {
      if (data.count === 0) {
        this.setState({
          total: 0,
          dataSource: []
        })
      } else {
        this.setState({ total: data.count })
        this.listHandler(1)
      }
    })
  }

  listHandler(offset) {
    this.setState({ loading: true })
    list({
      title: this.state.title,
      limit: 20,
      offset,
      order_by: 'rank',
      sort: 'desc'
    }).then((data) => {
      this.setState({ loading: false, dataSource: data.list })
    }).catch((error) => {
      message.error(error)
      this.setState({ loading: false })
    })
  }

  editClick(record) {
    this.setState({ record, editVisible: true })
  }

  removeClick(id) {
    remove({ id }).then(() => {
      this.setState(prevState =>
        ({
          dataSource: prevState.dataSource.filter(item => item.id !== id),
          total: prevState.total - 1
        })
      )
      message.success('成功删除')
    }).catch(error => message.error(error))
  }

  addVisibleToggle() {
    this.setState(prevState => ({
      addVisible: !prevState.addVisible
    }))
  }

  addOnOk(record) {
    this.setState(prevState => ({
      dataSource: [record].concat(prevState.dataSource),
      total: prevState.total + 1,
      addVisible: false
    }))
  }

  editOnOk(record) {
    this.setState(prevState => ({
      dataSource: prevState.dataSource.map((item) => {
        if (item.id === record.id) return record
        return item
      }),
      editVisible: false
    }))
  }

  editVisibleToggle() {
    this.setState(prevState => ({
      editVisible: !prevState.editVisible
    }))
  }

  render() {
    const { dataSource, total, loading, addVisible, editVisible, record } = this.state
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '低点报警值',
      dataIndex: 'min_val',
      key: 'min_val'
    }, {
      title: '高点报警值',
      dataIndex: 'max_val',
      key: 'max_val'
    }, {
      title: '是否必须',
      dataIndex: 'required',
      key: 'required',
      render: text => (text === 1 ? '是' : '否')
    }, {
      title: '操作',
      key: 'oper',
      render: (text, item) => (<div>
        <Button style={{ marginRight: 10 }} onClick={() => this.editClick(item)}>修改</Button>
        <Button onClick={() => this.removeClick(item.id)}>删除</Button>
      </div>)
    }]
    const pagination = {
      total,
      showTotal: num => `共${num}条`,
      pageSize: 20,
      onChange: this.listHandler
    }
    return (
      <div>
        <Add
          visible={addVisible}
          onOk={this.addOnOk}
          onCancel={this.addVisibleToggle}
        />
        <Edit
          visible={editVisible}
          onOk={this.editOnOk}
          onCancel={this.editVisibleToggle}
          record={record}
        />
        <Button type="primary" onClick={this.addVisibleToggle} style={{ marginBottom: 20 }}>
            <Icon type="plus" /> 添加
        </Button>
        <Table
          bordered
          dataSource={dataSource}
          loading={loading}
          pagination={pagination}
          columns={columns}
        />
      </div>
    )
  }
}

export default List
