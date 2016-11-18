import React, { Component } from 'react'
import { Form, Modal, Input, message } from 'antd'
import { formItemLayout, ACCOUNT } from '../../constants'
import Category from '../../components/category'
import { edit } from '../../services/user'
import Map from '../../components/map'
import { get as getGrow, add as addGrow, edit as editGrow } from '../../services/grow'

const FormItem = Form.Item
class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            categoryIds: [],
            latLng: {},
            record: {},
            growId: 0
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.record.id !== this.state.record.id) {
            this.setState({ record: nextProps.record })
            getGrow({
                category_id: ACCOUNT,
                foreign_id: nextProps.record.id,
                map_id: 1
            }).then((data) => {
                if (data.get.id > 0) {
                    this.setState({
                        growId: data.get.id,
                        latLng: {
                            lat: data.get.lat,
                            lng: data.get.lng
                        }
                    })
                }
            })
        }
    }
    setAddress = (address, latLng) => {
        this.props.form.setFieldsValue({ cet_add: address })
        this.setState({
            record: {
                ...this.state.record,
                cet_lat: latLng.lat,
                cet_lng: latLng.lng
            }
        })
    }
    submitHandler = () => {
        this.props.form.validateFields((errors, values) => {
            if (errors) return
            const { growId, latLng, categoryIds, record } = this.state
            const { cet_cname, cet_add, cet_dept, cet_org, cet_rank, cet_desc } = values
            this.setState({ loading: true })
            if (categoryIds.length > 0) {
                if (growId > 0) {
                    editGrow({ id: growId, lat: latLng.lat, lng: latLng.lng })
                } else {
                    addGrow({
                        lat: latLng.lat,
                        lng: latLng.lng,
                        foreign_id: record.id,
                        map_id: 1,
                        category_id: ACCOUNT,
                        kind: '234',
                        title: cet_cname
                    })
                }
            }
            edit({
                id: record.id, cet_add, cet_dept, cet_rank, cet_org, cet_lat: record.cet_lat, cet_lng: record.cet_lng, cet_cname, cet_desc, cet: 3
            }).then(() => {
                this.setState({ loading: false })
                message.success('修改成功!')
                this.props.onOk(cet_cname)
            }, (error) => {
                message.error(error)
                this.setState({ loading: false })
            })
        })
    }
    render() {
        const { visible, onCancel, record } = this.props
        const { loading } = this.state
        const { getFieldDecorator } = this.props.form
        return (
            <Modal width="720px" maskClosable={false} comfirmLoading={loading} visible={visible} onOk={this.submitHandler} onCancel={onCancel}>
                <Form onSubmit={this.submitHandler}>
                    <FormItem {...formItemLayout} label="认证姓名">
                        {getFieldDecorator('cet_cname', {
                            initialValue: record.cet_cname,
                            rules: [{ required: true, message: '请填写认证姓名' }]
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="分类">
                        <Category onChange={(categoryIds, latLng) => this.setState({ categoryIds, latLng })} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="所在单位">
                        {getFieldDecorator('cet_org', { initialValue: record.cet_org })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="科室">
                        {getFieldDecorator('cet_dept', { initialValue: record.cet_dept })(<Input />)}
                    </FormItem>
                     <FormItem {...formItemLayout} label="职称">
                        {getFieldDecorator('cet_rank', { initialValue: record.cet_rank })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="定位">
                        <Map latLng={{ lat: record.cet_lat, lng: record.cet_lng }} setAddress={this.setAddress} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="地址">
                        {getFieldDecorator('cet_add', {
                            initialValue: record.cet_add
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="简介">
                        {getFieldDecorator('cet_desc', {
                            initialValue: ''
                        })(<Input type="textarea" rows={5} />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(Auth)
