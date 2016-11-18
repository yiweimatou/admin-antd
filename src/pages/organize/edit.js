import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Form, Button, Spin, Input, message } from 'antd'
import { formItemLayout } from 'constants'
import { get as getOrganize, edit as editOrganize } from 'services/organize'
import { get as getOrganizeTeam, edit as editOrganizeTeam } from 'services/organizeTeam'
import { get as getUser } from 'services/user'
// import { init } from 'services/category'
import { get as getGrow, add as addGrow, edit as editGrow } from 'services/grow'
import Map from '../../components/map'
import UserSelector from '../../components/user/selector'
import Category from '../../components/category'
import { ORGANIZE } from '../../constants'

const FormItem = Form.Item
class EditOrganize extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            visible: false,
            adminId: 0,
            record: {},
            categoryIds: [],
            options: [],
            growId: 0,
            latLng: {}
        }
    }
    componentWillMount() {
        const id = this.props.router.params.id
        // init(id, (error, growId, defaultValues, options) => {
        //     if (error) {
        //         message.error(error)
        //     } else {
        //         this.setState({ growId, categoryIds: defaultValues, options })
        //     }
        // })
        getGrow({ foreign_id: id, category_id: ORGANIZE }).then((data) => {
            if (data.get.id > 0) {
                this.setState({ growId: data.get.id })
            }
        })
        getOrganize({ id }).then((data) => {
            if (data.get.id) {
                this.setState({
                    record: {
                        id: data.get.id,
                        title: data.get.title,
                        address: data.get.address,
                        latLng: { lat: data.get.lat, lng: data.get.lng }
                    }
                })
                return getOrganizeTeam({ organize_id: id, role: 1 })
            }
            return Promise.reject('机构不存在！')
        }).then((data) => {
            if (data.get.id) {
                this.setState({ record: { ...this.state.record, adminId: data.get.account_id } })
                return getUser({ id: data.get.account_id })
            }
            return Promise.reject('获取管理员出错！')
        }).then((data) => {
            if (data.get.id) {
              return this.setState({
                    record: {
                        ...this.state.record,
                        name: data.get.cname
                    },
                    loading: false
                })
            }
            return Promise.reject('获取管理员昵称出错！')
        })
        .catch((error) => {
            message.error(error)
            this.setState({ loading: false })
        })
    }
    setAddress = (address, latLng) => {
        this.props.form.setFieldsValue({ address })
        this.setState({
            record: {
                ...this.state.record,
                latLng
            }
        })
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.form.validateFields((errors, values) => {
            if (errors) return
            const { adminId, record, categoryIds, growId, latLng } = this.state
            if (record.adminId !== adminId && adminId > 0) {
                editOrganizeTeam({ account_id: adminId, organize_id: record.id }).catch(error => message.error(error))
            }
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
                        category_id: ORGANIZE,
                        kind: '234',
                        title: record.title
                    })
                }
            }
            editOrganize({
                id: record.id,
                title: values.title,
                address: values.address,
                lat: record.latLng.lat,
                lng: record.latLng.lng
            }).then(() => {
                this.setState({ loading: false })
                message.success('编辑成功!')
                this.props.router.push({ pathname: '/organize/list' })
            }).catch((error) => {
                message.error(error)
                this.setState({ loading: false })
            })
        })
    }
    visibleHandler = () => this.setState({ visible: !this.state.visible })
    selectHandler = (user) => {
        this.props.form.setFieldsValue({
            name: user.name
        })
        this.setState({
            adminId: user.id,
            visible: false
        })
    }
    render() {
        const { loading, record, visible } = this.state
        const { getFieldDecorator } = this.props.form
        return (
            <Spin spinning={loading}>
                <UserSelector visible={visible} selectHandler={this.selectHandler} cancelHandler={this.visibleHandler} />
                <Form onSubmit={this.submitHandler}>
                    <FormItem label="机构名称" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('title', {
                            initialValue: record.title,
                            rules: [{ required: true, message: '请填写机构名称!' }]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="管理员" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('name', {
                            initialValue: record.name,
                            rules: [{ required: true, message: '请选择管理员' }]
                        })(<Input readOnly onClick={this.visibleHandler} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="机构分类">
                        <Category onChange={(categoryIds, latLng) => this.setState({ categoryIds, latLng })} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="机构定位">
                        <Map latLng={record.latLng || { lat: 0, lng: 0 }} setAddress={this.setAddress} />
                    </FormItem>
                    <FormItem label="地址" {...formItemLayout}>
                        {getFieldDecorator('address', {
                            initialValue: record.address
                        })(<Input />)}
                    </FormItem>
                    <FormItem wrapperCol={{ offset: 6 }}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </Spin>
        )
    }
}

export default withRouter(Form.create()(EditOrganize))
