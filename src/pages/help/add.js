import React, { Component, PropTypes } from 'react';
import { Modal, Spin, Form, Input, InputNumber, message } from 'antd';
import { formItemLayout } from '../../constants';
import ReactQuill from '../../components/ReactQuill';

const FormItem = Form.Item
class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }
    okHandler() {
        this.props.form.validateFields((erros, values) => {
            if (erros) return
            const content = this.refs.editor.quill.root.innerHTML
            if (content === '<p><br></p>') {
                message.error('请输入内容')
                return
            }
            this.setState({ loading: true })
            this.props.onOk({
                ...values,
                content,
                state: 1
            }).then(() => this.setState({ loading: false }))
            .catch((err) => {
                message.error(err)
                this.setState({ loading: false })
            })
        })
    }
    render() {
        const { loading } = this.state
        const { visible, onCancel } = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Modal
              visible={visible}
              title="新增帮助"
              onCancel={onCancel}
              onOk={() => this.okHandler()}
              maskClosable={false}
              width={720}
            >
                <Spin spinning={loading}>
                    <Form>
                        <FormItem {...formItemLayout} label="标题">
                            {getFieldDecorator('title', {
                                rules: [
                                    { required: true, message: '请填写标题' }
                                ]
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="序号">
                            {getFieldDecorator('rank', {
                                initialValue: 1
                            })(<InputNumber min={1} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="内容">
                            <ReactQuill ref="editor" />
                        </FormItem>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}

Add.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default Form.create()(Add);
