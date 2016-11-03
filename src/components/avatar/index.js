import React, { Component, PropTypes } from 'react';
import styles from './index.css'

class Avatar extends Component {
    render() {
        const { src, name } = this.props
        const str = (name && name.slice(0, 1)) || '无名'
        return (
            <div className={styles.avatar}>
                { src ?
                    <img alt="avatar" className={styles.img} src={src} width="100%" /> :
                    str
                }
            </div>
        );
    }
}

Avatar.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string
}

export default Avatar;
