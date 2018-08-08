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


  componentDidMount () {
    this.requestList()
  }


	handleFilterSubmit = (params) => {
    this.params = params
    this.requestList()
  }

  requestList = () => {
    axios.ajax({
      url: '/map/bike_list',
      data: {
        params: this.params
      }
    }).then ((res) => {
      if (res.code === 0) {
        this.setState({
          totalCount: res.result.total_count
        })
        this.renderMap(res)
      }
    })
  }

  renderMap = (res) => {
    let list = res.result.route_list
    this.map = new BMap.Map('container')
    let startGps = list[0].split(',')
    let endGps = list[list.length-1].split(',')
    let startPoint = new BMap.Point(startGps[0], startGps[1])
    let endPoint = new BMap.Point(endGps[0], endGps[1])

    this.map.centerAndZoom(endPoint, 11)
  }

	render() {
		return (
			<div>
				<Card>
					<BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
				</Card>
				<Card style={{marginTop: 10}}>
					<div>共{this.state.total_count}辆单车</div>
					<div id='container' style={{ height: 500 }} />
				</Card>
			</div>
		)
	}
}

export default BikeMap
