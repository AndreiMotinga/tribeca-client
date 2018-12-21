import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
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
import Tooltip from "@material-ui/core/Tooltip"
import DeleteIcon from "@material-ui/icons/Delete"
import FilterListIcon from "@material-ui/icons/FilterList"
import { lighten } from "@material-ui/core/styles/colorManipulator"

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
  }
})

class SimpleTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      records: []
    }
  }

  componentDidMount = () => {
    axios.get("/studios").then(data => {
      this.setState({ records: data.data })
    })
  }

  render() {
    const { records } = this.state
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
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
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
                <TableRow key={record.id}>
                  <TableCell padding="dense">{record.id}</TableCell>
                  <TableCell>{record.title}</TableCell>
                  <TableCell>{record.created_at}</TableCell>
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
