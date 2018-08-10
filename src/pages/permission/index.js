import React, { Component } from 'react'
import { Card, Button, Modal, Form, Select, Input } from 'antd'
import ETable from './../../components/ETable'
import Utils from './../../utils/utils'
import axios from './../../axios'

const FormItem = Form.Item
const Option = Select.Option
class PermissionUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRoleVisible: false
    }
  }

  componentWillMount () {
    axios.requestList(this, '/role/list', {})
  }

  handleRole = () => {
    this.setState({
      isRoleVisible: true
    })
  }

  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldValue()
    axios.ajax({
      url: 'role/create',
      data: {
        params: data
      }
    }).then((res) => {
      if(res.code === 0) {
        this.setState({
          isRoleVisible: false
        })
        this.roleForm.props.form.resetFields()
        axios.requestList(this, '/role/list', {})
      }
    })

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
          return status === 1 ? '启用' : '停用'
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
          <Button type='primary' onClick={this.handleRole}>创建员工</Button>
          <Button type='primary' style={{ marginLeft: 10, marginRight: 10 }}>
						设置权限
          </Button>
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
        <Modal
          title='创建角色'
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.roleForm.props.form.resetFields()
            this.setState({
              isRoleVisible: false
            })
          }}
        >
          <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst} />
        </Modal>
      </div>
    )
  }
}

class RoleForm extends Component {
  render () {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form layout='horizontal'>
          <FormItem label='角色名称' {...formItemLayout}>
            {getFieldDecorator('role_name')(<Input type='text' placeholder='请输入角色名称' />)}
          </FormItem>

          <FormItem label='状态' {...formItemLayout}>
            {getFieldDecorator('state')(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>关闭</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </div>
    )
  }
}

RoleForm = Form.create({})(RoleForm)
export default PermissionUser
