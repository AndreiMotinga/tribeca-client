import React, { Component } from "react"
import AppBar from "./AppBar"
import Drawer from "./Drawer"

class App extends Component {
  state = {
    isOpen: true
  }

  toggleDrawer = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { isOpen } = this.state
    return (
      <div className="App">
        <AppBar toggleDrawer={this.toggleDrawer} />
        <Drawer isOpen={isOpen} toggleDrawer={this.toggleDrawer} />
      </div>
    )
  }
}

export default App
