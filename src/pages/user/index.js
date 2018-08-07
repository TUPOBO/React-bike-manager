import React, { Component } from 'react'
import { Card, Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm'
import ETable from './../../components/ETable'
import './../../style/comment.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const Option = Select.Option
class User extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isVisible: false
		}
		this.formList = [
			{
				type: 'INPUT',
				label: '用户名',
				field: 'user_name',
				width: 130,
				placeholder: '请输入用户名称'
			},
			{
				type: 'INPUT',
				label: '手机号',
				field: 'user_mobile',
				width: 130,
				placeholder: '请输入手机号'
			},
			{
				type: 'DATEPICKER',
				label: '入职日期',
				field: 'user_date',
				width: 80,
				placeholder: '请选择日期'
			}
		]
	}

	componentWillMount() {
		this.requestList()
	}

	handleFilter = (params) => {
		this.params = params
		this.requestList()
	}

	requestList = () => {
		axios.requestList(this, '/user/list', this.params)
	}

	handleOperate = (type) => {
		if (type === 'create') {
			this.setState({
				type,
				isVisible: true,
				title: '创建员工'
			})
		}
  }

  //创建员工提交
  handleSubmit = () => {
    let type = this.state.type
    let data = this.userForm.props.form.getFieldsValue()
    axios.ajax({
      url: '/user/add',
      data: {
        params: data
      }
    }).then((res) => {
      if (res.code === 0) {
        this.setState({
          isVisible: false
        })
        this.requestList()
      }
    })
  }

	render() {
		const columns = [
			{
				title: 'id',
				dataIndex: 'id'
			},
			{
				title: '用户名',
				dataIndex: 'userName'
			},
			{
				title: '性别',
				dataIndex: 'sex',
				render(sex) {
					return sex === 1 ? '男' : '女'
				}
			},
			{
				title: '状态',
				dataIndex: 'state',
				render(state) {
					let config = {
						'1': '咸鱼一条',
						'2': '风华浪子',
						'3': '北大才子',
						'4': '百度FE',
						'5': '创业者'
					}
					return config[state]
				}
			},
			{
				title: '爱好',
				dataIndex: 'interest',
				render(interest) {
					let config = {
						'1': '游泳',
						'2': '跑步',
						'3': '篮球',
						'4': '足球',
						'5': '爬山',
						'6': '骑行',
						'7': '桌球',
						'8': '麦霸'
					}
					return config[interest]
				}
			},
			{
				title: '生日',
				dataIndex: 'birthday'
			},
			{
				title: '地址',
				dataIndex: 'address'
			},
			{
				title: '早起时间',
				dataIndex: 'time'
			}
		]
		return (
			<div>
				<Card>
					<BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
				</Card>
				<Card style={{ marginTop: 10 }} className="operate-wrap">
					<Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>
						创建员工
					</Button>
					<Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>
						编辑员工
					</Button>
					<Button type="primary" icon="book" onClick={() => this.handleOperate('detail')}>
						员工详情
					</Button>
					<Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')}>
						删除员工
					</Button>
				</Card>
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
				<Modal
					title={this.state.title}
					visible={this.state.isVisible}
					onOk={this.handleSubmit}
					onCancel={() => {
            this.userForm.props.resetFields()
						this.setState({
							isVisible: false
						})
					}}
					width={600}
				>
					<UserForm
						type={this.state.type}
						wrappedComponentRef={(inst) => {
							this.userForm = inst
						}}
					/>
				</Modal>
			</div>
		)
	}
}

class UserForm extends Component {
	render() {
		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 15 }
		}
		const { getFieldDecorator } = this.props.form
		return (
			<div>
				<Form layout="horizontal">
					<FormItem label="用户名" {...formItemLayout}>
						{getFieldDecorator('user_name')(<Input type="text" placeholder="请输入用户名" />)}
					</FormItem>
					<FormItem label="性别" {...formItemLayout}>
						{getFieldDecorator('sex', {
							initialValue: 1
						})(
							<RadioGroup>
								<Radio value={1}>男</Radio>
								<Radio value={2}>女</Radio>
							</RadioGroup>
						)}
					</FormItem>
					<FormItem label="状态" {...formItemLayout}>
						{getFieldDecorator('state', {
							initialValue: 1
						})(
							<Select>
								<Option value={1}>咸鱼一条</Option>
								<Option value={2}>风华浪子</Option>
								<Option value={3}>北大才子</Option>
								<Option value={4}>百度FE</Option>
								<Option value={5}>创业者</Option>
							</Select>
						)}
					</FormItem>
					<FormItem label="生日" {...formItemLayout}>
						{getFieldDecorator('birthday')(<DatePicker />)}
					</FormItem>
					<FormItem label="地址" {...formItemLayout}>
						{getFieldDecorator('address')(<TextArea rows={3} placeholder="请输入联系地址" />)}
					</FormItem>
				</Form>
			</div>
		)
	}
}

UserForm = Form.create({})(UserForm)

export default User
