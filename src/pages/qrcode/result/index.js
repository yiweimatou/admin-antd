import React, { Component } from 'react';
import { Button, message, Modal } from 'antd'
import { download } from 'services/qrcode'
import style from './index.css'

class QRCodeResult extends Component {
    clickHandler = () => {
        const { list } = this.props
        download({
            rcmd_code_list: list
        }).then((data) => {
            window.open(data.path)
        }).catch(error => message.error(error))
    }
    render() {
        const { name1, name2, num, visible, onCancel } = this.props
        return (
            <Modal visible={visible} footer={null} onCancel={onCancel}>
                <div className={style.container}>
                    <h2>二维码已生成</h2>
                    <div className={style.content}>
                        <span>辅导员: {name1}</span>
                        <span>业务员: {name2}</span>
                        <span>数量: {num}</span>
                    </div>
                    <Button type="primary" onClick={this.clickHandler}>批量下载二维码</Button>
                </div>
            </Modal>
        );
    }
}

export default QRCodeResult
