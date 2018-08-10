import React, { Component } from 'react'
import { Card, Button, Modal, Form, Select, Input, message, Tree } from 'antd'
import ETable from './../../components/ETable'
import Utils from './../../utils/utils'
import axios from './../../axios'
import data from './../../config/menuConfig'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode
class PermissionUser extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isRoleVisible: false,
			isPermVisible: false
		}
	}

	componentWillMount() {
		axios.requestList(this, '/role/list', {})
	}

	handleRole = () => {
		this.setState({
			isRoleVisible: true
		})
	}

	handleRoleSubmit = () => {
		let data = this.roleForm.props.form.getFieldsValue()
		axios
			.ajax({
				url: 'role/create',
				data: {
					params: data
				}
			})
			.then((res) => {
				if (res.code === 0) {
					this.setState({
						isRoleVisible: false
					})
					this.roleForm.props.form.resetFields()
					axios.requestList(this, '/role/list', {})
				}
			})
	}

	handlePermission = () => {
		let item = this.state.selectedItem
		console.log(item)
		if (!item) {
			Modal.info({
				title: '提示',
				content: '请选择一个用户'
			})
			return
		}

		this.setState({
			isPermVisible: true,
			detailInfo: item,
			menuInfo: item.menus
		})
	}

	handlePermEditSubmit = () => {
    let data = this.permForm.props.form.getFieldsValue()
    data.role_id = this.state.selectedItem.id
    data.menus = this.state.menuInfo
    axios.ajax({
      url: '/permission/edit',
      data: {
        params: {
          ...data
        }
      }
    }).then((res) => {
      if(res.code === 0) {
        this.setState({
          isPermVisible:false
        })
        axios.requestList(this, '/role/list', {})
      }
    })
	}

	render() {
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
				render(create_time) {
					return Utils.formateDate(create_time)
				}
			},
			{
				title: '使用状态',
				dataIndex: 'status',
				render(status) {
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
					<Button type="primary" onClick={this.handleRole}>
						创建员工
					</Button>
					<Button type="primary" onClick={this.handlePermission} style={{ marginLeft: 10, marginRight: 10 }}>
						设置权限
					</Button>
					<Button type="primary">用户授权</Button>
				</Card>
				<div className="content-wrap">
					<ETable
						columns={columns}
						dataSource={this.state.list}
						pagination={this.state.pagination}
						selectedRowKeys={this.state.selectedRowKeys}
						selectedItem={this.state.selectedItem}
						selectedIds={this.state.selectedIds}
						updateSelectedItem={Utils.updateSelectedItem.bind(this)}
						rowSelection={'radio'}
					/>
				</div>
				<Modal
					title="创建角色"
					visible={this.state.isRoleVisible}
					onOk={this.handleRoleSubmit}
					onCancel={() => {
						this.roleForm.props.form.resetFields()
						this.setState({
							isRoleVisible: false
						})
					}}
				>
					<RoleForm wrappedComponentRef={(inst) => (this.roleForm = inst)} />
				</Modal>
				<Modal
					title="设置权限"
					visible={this.state.isPermVisible}
					width={600}
					onOk={this.handlePermEditSubmit}
					onCancel={() => {
						this.setState({
							isPermVisible: false
						})
					}}
				>
					<PermEditForm
						detailInfo={this.state.detailInfo}
						menuInfo={this.state.menuInfo}
						patchMenuInfo={(checkedKeys) => {
							this.setState({
								menuInfo: checkedKeys
							})
						}}
						wrappedComponentRef={(inst) => (this.permForm = inst)}
					/>
				</Modal>
			</div>
		)
	}
}

class RoleForm extends Component {
	render() {
		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 15 }
		}
		const { getFieldDecorator } = this.props.form
		return (
			<div>
				<Form layout="horizontal">
					<FormItem label="角色名称" {...formItemLayout}>
						{getFieldDecorator('role_name')(<Input type="text" placeholder="请输入角色名称" />)}
					</FormItem>

					<FormItem label="状态" {...formItemLayout}>
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

class PermEditForm extends Component {
	renderTreeNodes = (data) => {
		return data.map((item) => {
			if (item.children) {
				return (
					<TreeNode title={item.title} key={item.key}>
						{this.renderTreeNodes(item.children)}
					</TreeNode>
				)
			} else {
				return <TreeNode {...item} />
			}
		})
	}

	onCheck = (checkedKeys) => {
		this.props.patchMenuInfo(checkedKeys)
	}
	render() {
		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 15 }
		}
		const { getFieldDecorator } = this.props.form
		const detailInfo = this.props.detailInfo
		const menuInfo = this.props.menuInfo
		return (
			<div>
				<Form layout="horizontal">
					<FormItem label="角色名称" {...formItemLayout}>
						<Input disabled placeholder={detailInfo.role_name} />
					</FormItem>
					<FormItem label="状态" {...formItemLayout}>
						{getFieldDecorator('status', {
							initialValue: '1'
						})(
							<Select>
								<Option value="1">启用</Option>
								<Option value="0">停用</Option>
							</Select>
						)}
					</FormItem>
				</Form>
				<Tree
					checkable
					defaultExpandAll
					onCheck={(checkedKeys) => {
						this.onCheck(checkedKeys)
					}}
					checkedKeys={menuInfo}
				>
					<TreeNode title="平台权限" key="platform_all">
						{this.renderTreeNodes(data)}
					</TreeNode>
				</Tree>
			</div>
		)
	}
}
PermEditForm = Form.create({})(PermEditForm)

export default PermissionUser
