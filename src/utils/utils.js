import React from 'react'
import { Select } from 'antd'
const Option = Select.Option
export default {
  formateDate (time) {
    if (!time) return ''
    let date = new Date(time)
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  },

  pagination (data, callback) {
    let page = {
      onChange: (current) => {
        callback(current)
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total,
      showTotal: () => {
        return `共${data.result.total}条`
      },
      showQuickJumper: true
    }
    return page
  },

  getOptionList (data) {
    if (!data) {
      return []
    }

    let options = [] // <Option value='0' key='all_key' >全部</Option> ]
    data.map((item) => (
      options.push(<Option value={item.id} key={item.id} >{item.name}</Option>)
    ))
    return options
  },

  updateSelectedItem (selectedRowKeys, selectedItem, selectedIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys, selectedItem, selectedIds
      })
    }
    this.setState({
      selectedRowKeys, selectedItem
    })
  }
}
