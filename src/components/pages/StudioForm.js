import React from "react"
import axios from "axios"

import { withStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"

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

  handleChange = name => event => {
    console.log(name, event)
    const studio = this.state.studio
    studio[name] = event.target.value
    this.setState({ studio })
  }

  render() {
    const studio = this.state.studio
    const { classes } = this.props

    if (!studio) {
      return null
    }

    return (
      <div>
        <button onClick={this.submit}>Submit</button>
        <br />
        <br />

        <form onSubmit={this.submit}>
          <Grid container spacing={16}>
            <Grid item xs={12} lg={9}>
              <Paper className={classes.paper}>
                <TextField
                  id="title"
                  label="Title"
                  fullWidth
                  value={studio.title}
                  onChange={this.handleChange("title")}
                  margin="normal"
                />
                <TextField
                  id="slug"
                  label="Slug"
                  fullWidth
                  value={studio.slug}
                  onChange={this.handleChange("slug")}
                  margin="normal"
                />
                <TextField
                  id="sort_order"
                  label="Sort Order"
                  value={studio.sort_order}
                  onChange={this.handleChange("sort_order")}
                  type="number"
                  margin="normal"
                />{" "}
                <TextField
                  id="category"
                  select
                  label="Category"
                  value={studio.category}
                  onChange={this.handleChange("category")}
                  margin="normal"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Feature Documentary">
                    Feature Documentary
                  </MenuItem>
                  <MenuItem value="Short Documentary">
                    Short Documentary
                  </MenuItem>
                  <MenuItem value="Feature Documentary">
                    Feature Documentary
                  </MenuItem>
                  <MenuItem value="Original Series">Original Series</MenuItem>
                  <MenuItem value="Short Documentary and VR Film">
                    Short Documentary and VR Film
                  </MenuItem>
                  <MenuItem value="Short Film Series">
                    Short Film Series
                  </MenuItem>
                  <MenuItem value="Short Film Competition">
                    Short Film Competition
                  </MenuItem>
                </TextField>
                <div>{studio.summary}</div>
                <div>{studio.body}</div>
              </Paper>
            </Grid>

            <Grid item xs={12} lg={3}>
              <Paper className={classes.paper}>
                <img src={studio.image.small.url} alt="" />
              </Paper>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

const styles = theme => ({
  // container: {
  //   display: "flex",
  //   flexWrap: "wrap"
  // }
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   width: 200
  // },
  // dense: {
  //   marginTop: 19
  // },
  // menu: {
  //   width: 200
  // }
  paper: {
    padding: theme.spacing.unit * 2
    // textAlign: "center",
    // color: theme.palette.text.secondary
  }
})

export default withStyles(styles)(StudioForm)
