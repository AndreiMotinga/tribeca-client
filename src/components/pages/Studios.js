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
import TableSortLabel from "@material-ui/core/TableSortLabel"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Moment from "react-moment"
import TablePagination from "@material-ui/core/TablePagination"

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
      records: [],
      total: 0,
      page: 0,
      items: 10,
      order: "desc",
      orderBy: "created_at"
    }
  }

  componentDidMount = () => {
    this.fetch()
  }

  filter = e => {
    this.setState({ search: e.target.value }, debounce(this.fetch, 300))
  }

  handleChangePage = (event, page) => {
    this.setState({ page }, this.fetch)
  }

  handleChangeRowsPerPage = event => {
    if (!event) return
    this.setState({ items: event.target.value }, this.fetch)
  }

  fetch = () => {
    const { page, items, search, orderBy, order } = this.state
    axios
      .get("/studios", {
        params: {
          items,
          page: page + 1,
          search,
          order: `${orderBy} ${order}`
        }
      })
      .then(res => {
        this.setState({
          records: res.data.data,
          total: res.data.total
        })
      })
  }

  handleSort = orderBy => () => {
    let order = "desc"

    if (this.state.orderBy === orderBy && this.state.order === "desc") {
      order = "asc"
    }

    this.setState({ order, orderBy }, this.fetch)
  }

  render() {
    const { records, search, page, items, total, order, orderBy } = this.state
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
              <TableCell padding="dense">
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={order}
                  onClick={this.handleSort("id")}
                >
                  Id
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "title"}
                  direction={order}
                  onClick={this.handleSort("title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "created_at"}
                  direction={order}
                  onClick={this.handleSort("created_at")}
                >
                  Created
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map(record => {
              return (
                <TableRow hover key={record.id}>
                  <TableCell padding="dense">
                    <Link to={`/studios/${record.id}/edit`}>
                      <Typography>{record.id}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/studios/${record.id}/edit`}>
                      <Typography>{record.title}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/studios/${record.id}/edit`}>
                      <Typography>
                        <Moment format="lll">{record.created_at}</Moment>
                      </Typography>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={total}
          rowsPerPage={items}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleTable)
