import React, { Component, PropTypes } from 'react'
import { Form, Spin, Modal, Input, Checkbox, message } from 'antd'
import { formItemLayout } from '../../constants'
import { edit } from '../../services/record_category'

const FormItem = Form.Item

class Edit extends Component {
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
            const params = {
                title: values.title,
                required: values.required ? 1 : 2,
                reckon: values.reckon ? 1 : 2,
                max_val: values.max_val,
                min_val: values.min_val,
                rank: values.rank,
                id: this.props.record.id
            }
            this.setState({ loading: true })
            edit(params).then(() => {
                message.success('编辑成功')
                this.setState({ loading: false })
                this.props.onOk(params)
            }).catch((error) => {
                message.error(error)
                this.setState({ loading: false })
            })
        })
    }
    render() {
        const { visible, onCancel, form, record } = this.props
        const { getFieldDecorator } = form
        return (
            <Modal
              title="修改"
              maskClosable={false}
              onOk={this.okHandler}
              onCancel={onCancel}
              visible={visible}
              width={720}
            >
                <Spin spinning={this.state.loading}>
                    <Form>
                        <FormItem {...formItemLayout} label="标题">
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true,
                                    message: '请填写标题'
                                }],
                                initialValue: record.title
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="高点报警值">
                            {getFieldDecorator('max_val', {
                                initialValue: record.max_val
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="低点报警值">
                            {getFieldDecorator('min_val', {
                                initialValue: record.min_val
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="是否必须">
                            {getFieldDecorator('required', {
                                valuePropName: 'checked',
                                initialValue: record.required === 1
                            })(<Checkbox />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="是否计算所得">
                            {getFieldDecorator('reckon', {
                                valuePropName: 'checked',
                                initialValue: record.reckon === 1
                            })(<Checkbox />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="排序">
                            {getFieldDecorator('rank', { initialValue: record.rank })(<Input />)}
                        </FormItem>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}

Edit.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}

export default Form.create()(Edit)
