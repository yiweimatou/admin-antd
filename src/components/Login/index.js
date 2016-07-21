import React,{ Component,PropTypes } from 'react'
import { Modal,Button,Form,Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
}

class Login extends Component{
    submitHandler=(e)=>{
        e.preventDefault()
        this.props.form.validateFields((errors,values)=>{
            if(errors){
                return
            }
            this.props.login(values)
        })
    }
    render(){
        const { loading,isAuthed,form } = this.props
        const { getFieldProps } = form
        const accountProps = getFieldProps('account',{
            rules:[{
                required:true,
                message:'请输入账号'
            }]
        })
        const passwordProps = getFieldProps('pwd',{
            rules:[{
                required:true,
                message:'请输入密码'
            }]
        })
        return(
            <Modal 
                title = '登录'
                visible = { !isAuthed }
                closable = {false}
                footer = {
                    <Button 
                        onClick={this.submitHandler} 
                        type = 'primary'
                        loading = {loading}
                    >
                        登录
                    </Button>
                }
            >
                <Form horizontal form = {form}>
                    <FormItem
                        {...formItemLayout}
                        label = '帐号'
                        hasFeedback
                    >
                        <Input 
                            type="text"
                            {...accountProps}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"     
                        hasFeedback 
                    >
                        <Input 
                            type="password" 
                            {...passwordProps}
                        />
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

Login.propTypes = {
    isAuthed:PropTypes.bool.isRequired,
    form:PropTypes.object.isRequired,
    login:PropTypes.func.isRequired,
    loading:PropTypes.bool.isRequired
}

export default Form.create()(Login)