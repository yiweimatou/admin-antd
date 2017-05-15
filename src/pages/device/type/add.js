import React from 'react'
import { Modal, Form, Input } from 'antd'
import { formItemLayout } from '../../../constants'

const FormItem = Form.Item
const DeviceTypeAdd = (props) => {
    const { visible, form, okHandler, cancelHandler } = props
    const { getFieldDecorator } = form

    const submitHandler = () => {
        form.validateFields((errors, values) => {
            if (errors) return;
            okHandler({
                name: values.name,
                remark: values.remark ? values.remark : '',
                status: 0
            })
        })
    }
    return (
        <Modal visible={visible} title="新增设备类型" onCancel={cancelHandler} onOk={submitHandler} maskClosable={false}>
            <Form>
                <FormItem {...formItemLayout} label="名称">
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '必须填写名称' },
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem label="备注" {...formItemLayout}>
                    {getFieldDecorator('remark')(<Input type="textarea" />)}
                </FormItem>
            </Form>
        </Modal>
    )
}

export default Form.create()(DeviceTypeAdd)
