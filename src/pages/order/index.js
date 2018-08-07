import React, { Component } from 'react'
import { Card, Button, Table, Form, Modal, message } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import './../../style/comment.less'
import BaseForm from '../../components/BaseForm'
import ETable from './../../components/ETable'

const FormItem = Form.Item

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
		this.formList = [
			{
				type: 'SELECT',
				label: '城市',
				field: 'city',
				initialValue: '1',
				width: 80,
				placeholder: '全部',
				list: [
					{ id: '0', name: '全部' },
					{ id: '1', name: '北京' },
					{ id: '2', name: '天津' },
					{ id: '3', name: '上海' }
				]
			},
			{
				type: '时间查询'
			},
			{
				type: 'SELECT',
				label: '订单状态',
				field: 'order_status',

				initialValue: '1',
				width: 100,
				placeholder: '全部',
				list: [ { id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' } ]
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
		let _this = this
		axios.requestList(this, '/order/list', this.params, true)
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
					<BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
				</Card>
				<Card style={{ marginTop: 10 }}>
					<Button type="primary" onClick={this.openOrderDetails}>
						{' '}
						订单详情{' '}
					</Button>
					<Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleConfirm}>
						结束订单
					</Button>
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
						// rowSelection={'checkbox'}
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

export default Order
