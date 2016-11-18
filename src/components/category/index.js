import React, { Component } from 'react'
import { Cascader, message } from 'antd'
import { list as getList } from '../../services/category'

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [],
            value: [],
            latLng: { lat: 0, lng: 0 }
        }
    }
    componentWillMount() {
        getList({ parent_id: 'iMedAA0109_10' }).then((data) => {
            if (data.list.length > 0) {
                this.setState({
                    options: data.list.map(item => ({
                        label: item.title,
                        value: item.id,
                        isLeaf: false,
                        lat: item.lat,
                        lng: item.lng,
                        area: {
                            lat1: item.lat1,
                            lat2: item.lat2,
                            lng1: item.lng1,
                            lng2: item.lng2
                        }
                    }))
                })
            }
        })
    }
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true
        getList({
            parent_id: targetOption.value
        }).then((data) => {
            const list = data.list
            if (list.length > 0) {
                targetOption.children = list.map(item => ({
                    label: item.title,
                    value: item.id,
                    isLeaf: false,
                    lat: item.lat,
                    lng: item.lng,
                    area: {
                        lat1: item.lat1,
                        lat2: item.lat2,
                        lng1: item.lng1,
                        lng2: item.lng2
                    }
                }))
            } else {
                targetOption.children = []
            }
            this.setState({
                options: [...this.state.options]
            })
            targetOption.loading = false
        }).catch(error => message.error(error))
    }
    changeHandler = (value, selectedOptions) => {
        const selectedValues = selectedOptions.map(i => i.value)
        this.setState({ value: selectedValues })
        if (this.props.onChange) {
            const targetOption = selectedOptions[selectedOptions.length - 1]
            this.props.onChange(selectedValues, {
                lat: targetOption.lat,
                lng: targetOption.lng
            }, targetOption.area)
        }
    }
    render() {
        const { value, options } = this.state
        const { style } = this.props
        return (
            <Cascader
              options={options}
              onChange={this.changeHandler}
              loadData={this.loadData}
              placeholder={'请选择分类'}
              value={value}
              changeOnSelect
              style={style}
            />)
    }
}

export default Category
