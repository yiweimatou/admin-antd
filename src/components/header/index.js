import React from 'react';
import { withRouter } from 'react-router'
import { Menu, Dropdown } from 'antd'
import { get as getUser } from 'services/user'
import Avatar from '../avatar'
import styles from './index.css'
import { WECHATLOGIN } from '../../constants'

class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {
                cname: '无'
            }
        }
    }
    componentWillMount() {
        if (!localStorage.user) {
            getUser({ id: localStorage.uid }).then((data) => {
                const user = {
                    id: data.get.id,
                    cover: data.get.cover,
                    cname: data.get.cname,
                    cet_cname: data.get.cet_cname,
                    mobile: data.get.mobile
                }
                localStorage.user = JSON.stringify(user)
                this.setState({ user })
            })
        } else {
            this.setState({
                user: JSON.parse(localStorage.user)
            })
        }
    }
    clickHandler = () => {
        localStorage.clear()
        window.location.replace(WECHATLOGIN)
    }
    render() {
        const { user } = this.state
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
