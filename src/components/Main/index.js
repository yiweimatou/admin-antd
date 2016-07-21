import React, { Component, PropTypes } from 'react';
import './index.css';
import NavMenu from '../NavMenu'
import Login from '../Login'
import { Button } from 'antd'

class Main extends Component{
    render(){
        const { auth,children,login,logout } = this.props
        return (
            <div className="ant-layout-topaside">
                <Login 
                    isAuthed = {auth&&auth.isAuthed} 
                    loading = {auth&&auth.loading}
                    login={login}
                />
                <div className="ant-layout-header">
                    <div className="ant-layout-wrapper">
                        <div className="ant-layout-logo">
                            <h2>医卫码头管理后台</h2>
                        </div>
                        <div className="ant-layout-login">
                            <Button 
                                icon = 'logout'
                                type = 'ghost'
                                onClick = { logout }
                            >
                                登出
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="ant-layout-wrapper">
                    <div className="ant-layout-container">
                        <aside className="ant-layout-sider">
                            <NavMenu />
                        </aside>
                        <div className="ant-layout-content">
                            <div style={{clear: 'both'}}>{children}</div>
                        </div>
                    </div>
                    <div className="ant-layout-footer">
                        版权所有 © 2016 由医卫里技术部支持
                    </div>
                </div>
            </div>
        )
    }
}

Main.propTypes = {
    children: PropTypes.element,
    auth:PropTypes.object.isRequired,
    login:PropTypes.func.isRequired,
    logout:PropTypes.func.isRequired
}

export default Main
