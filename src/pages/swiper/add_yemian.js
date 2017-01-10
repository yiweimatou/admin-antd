import React, { Component, PropTypes } from 'react'
import { Modal, message, Spin, Form, Input, Upload, Icon, InputNumber, Button } from 'antd'
import { formItemLayout, HTML } from '../../constants'
import { UPLOAD_SWIPER } from '../../constants/api'
import swiperService from '../../services/swiper'

const FormItem = Form.Item
class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            fileList: []
        }
        this.changeHandler = this.changeHandler.bind(this)
    }
    changeHandler(info) {
        let fileList = info.fileList
        fileList = fileList.slice(-1).filter((file) => {
            if (file.response) {
               return file.response.code === 200
            }
            return true
        })
        if (info.file.status === 'error') {
            message.error('服务器未响应，请稍后再试')
        }
        if (info.file.status === 'done') {
            message.success('上传成功！')
        }
        this.setState({ fileList })
    }
    okHandler = () => {
        this.props.form.validateFields((erros, values) => {
            if (erros) return
            const { fileList } = this.state
            if (fileList.length === 0) return
            const params = {
                title: values.title,
                path: fileList[0].response.swiper,
                category_id: HTML,
                url: values.url,
                rank: values.rank,
                state: 1,
                foreign_id: 0
            }
            this.setState({ loading: true })
            swiperService.add(params).then((data) => {
                this.props.onOk({
                    ...params,
                    id: data.identity
                })
                this.setState({ loading: false })
            }).catch((err) => {
                message.error(err)
                this.setState({ loading: false })
            })
        })
    }
    render() {
        const { loading } = this.state
        const { getFieldDecorator } = this.props.form
        const { onCancel, visible } = this.props
        const props = {
            name: 'upload_file',
            action: UPLOAD_SWIPER,
            listType: 'picture',
            fileList: this.state.fileList,
            accept: 'image/jpeg, image/png',
            onChange: this.changeHandler
        }
        return (
            <Modal visible={visible} title="添加" width={720} onOk={this.okHandler} onCancel={onCancel} maskClosable={false}>
                <Spin spinning={loading}>
                    <Form>
                        <FormItem label="轮播图标题" {...formItemLayout}>
                            {getFieldDecorator('title', {
                                rules: [
                                    { required: true, message: '请填写标题' }
                                ]
                            })(<Input />)}
                        </FormItem>
                        <FormItem required label="上传轮播图" {...formItemLayout}>
                            <Upload {...props}>
                                <Button type="ghost">
                                    <Icon type="upload" />上传
                                </Button>
                            </Upload>
                        </FormItem>
                        <FormItem label="排序" {...formItemLayout}>
                            {getFieldDecorator('rank', { initialValue: 1 })(<InputNumber min={1} />)}
                        </FormItem>
                        <FormItem label="页面地址" {...formItemLayout}>
                            {getFieldDecorator('url', {
                                rules: [
                                    { required: true, message: '请填写地址' }
                                ]
                            })(<Input />)}
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
}

export default Form.create()(Add)
