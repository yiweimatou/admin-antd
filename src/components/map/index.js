import React, { Component } from 'react';
import { loadJS } from '../../utils'

class Map extends Component {
    componentDidMount() {
        if (!window.init) {
            window.init = this.initialMap
        }
        loadJS('http://map.qq.com/api/js?v=2.exp&key=OW6BZ-XQ4KU-BFAVP-BV5JG-ACYN2-P7FOJ&callback=init')
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.latLng || nextProps.latLng.lat === 0 || this.props.latLng.lat === nextProps.latLng.lat) return
        if (!window.qq || !window.qq.maps || !window.qq.maps.LatLng || !this.map) return
        this.marker = new window.qq.maps.Marker({
            position: new window.qq.maps.LatLng(nextProps.latLng.lat, nextProps.latLng.lng),
            map: this.map
        })
    }
    shouldComponentUpdate() {
        return false
    }
    initialMap = () => {
        if (!window.qq || !window.qq.maps || !window.qq.maps.LatLng) return
        const { latLng } = this.props
        let center = new window.qq.maps.LatLng(39.916527, 116.397128);
        if (latLng && latLng.lat !== 0) {
            center = new window.qq.maps.LatLng(latLng.lat, latLng.lng)
        }
        this.map = new window.qq.maps.Map(document.getElementById('map'), {
            center,
            zoom: 13
        });
        if (latLng && latLng.lat === 0) {
            const citylocation = new window.qq.maps.CityService({
                complete: (result) => {
                    this.map.setCenter(result.detail.latLng);
                }
            });
            citylocation.searchLocalCity();
        } else {
             this.marker = new window.qq.maps.Marker({
                position: center,
                map: this.map
            });
            this.marker.setMap(this.map)
        }
        this.clickHandler()
    }
    clickHandler = () => {
        const { setAddress } = this.props
        const geocoder = new window.qq.maps.Geocoder({
            complete(result) {
                setAddress(result.detail.address, result.detail.location)
            }
        })
        // 添加监听事件   获取鼠标单击事件
        window.qq.maps.event.addListener(this.map, 'click', (event) => {
            if (this.marker && this.marker.getMap()) {
                this.marker.setMap(null)
            }
            geocoder.getAddress(event.latLng)
            const marker = new window.qq.maps.Marker({
                position: event.latLng,
                map: this.map
            });
            window.qq.maps.event.addListener(this.map, 'click', () => {
                marker.setMap(null)
            });
        });
    }
    render() {
        return (
            <div id="map" style={{ height: 200, width: '100%' }} />
        );
    }
}

export default Map;
