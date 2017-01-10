import React, { Component } from 'react'
import { Form, Input, Spin, message, Modal } from 'antd'
import { formItemLayout } from '../../../constants/index'
// import Category from '../../../components/category'
import ReactQuill from '../../../components/ReactQuill'
import ImgUploader from '../../../components/ImgUploader'
// import { add as grow } from '../../../services/grow'
import { edit } from '../../../services/h5'

const FormItem = Form.Item
class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            fileList: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.record.id !== nextProps.record.id && nextProps.record.cover) {
            this.setState({ fileList: [{
                uid: -1,
                url: nextProps.record.cover,
                response: {
                    cover: nextProps.record.cover
                }
            }] })
        }
    }
    submitHandler = () => {
        this.props.form.validateFields((errors, values) => {
            if (errors) return
            const { title, descript, sale_amount } = values
            const content = this.refs.editor.quill.root.innerHTML
            if (content === '<p><br></p>') {
                message.error('请输入内容')
                return
            }
            const { fileList } = this.state
            let cover = ''
            if (fileList && fileList[0]) {
                cover = fileList[0].response.cover
            }
            const params = {
                title, descript, content, sale_amount: sale_amount * 100, cover, id: this.props.record.id
            }
            this.setState({ loading: true })
            edit(params).then(() => {
                this.setState({ loading: false })
                this.props.form.resetFields()
                this.props.onOk(params)
            }).catch((error) => {
                this.setState({ loading: false })
                message.error(error)
            })
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { loading } = this.state
        const { onCancel, record, visible } = this.props
        return (
            <Modal visible={visible} title="编辑" onOk={this.submitHandler} onCancel={onCancel} width={720} maskClosable={false}>
                <Spin spinning={loading}>
                    <Form onSubmit={this.submitHandler}>
                        <FormItem {...formItemLayout} label="标题">
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true,
                                    message: '请输入标题'
                                }],
                                initialValue: record.title
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="金额">
                            {getFieldDecorator('sale_amount', {
                                rules: [{
                                    required: true,
                                    message: '请输入金额'
                                }],
                                validateTrigger: 'onBlur',
                                initialValue: record.sale_amount / 100
                            })(<Input type="number" addonAfter="元" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="封面">
                            <ImgUploader fileList={this.state.fileList} onChange={fileList => this.setState({ fileList })} />
                        </FormItem>
                        <FormItem {...formItemLayout} label="描述">
                            {getFieldDecorator('descript', { initialValue: record.descript })(<Input type="textarea" rows={3} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="内容">
                            <ReactQuill ref="editor" content={record.content} />
                        </FormItem>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}

export default Form.create()(Edit)
