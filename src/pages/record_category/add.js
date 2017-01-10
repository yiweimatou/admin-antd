import React, { Component, PropTypes } from 'react'
import { Modal, Form, Spin, Input, message, Checkbox } from 'antd'
import { formItemLayout } from '../../constants'
import { add } from '../../services/record_category'

const FormItem = Form.Item
class AddRecordCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.okHandler = this.okHandler.bind(this)
  }
  okHandler() {
    this.props.form.validateFields((errors, values) => {
      if (errors) return
      const { title, max_val, min_val, required, rank } = values
      this.setState({ loading: true })
      const params = {
        title, max_val, min_val, rank, required: required ? 1 : 2
      }
      add(params).then((data) => {
        this.setState({ loading: false })
        this.props.onOk({
          ...params,
          id: data.identity
        })
      }).catch((error) => {
        message.error(error)
        this.setState({ loading: false })
      })
    })
  }
  render() {
    const { visible, onCancel } = this.props
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state
    return (
      <Modal
        title="添加"
        visible={visible}
        onCancel={onCancel}
        onOk={this.okHandler}
        maskClosable={false}
        width={720}
      >
        <Spin spinning={loading}>
          <Form>
            <FormItem {...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                rules: [{
                  required: true,
                  message: '请填写标题'
                }]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="高点报警值">
              {getFieldDecorator('max_val')(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="低点报警值">
              {getFieldDecorator('min_val')(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="是否必须">
              {getFieldDecorator('required', {
                valuePropName: 'checked'
              })(<Checkbox />)}
            </FormItem>
            <FormItem {...formItemLayout} label="排序">
              {getFieldDecorator('rank')(<Input />)}
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    )
  }
}

AddRecordCategory.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default Form.create()(AddRecordCategory)
