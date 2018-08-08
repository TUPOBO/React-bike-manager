import React, { Component } from 'react'
import { Card, Form } from 'antd'
import BaseForm from './../../components/BaseForm'
import axios from './../../axios'

const BMap = window.BMap
class BikeMap extends Component {
	constructor(props) {
		super(props)
		this.state = {}
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

	componentDidMount() {
		this.requestList()
	}

	handleFilterSubmit = (params) => {
		this.params = params
		this.requestList()
	}

	requestList = () => {
		axios
			.ajax({
				url: '/map/bike_list',
				data: {
					params: this.params
				}
			})
			.then((res) => {
				if (res.code === 0) {
					this.setState({
						totalCount: res.result.total_count
					})
					this.renderMap(res)
				}
			})
	}

	renderMap = (res) => {
		// 百度地图初始化
		let list = res.result.route_list
		this.map = new BMap.Map('container')
		let startGps = list[0].split(',')
		let endGps = list[list.length - 1].split(',')
		let startPoint = new BMap.Point(startGps[0], startGps[1])
		let endPoint = new BMap.Point(endGps[0], endGps[1])
		this.map.centerAndZoom(endPoint, 11)

		// 绘制起点坐标
		// let startPointIcon = new BMap.Icon(
		// 	'/assets/start_point.png',
		// 	new BMap.Size((36, 42), {
		// 		imageSize: new BMap.Size(36, 42),
		// 		anchor: new BMap.Size(18, 42)
		// 	})
		// )
		// let bikeStartMarker = new BMap.Marker(startPoint, { icon: startPointIcon })
		// this.map.addOverlay(bikeStartMarker)

		// // 绘制终点坐标
		// let endPointIcon = new BMap.Icon(
		// 	'/assets/end_point.png',
		// 	new BMap.Size((36, 42), {
		// 		anchor: new BMap.Size(10, 42),
		// 		imageSize: new BMap.Size(36, 42)
		// 	})
		// )
		// let bikeEndMarker = new BMap.Marker(startPoint, { icon: endPointIcon })
		// this.map.addOverlay(bikeEndMarker)

		//绘制车辆行驶路线
		let routeList = []
		list.forEach((item) => {
			let point = item.split(',')
			routeList.push(new BMap.Point(point[0], point[1]))
		})
		let polyLine = new BMap.Polyline(routeList, {
			strokeColor: '#ef4136',
			strokeWeight: 3,
			strokeOpacity: 1
		})
		this.map.addOverlay(polyLine)

		// 绘制服务区
		let servicePoint = []
		let serviceList = res.result.service_list
		serviceList.forEach((item) => {
			servicePoint.push(new BMap.Point(item.lon, item.lat))
		})
		let servicePolyLine = new BMap.Polyline(servicePoint, {
			strokeColor: '#ef4136',
			strokeWeight: 3,
			strokeOpacity: 1
		})
		this.map.addOverlay(servicePolyLine)

		// 绘制自行车图标
		let bikeList = res.result.bike_list
		let bikeIcon = new BMap.Icon(
			'/assets/bike.jpg',
			  new BMap.Size((36, 42), {
				anchor: new BMap.Size(36, 42),
				imageSize: new BMap.Size(36, 42)
			})
		)
		bikeList.forEach((item) => {
			let point = item.split(',')
			let markerPoint = new BMap.Point(point[0], point[1])
			let bikeMarker = new BMap.Marker(markerPoint)
			this.map.addOverlay(bikeMarker)
		})
	}

	render() {
		return (
			<div>
				<Card>
					<BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
				</Card>
				<Card style={{ marginTop: 10 }}>
					<div>共{this.state.totalCount}辆单车</div>
					<div id="container" style={{ height: 600 }} />
				</Card>
			</div>
		)
	}
}

export default BikeMap
