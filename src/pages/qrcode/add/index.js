import React, { Component } from 'react'
import { Form, Button, Input, Spin, message } from 'antd'
import { withRouter } from 'react-router'
import { formItemLayout } from 'constants'
import { isMobile } from 'utils'
import UserSelector from 'components/user/selector'
import { add } from 'services/qrcode'
import QRCodeResult from '../result'

const FormItem = Form.Item
class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetching: false,
            visible: false,
            result: false,
            list: '',
            role2_account_id: 0
        }
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.form.validateFields((errors, values) => {
            if (errors) return
            const { sales_mobile, sales_name, comment, num } = values
            this.setState({ fetching: true })
            add({
                sales_mobile, sales_name, role2_account_id: this.state.role2_account_id, comment: comment || '', num, state: 1
            }).then((data) => {
                this.setState({ fetching: false })
                this.setState({ result: true, list: data.rcmd_code_list.join(',') })
            }).catch((error) => {
                this.setState({ fetching: false })
                message.error(error)
            })
        })
    }
    selectHandler = (selected) => {
        this.setState({ visible: false, role2_account_id: selected.id })
        this.props.form.setFieldsValue({ role2_account_name: selected.name })
    }
    cancelHandler = () => this.setState({ visible: false })
    render() {
        const { form } = this.props
        const { getFieldDecorator, getFieldValue } = form
        const { fetching, visible, result, list } = this.state
        return (
            <Spin spinning={fetching}>
                <UserSelector visible={visible} selectHandler={value => this.selectHandler(value)} cancelHandler={() => this.cancelHandler()} />
                <QRCodeResult
                  list={list}
                  visible={result}
                  name1={getFieldValue('role2_account_name')}
                  name2={getFieldValue('sales_name')}
                  num={getFieldValue('num')}
                  onCancel={() => this.setState({ result: false })}
                />
                <Form onSubmit={this.submitHandler}>
                    <FormItem {...formItemLayout} label="业务员姓名" hasFeedback>
                        {getFieldDecorator('sales_name', {
                            rules: [{ required: true, message: '请填写业务员姓名' }]
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="业务员手机号码" hasFeedback required>
                        {getFieldDecorator('sales_mobile', {
                            validateTrigger: 'onBlur',
                            rules: [{ validator: (rule, value, callback) => {
                                if (!value) {
                                    callback('请输入手机号码!')
                                } else if (!isMobile(value)) {
                                    callback('请输入正确的手机号码!')
                                } else {
                                    callback()
                                }
                            } }]
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="辅导员" required>
                        {getFieldDecorator('role2_account_name', {
                            rules: [{ required: true, message: '请选择辅导员' }]
                        })(<Input readOnly onClick={() => this.setState({ visible: true })} />)}
                    </FormItem>
                    <FormItem label="数量" required {...formItemLayout}>
                        {getFieldDecorator('num', {
                            rules: [
                                { validator: (rule, value, callback) => {
                                    if (!value) {
                                        callback('请填写数量')
                                    } else if (value <= 0) {
                                        callback('必须大于0')
                                    } else {
                                        callback()
                                    }
                                } }
                            ]
                        })(<Input type="number" min={1} />)}
                    </FormItem>
                    <FormItem label="备注" {...formItemLayout}>
                        {getFieldDecorator('comment')(<Input type="textarea" rows={5} />)}
                    </FormItem>
                    <FormItem wrapperCol={{ offset: 6 }}>
                        <Button htmlType="submit" type="primary">生成二维码</Button>
                    </FormItem>
                </Form>
            </Spin>
        )
    }
}

export default withRouter(Form.create()(Add))
