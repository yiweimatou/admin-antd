import React, { Component } from 'react'
import { Modal, Input, Form, Radio, message } from 'antd'
import { formItemLayout } from '../../constants'
import deviceTypeService from '../../services/device_type'

const FormItem = Form.Item
class DeviceAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            types: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.visible && nextProps.visible) {
            this.getTypes()
        }
    }
    getTypes = () => {
        deviceTypeService.list({ status: 0, limit: 100 }).then((data) => {
            this.setState({ types: data.list })
        }).catch(err => message.error(err))
    }

    submitHandler = () => {
        this.props.form.validateFields((errors, values) => {
            if (errors) return
            const type = this.state.types.find(v => v.id === values.type_id)
            this.props.okHandler({
                idcard: values.idcard,
                remark: values.remark ? values.remark : '',
                type_id: values.type_id,
                type_name: type ? type.name : ''
            })
        })
    }

    render() {
        const { visible, form, cancelHandler } = this.props
        const { getFieldDecorator } = form
        const { types } = this.state

        return (
            <Modal visible={visible} title="新增设备" maskClosable={false} onCancel={cancelHandler} onOk={this.submitHandler} >
                <Form>
                    <FormItem {...formItemLayout} label="标识符">
                        {getFieldDecorator('idcard', {
                            rules: [
                                { required: true, message: '必须填写' }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="设备类型">
                        {getFieldDecorator('type_id', {
                            rules: [
                                { required: true, message: '必须选择' }
                            ],
                        })(<Radio.Group>
                            {types.map(type => <Radio key={type.id} value={type.id}>{type.name}</Radio>)}
                        </Radio.Group>)}
                    </FormItem>
                    <FormItem label="备注" {...formItemLayout}>
                        {getFieldDecorator('remark')(<Input type="textarea" />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(DeviceAdd)
