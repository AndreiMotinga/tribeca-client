import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false
  }

  toggleDrawer = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { classes, toggleDrawer } = this.props

    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

const styles = theme => ({
  root: {
    display: "foo bar"
  }
})

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft)
