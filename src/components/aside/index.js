import React, { Component } from 'react';
import { Icon, Menu } from 'antd'
import { Link } from 'react-router'
import styles from './index.css'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
class Aside extends Component {
    render() {
        return (
            <aside className={styles.sider}>
                <Menu mode="inline" theme="dark">
                    <MenuItem key="dashboard">
                        <Link to="/dashboard"><Icon type="laptop" /><span>工作台</span></Link>
                    </MenuItem>
                    <SubMenu key="qrcode" title={<span><Icon type="qrcode" />二维码管理</span>}>
                        <MenuItem><Link to="/qrcode/add">新建二维码</Link></MenuItem>
                        <MenuItem><Link to="/qrcode/list">二维码列表</Link></MenuItem>
                    </SubMenu>
                </Menu>
            </aside>
        );
    }
}

export default Aside;
