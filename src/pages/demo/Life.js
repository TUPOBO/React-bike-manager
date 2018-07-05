import React from 'react'
import Child from './Child'
export default class Life extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  handleClick = () => {
    this.setState(
      {
        count: this.state.count + 1
      }
    )
  }

  bindHandleClick() {
    this.setState(
      {count: this.state.count + 1}
    )
  }
  render () {
    let style = {
      color: 'red'
    }
    return (
      <div style={style}>
        <p>React</p>
        <button onClick={this.handleClick} style={style}>click</button>
        <button onClick={this.bindHandleClick.bind(this)}>click</button>
        <p>{this.state.count}</p>
        <Child name={this.state.count} 
          click={this.handleClick}
        />
      </div>
    )
  }
}
