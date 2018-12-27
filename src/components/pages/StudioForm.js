import React from "react"
import axios from "axios"

class StudioForm extends React.Component {
  state = {
    studio: null
  }

  componentDidMount = () => {
    axios.get(`/studios/${this.props.id}`).then(res => {
      this.setState({
        studio: res.data
      })
    })
  }

  submit = e => {
    e.preventDefault()
    console.log("submitting form")
  }

  render() {
    const studio = this.state.studio

    if (!studio) {
      return null
    }

    return (
      <form onSubmit={this.submit}>
        <h1>{studio.title}</h1>
        <button onClick={this.submit}>Submit</button>
      </form>
    )
  }
}

export default StudioForm
