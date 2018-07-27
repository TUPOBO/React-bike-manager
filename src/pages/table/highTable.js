import React, { Component } from 'react'
import {Card, Table, Modal, Button, message} from 'antd'
import axios from './../../axios'
import Utils from '../../utils/utils'
import { width } from 'window-size';

class HighTable extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.params = {
      page: 1
    }
  }
  

  componentDidMount () {
    this.request()
  }
  

  request = () => {
    let _this = this
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: this.params.page
        },
        isShowLoading: false  
      }
    }).then((res) => {
      if (res.code === 0) {
        res.result.list.map((item, index) => {
          item.key = index
        })
        this.setState({
          dataSource: res.result.list,
          selectedRowKeys: [],
          selectedRows: null,
          pagination: Utils.pagination(res, (current) => {
            // todo
            _this.params.page = current
            this.request()
          })
        })
      }
    })
  }

  render () {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        width:60
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width:80
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 60,
        render (sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
        render (state) {
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
        width: 60,
        render (interest) {
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
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 120
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: 80
      }
    ]

    const columns2 = [
      {
        title: 'id',
        dataIndex: 'id',
        width:60,
        fixed: 'left'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width:80,
        fixed: 'left'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 60,
        render (sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
        render (state) {
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
        width: 60,
        render (interest) {
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
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 120,
        fixed: 'right'
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
        fixed: 'right'
      }
    ]
    return (
      <div>
        <Card
          title='头部固定'
        >
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{y:240}}
          />
        </Card>

        <Card
          title='左侧固定'
          style={{margin: '10px 0'}}
        >
          <Table
            bordered
            columns={columns2}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{x:1750}}
          />
        </Card>

      </div>
    )
  }
}

export default HighTable
