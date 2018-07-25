import React, { Component } from 'react'
import {Card, Table, Modal} from 'antd'
import axios from './../../axios'
class BasicTable extends Component {
  state = {
    dataSource2: []
  }

  componentDidMount () {
    const dataSource = [
      {
        id: '0',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2001-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '1',
        userName: 'Tom',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2001-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '2',
        userName: 'Liny',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2001-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      }
    ]
    dataSource.map((item, index) => {
      item.key = index
    })
    this.setState({ dataSource })
    this.request()
  }


  request = () => {
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: 1
        },
        isShowLoading: false  
      }
    }).then((res) => {
      if (res.code === 0) {
        res.result.map((item, index) => {
          item.key = index
        })
        this.setState({
          dataSource2: res.result
        })
      }
    })
  }

  onRowClick = (record, index) => {
    let selectKey = [ index ]
    Modal.info({
      title: '信息',
      content: `用户名： ${record.userName} \n 用户爱好：${record.interest}`
    })
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
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
    const selectedRowKeys = this.state.selectedRowKeys
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    return (
      <div>
        <Card
          title='基础表格'
        >
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>

        <Card
          title='动态数据渲染表格-Mooc'
          style={{margin: '10px 0'}}
        >
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>

        <Card
          title='Mooc-单选'
          style={{margin: '10px 0'}}
        >
          <Table
            bordered
            rowSelection= {rowSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              }
            }}
          />
        </Card>
      </div>
    )
  }
}

export default BasicTable
