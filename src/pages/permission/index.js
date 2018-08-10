import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import ETable from './../../components/ETable'
import Utils from './../../utils/utils'
import axios from './../../axios'
class PermissionUser extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount () {
    axios.requestList(this, '/role/list', {})
  }

  render () {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        dataIndex: 'role_name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render (create_time) {
          return Utils.formateDate(create_time)
        }
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render (status) {
          return status === 1 ? '启用':'停用'
        }
      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formateDate
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name'
      }

    ]
    return (

      <div>
        <Card>
          <Button type='primary'>创建员工</Button>
          <Button type='primary' style={{marginLeft: 10, marginRight: 10}}>设置权限</Button>
          <Button type='primary'>用户授权</Button>
        </Card>
        <div className='content-wrap'>
          <ETable
            dataSource={this.state.list}
            columns={columns}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
          />
        </div>
      </div>
    )
  }
}

export default PermissionUser
