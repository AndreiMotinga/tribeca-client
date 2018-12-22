import React from "react"

class StudioForm extends React.Component {
  submit = e => {
    e.preventDefault()
    console.log("submitting form")
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <h1>form here</h1>
        <button onClick={this.submit}>Submit</button>
      </form>
    )
  }
}

export default StudioForm
