import React, { Component } from 'react'
import { Form, Input, Button, Spin, message } from 'antd'
import { formItemLayout, HTML } from '../../../constants/index'
import Category from '../../../components/category'
import ReactQuill from '../../../components/ReactQuill'
import ImgUploader from '../../../components/ImgUploader'
import { add as grow } from '../../../services/grow'
import { add } from '../../../services/h5'

const FormItem = Form.Item
class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            fileList: [],
            category: [],
            latLng: {}
        }
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.form.validateFields((errors, values) => {
            if (errors) return
            const { title, descript, sale_amount } = values
            const content = this.refs.editor.quill.root.innerHTML
            if (content === '<p><br></p>') {
                message.error('请输入内容')
                return
            }
            const { category, latLng, fileList } = this.state
            let cover = ''
            if (fileList && fileList[0]) {
                cover = fileList[0].response.cover
            }
            const params = {
                title, descript, content, sale_amount: sale_amount * 100, state: 1, cover
            }
            if (category.length > 0 && category.length < 3) {
                message.error('请再选择一级分类')
                return
            }
            this.setState({ loading: true })
            add(params).then((data) => {
                this.setState({ loading: false })
                this.props.form.resetFields()
                if (category.length > 0) {
                    grow({
                        title,
                        lat: latLng.lat,
                        ng: latLng.lng,
                        state: 1,
                        category_id: HTML,
                        foreign_id: data.identity,
                        kind: category[0] === '1' ? category[1] : category[2],
                        map_id: 1
                    })
                }
            }).catch((error) => {
                this.setState({ loading: false })
                message.error(error)
            })
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { loading } = this.state
        return (
            <Spin spinning={loading}>
                <Form onSubmit={this.submitHandler}>
                    <FormItem {...formItemLayout} label="标题">
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: '请输入标题'
                            }]
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="金额">
                        {getFieldDecorator('sale_amount', {
                            rules: [{
                                required: true,
                                message: '请输入金额'
                            }],
                            validateTrigger: 'onBlur',
                            initialValue: 0
                        })(<Input type="number" addonAfter="元" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="分类">
                        <Category onChange={(value, latLng) => this.setState({ category: value, latLng })} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="封面">
                        <ImgUploader fileList={this.state.fileList} onChange={fileList => this.setState({ fileList })} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="描述">
                        {getFieldDecorator('descript')(<Input type="textarea" rows={3} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="内容">
                        <ReactQuill ref="editor" />
                    </FormItem>
                    <FormItem wrapperCol={{ offset: 6 }}>
                        <Button htmlType="submit" type="primary">新建</Button>
                    </FormItem>
                </Form>
            </Spin>
        )
    }
}

export default Form.create()(Add)
