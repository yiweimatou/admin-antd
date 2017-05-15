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
                    <MenuItem key="help">
                        <Link to="help"><Icon type="question" />帮助管理</Link>
                    </MenuItem>
                    <MenuItem key="swiper">
                        <Link to="/swiper"><Icon type="file-jpg" /><span>轮播图管理</span></Link>
                    </MenuItem>
                    <SubMenu key="record" title={<span><Icon type="folder" />档案管理</span>}>
                        <MenuItem>
                          <Link to="/record/category">
                            档案记录项类目
                          </Link>
                        </MenuItem>
                    </SubMenu>
                    <SubMenu key="organize" title={<span><Icon type="team" />机构管理</span>}>
                        <MenuItem><Link to="/organize/add">新建机构</Link></MenuItem>
                        <MenuItem><Link to="/organize/list">机构列表</Link></MenuItem>
                    </SubMenu>
                    <SubMenu key="user" title={<span><Icon type="user" />用户管理</span>}>
                        <MenuItem><Link to="/user/list">用户列表</Link></MenuItem>
                    </SubMenu>
                    <SubMenu key="lesson" title={<span><Icon type="solution" />课程管理</span>}>
                        <MenuItem><Link to="/lesson/list">课程列表</Link></MenuItem>
                    </SubMenu>
                    <SubMenu key="section" title={<span><Icon type="file" />文章管理</span>}>
                        <MenuItem><Link to="/section/list">文章列表</Link></MenuItem>
                        <MenuItem><Link to="/h5/list">系统图文管理</Link></MenuItem>
                    </SubMenu>
                    <SubMenu key="qrcode" title={<span><Icon type="qrcode" />二维码管理</span>}>
                        <MenuItem><Link to="/qrcode/add">新建二维码</Link></MenuItem>
                        <MenuItem><Link to="/qrcode/list">二维码列表</Link></MenuItem>
                    </SubMenu>
                    <SubMenu key="device" title={<span><Icon type="mobile" />设备管理</span>}>
                        <MenuItem>
                            <Link to="/device/list">设备管理</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/device/type/list">设备类型管理</Link>
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </aside>
        );
    }
}

export default Aside;
