import React, { Component } from 'react';
import { Form, Spin, Input, Button, message } from 'antd'
import { withRouter } from 'react-router'
import { formItemLayout, ORGANIZE } from 'constants'
import { add as addOrganize } from 'services/organize'
import { add as addGrow } from 'services/grow'
import UserSelector from '../../components/user/selector'
import Category from '../../components/category'
import Map from '../../components/map'

const FormItem = Form.Item
class AddOrganize extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            visible: false,
            adminId: '',
            latLng: {},
            categoryIds: []
        }
    }
    setAddress = (address, latLng) => {
        this.props.form.setFieldsValue({ address })
        this.setState({
                latLng
        })
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.form.validateFields((errors, values) => {
            if (errors) return
            const { categoryIds, latLng } = this.state
            addOrganize({
                title: values.title,
                account_id: this.state.adminId,
                address: values.address,
                lat: (latLng && latLng.lat) || '',
                lng: (latLng && latLng.lng) || ''
            }).then((data) => {
                if (categoryIds.length > 0) {
                    addGrow({
                        lat: latLng.lat,
                        lng: latLng.lng,
                        foreign_id: data.identity,
                        map_id: 1,
                        category_id: ORGANIZE,
                        kind: '234',
                        title: values.title
                    })
                }
                this.props.router.push({ pathname: '/organize/list' })
            }).catch(error => message.error(error))
        })
    }
    clickHandler = () => this.setState({ visible: !this.state.visible })
    selectHandler = (user) => {
        this.props.form.setFieldsValue({ name: user.name })
        this.setState({ adminId: user.id, visible: false })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { loading, visible } = this.state
        return (
            <Spin spinning={loading}>
                <UserSelector visible={visible} cancelHandler={this.clickHandler} selectHandler={this.selectHandler} />
                <Form onSubmit={this.submitHandler}>
                    <FormItem label="机构名称" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true, message: '请填写机构名称!'
                            }]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="管理员" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请填写管理员!'
                            }]
                        })(<Input readOnly onClick={this.clickHandler} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="机构分类">
                        <Category hospital onChange={(categoryIds, latLng) => this.setState({ categoryIds, latLng })} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="机构定位">
                        <Map latLng={{ lat: 0, lng: 0 }} setAddress={this.setAddress} />
                    </FormItem>
                    <FormItem label="地址" {...formItemLayout}>
                        {getFieldDecorator('address')(<Input />)}
                    </FormItem>
                    <FormItem wrapperCol={{ offset: 6 }}>
                        <Button type="primary" htmlType="submit">新建</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default withRouter(Form.create()(AddOrganize));
