import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import PersistentDrawer from "./PersistentDrawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import Nav from "./Nav"

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    marginTop: theme.spacing.unit * 6,
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  withOpenDrawer: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
})

class PersistentDrawerLeft extends React.Component {
  state = {
    isDrawerOpen: false
  }

  toggleDrawer = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }

  render() {
    const { classes } = this.props
    const { isDrawerOpen } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Nav toggleDrawer={this.toggleDrawer} />
        <PersistentDrawer isDrawerOpen={isDrawerOpen} />

        <main
          className={classNames(classes.content, {
            [classes.withOpenDrawer]: isDrawerOpen
          })}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </p>
        </main>
      </div>
    )
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PersistentDrawerLeft)
