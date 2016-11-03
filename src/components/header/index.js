import React from 'react';
import { withRouter } from 'react-router'
import { Menu, Dropdown } from 'antd'
import Avatar from '../avatar'
import styles from './index.css'

class Header extends React.Component {
    clickHandler = () => {
        localStorage.clear()
        this.props.router.push({ pathname: '/login' })
    }
    render() {
        const user = JSON.parse(localStorage.user)
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={this.clickHandler}>退出</a>
                </Menu.Item>
            </Menu>
        )
        return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <h2>管理后台</h2>
                </div>
                <div className={styles.login}>
                    <Dropdown overlay={menu}>
                        <a href="#"><Avatar src={user.cover} name={user.cname} /></a>
                    </Dropdown>
                </div>
            </div>
        </div>)
    }
}
export default withRouter(Header);
