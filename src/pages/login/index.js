import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { routerShape } from 'react-router/lib/PropTypes'
import { Form, Button, Input, Icon, Spin, message } from 'antd'
import styles from './index.css'
import { isMobile } from '../../utils'
import { login } from '../../services/auth'
// import { get as getUser } from '../../services/user'

const FormItem = Form.Item

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetching: false
        }
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.form.validateFields((errors, values) => {
            if (errors) return
            const { mobile, password } = values
            this.setState({ fetching: true })
            login(mobile, password).then((data) => {
                const { key, token } = data
                localStorage.uid = key
                localStorage.token = token
                // return getUser({ id: key })
                this.setState({ fetching: false })
                const { router } = this.props
                let redirect = router.location.query.redirect
                if (!redirect) {
                    redirect = '/'
                }
                router.push({ pathname: redirect })
            }).catch((error) => {
                message.error(error)
                this.setState({ fetching: false })
            })
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { fetching } = this.state
        return (
            <div className={styles.normal}>
                <Spin spinning={fetching}>
                    <Form className={styles.form} onSubmit={this.submitHandler}>
                        <FormItem hasFeedback>
                            {getFieldDecorator('mobile', {
                                validateTrigger: 'onBlur',
                                rules: [
                                    { validator: (rule, value, callback) => {
                                        if (!value) {
                                            callback('请填写手机号码!')
                                        } else if (isMobile(value)) {
                                            callback()
                                        } else {
                                            callback('手机号码不正确!')
                                        }
                                    } }
                                ],
                            })(
                                <Input addonBefore={<Icon type="mobile" />} placeholder="手机号码" />
                            )}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('password', {
                                validateTrigger: 'onBlur',
                                rules: [{ required: true, message: '请填写密码' }]
                            })(
                                <Input type="password" addonBefore={<Icon type="lock" />} placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>登录</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </div>
        );
    }
}

Login.propTypes = {
    router: routerShape
}

export default withRouter(Form.create()(Login));
