import React, { Component } from 'react'
import {Card, Button} from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm'
import ETable from './../../components/ETable'
class User extends Component {
  constructor (props) {
    super(props)
    this.state = {}
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


  componentWillMount () {
    this.requestList()
  }


  handleFilter = (params) => {
    this.params = params
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/user/list', this.params)
  }

  render () {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
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
            '5': '创业者',
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
            '8': '麦霸',
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
        <Card style={{ marginTop: 10 }}>
					<Button type="primary" onClick={this.openOrderDetails}>
						订单详情
					</Button>
					<Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleConfirm}>
						结束订单
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
      </div>
    )
  }
}
export default User
