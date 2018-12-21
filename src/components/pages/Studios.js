import React from "react"
import PropTypes from "prop-types"
import { Link } from "@reach/router"
import axios from "axios"
import { debounce } from "debounce"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import FilterListIcon from "@material-ui/icons/FilterList"
import { lighten } from "@material-ui/core/styles/colorManipulator"
import TextField from "@material-ui/core/TextField"
import Moment from "react-moment"

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },

  title: {
    flex: "0 0 auto"
  },

  spacer: {
    flex: "1 1 100%"
  },

  actions: {
    color: theme.palette.text.secondary
  },

  search: {
    width: 300
  }
})

class SimpleTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
      records: []
    }
  }

  componentDidMount = () => {
    this.fetch()
  }

  filter = e => {
    this.setState({ search: e.target.value }, debounce(this.fetch, 300))
  }

  fetch = () => {
    const search = this.state.search
    axios.get("/studios", { params: { search } }).then(res => {
      this.setState({ records: res.data.data })
    })
  }

  render() {
    const { records, search } = this.state
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <Toolbar>
          <div className={classes.title}>
            <Typography variant="h6" id="tableTitle">
              Studios
            </Typography>
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            <TextField
              margin="none"
              label="Search"
              type="search"
              value={search}
              onChange={this.filter}
              className={classes.search}
            />
          </div>
        </Toolbar>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell padding="dense">Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map(record => {
              return (
                <TableRow hover key={record.id}>
                  <TableCell padding="dense">{record.id}</TableCell>
                  <TableCell>
                    <Link to={`/studios/${record.id}/edit`}>
                      <Typography>{record.title}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Moment format="lll">{record.created_at}</Moment>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleTable)
