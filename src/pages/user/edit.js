import React, { Component } from 'react'
import { Form, Spin, Input, Button, Select, Checkbox, message } from 'antd'
import { withRouter } from 'react-router'
import { formItemLayout } from '../../constants'
import { isMobile } from '../../utils'
import { get, edit, resetPassword } from '../../services/user'

const FormItem = Form.Item
const Option = Select.Option
const CheckboxGroup = Checkbox.Group
const options = ['主讲权限', '推荐开课']
class UserEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            user: {}
        }
    }
    componentWillMount() {
        const id = this.props.router.params.id
        get({ id }).then((data) => {
            if (data.get.id > 0) {
                this.setState({ user: data.get, loading: false })
            }
        }).catch((error) => {
            message.error(error)
            this.setState({ loading: false })
        })
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.form.validateFields((errors, values) => {
            if (errors) return
            const { mobile, cet_cname, permission, resetpwd, state, lesson_num, rcmd_lesson_num } = values
            this.setState({ loading: true })
            if (resetpwd) {
                resetPassword(this.state.user.id)
            }
            edit({
                id: this.state.user.id,
                mobile,
                cet_cname,
                lesson_num: permission.indexOf('主讲权限') > -1 ? lesson_num : 0,
                rcmd_lesson_num: permission.indexOf('推荐开课') > -1 ? rcmd_lesson_num : 0,
                state
            }).then(() => {
                message.success('编辑成功！')
                this.props.router.push({ pathname: '/user/list' })
            }).catch((error) => {
                message.error(error)
                this.setState({ loading: false })
            })
        })
    }
    render() {
        const { loading, user } = this.state
        const { getFieldDecorator } = this.props.form
        return (
            <Spin spinning={loading}>
                <Form onSubmit={this.submitHandler}>
                    <FormItem {...formItemLayout} label="用户手机">
                        {getFieldDecorator('mobile', {
                            rules: [{
                                validator: (rule, value, callback) => {
                                    if (value && !isMobile(value)) {
                                        callback('请填写正确的手机号码!')
                                    }
                                    callback()
                                }
                            }],
                            validateTrigger: 'onBlur',
                            initialValue: user.mobile
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="用户姓名">
                        {getFieldDecorator('cet_cname', { initialValue: user.cet_cname })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="用户权限">
                        {getFieldDecorator('permission', {
                            initialValue: [user.lesson_num > 0 && '主讲权限', user.rcmd_lesson_num > 0 && '推荐开课']
                        })(
                            <CheckboxGroup options={options} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="开课门数">
                        {getFieldDecorator('lesson_num', { initialValue: user.lesson_num })(
                            <Input type="number" min={1} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="推荐门数">
                        {getFieldDecorator('rcmd_lesson_num', { initialValue: user.rcmd_lesson_num })(
                            <Input type="number" min={1} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="密码重置">
                        {getFieldDecorator('resetpwd', {
                            valuePropName: 'checked',
                            initialValue: false
                        })(<Checkbox>是否重置密码</Checkbox>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="用户状态">
                        {getFieldDecorator('state', { initialValue: user.state && user.state.toString() })(
                            <Select style={{ width: '100px' }}>
                                <Option value="1">正常</Option>
                                <Option value="2">冻结</Option>
                                <Option value="3">删除</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{ offset: 6 }}>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </FormItem>
                </Form>
            </Spin>
        )
    }
}

export default withRouter(Form.create()(UserEdit))
