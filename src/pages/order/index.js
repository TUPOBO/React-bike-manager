import React, { Component } from 'react'
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import './../../style/comment.less'

const FormItem = Form.Item
const Option = Select.Option

class Order extends Component {
	constructor(props) {
		super(props)
		this.state = {
			orderConfirmVisible: false,
			orderInfo: {}
		}
		this.params = {
			page: 1
		}
	}

	componentWillMount() {
		this.requestList()
	}

	requestList = () => {
		let _this = this
		axios
			.ajax({
				url: '/order/list',
				data: {
					params: {
						page: this.params.page
					}
				}
			})
			.then((res) => {
				let list = res.result.item_list.map((item, index) => {
					item.key = index
					return item
				})
				this.setState({
					list,
					pagination: Utils.pagination(res, (current) => {
						_this.params.page = current
						_this.requestList()
					})
				})
			})
	}

	// 订单确认
	handleConfirm = () => {
		let item = this.state.selectedItem
		if (!item) {
			Modal.info({
				title: '提示',
				content: '请选择一条订单删除'
			})
			return
		}
		axios
			.ajax({
				url: '/order/ebike_info',
				data: {
					params: {
						orderId: item.id
					}
				}
			})
			.then((res) => {
				if (res.code === 0) {
					this.setState({
						orderInfo: res.result,
						orderConfirmVisible: true
					})
				}
			})
	}

	// 结束订单
	handleFinishOrder = () => {
		let item = this.state.selectedItem
		axios
			.ajax({
				url: '/order/finish_order',
				data: {
					params: {
						orderId: item.id
					}
				}
			})
			.then((res) => {
				if (res.code === 0) {
					message.success(`${res.msg}`)
					this.setState({
						orderConfirmVisible: false
					})
					this.requestList()
				}
			})
	}
	//存储点击行信息
	onRowClick = (record, index) => {
		let selectKey = [ index ]

		this.setState({
			selectedRowKeys: selectKey,
			selectedItem: record
		})
	}

	//打开订单详情页
	openOrderDetails = () => {
		let item = this.state.selectedItem
		if (!item) {
			Modal.info({
				title: '提示',
				content: '请先选择一条订单'
			})
			return
		}
		window.open(`/#/common/order/detail/${item.id}`, '_blank')
	}

	render() {
		const columns = [
			{
				title: '订单编号',
				dataIndex: 'order_sn'
			},
			{
				title: '车辆编号',
				dataIndex: 'bike_sn'
			},
			{
				title: '用户名',
				dataIndex: 'user_name'
			},
			{
				title: '手机号',
				dataIndex: 'mobile'
			},
			{
				title: '里程',
				dataIndex: 'distance',
				render(distance) {
					return distance / 1000 + 'KM'
				}
			},
			{
				title: '行驶时长',
				dataIndex: 'total_time'
			},
			{
				title: '状态',
				dataIndex: 'status'
			},
			{
				title: '开始时间',
				dataIndex: 'start_time'
			},
			{
				title: '结束时间',
				dataIndex: 'end_time'
			},
			{
				title: '订单金额',
				dataIndex: 'total_fee'
			},
			{
				title: '实付金额',
				dataIndex: 'user_pay'
			}
		]
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 }
		}
		const selectedRowKeys = this.state.selectedRowKeys
		const rowSelection = {
			type: 'radio',
			selectedRowKeys
		}
		return (
			<div>
				<Card>
					<FilterForm />
				</Card>
				<Card style={{ marginTop: 10 }}>
					<Button type="primary" onClick={this.openOrderDetails}> 订单详情 </Button>
					<Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleConfirm}>
						结束订单
					</Button>
				</Card>
				<div className="content-wrap">
					<Table
						bordered
						columns={columns}
						dataSource={this.state.list}
						pagination={this.state.pagination}
						rowSelection={rowSelection}
						onRow={(record, index) => {
							return {
								onClick: () => {
									this.onRowClick(record, index)
								}
							}
						}}
					/>
				</div>
				<Modal
					title="结束订单"
					visible={this.state.orderConfirmVisible}
					onCancel={() => {
						this.setState({
							orderConfirmVisible: false
						})
					}}
					onOk={this.handleFinishOrder}
					width={400}
				>
					<Form layout="horizontal">
						<FormItem {...formItemLayout} label="车辆编号">
							{this.state.orderInfo.bike_sn}
						</FormItem>
						<FormItem {...formItemLayout} label="剩余电量">
							{this.state.orderInfo.battery + '%'}
						</FormItem>
						<FormItem {...formItemLayout} label="行程开始时间">
							{this.state.orderInfo.start_time}
						</FormItem>
						<FormItem {...formItemLayout} label="当前位置">
							{this.state.orderInfo.location}
						</FormItem>
					</Form>
				</Modal>
			</div>
		)
	}
}

class FilterForm extends Component {
	render() {
		const { getFieldDecorator } = this.props.form

		return (
			<Form layout="inline">
				<FormItem label="城市">
					{getFieldDecorator('city_id')(
						<Select
							style={{
								width: 100
							}}
							placeholder="全部"
						>
							<Option value=""> 全部 </Option>
							<Option value="1"> 北京市 </Option>
							<Option value="2"> 天津市 </Option>
							<Option value="3"> 深圳市 </Option>
						</Select>
					)}
				</FormItem>

				<FormItem label="订单时间">
					{getFieldDecorator('start_time')(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
					{getFieldDecorator('end_time')(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
				</FormItem>

				<FormItem>
					{getFieldDecorator('end_time')(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
				</FormItem>
				<FormItem label="订单状态">
					{getFieldDecorator('op_mode')(
						<Select
							placeholder="全部"
							style={{
								width: 80
							}}
						>
							<Option value=""> 全部 </Option>
							<Option value="1"> 进行中 </Option>
							<Option value="2"> 结束行程 </Option>
						</Select>
					)}
				</FormItem>

				<FormItem>
					<Button
						type="primary"
						style={{
							margin: '0 20px'
						}}
					>
						查询
					</Button>
					<Button> 重置 </Button>
				</FormItem>
			</Form>
		)
	}
}

export default Order
FilterForm = Form.create({})(FilterForm)
