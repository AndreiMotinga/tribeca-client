import React from "react"
import PropTypes from "prop-types"
import { Link } from "@reach/router"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

const Nav = ({ classes, toggleDrawer }) => {
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
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          component={Link}
          to="/"
          style={{ textDecoration: "none" }}
        >
          Tribeca Admin
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const styles = theme => ({
  root: {
    display: "foo bar"
  }
})

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired
}

export default withStyles(styles)(Nav)
