import React, { Component, PropTypes } from 'react'
import Header from '../header/index'
import Aside from '../aside/index'
import styles from './index.css'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Aside />
        <div className={styles.main}>
            <div className={styles.breadcrumb}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
}

export default App;
