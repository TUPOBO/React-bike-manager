import React, { Component } from 'react'
import { Row } from 'antd'
import Header from './components/Header'

import './style/comment.less'
class Common extends Component {
  render () {
    return (
      <div>
        <Row className='simple-page'>
          <Header menuType='second' />
        </Row>
        <Row className='content' style={{textAlign: 'left'}}>{this.props.children}</Row>
      </div>
    )
  }
}

export default Common
