import React from "react"
import PropTypes from "prop-types"
import { Router } from "@reach/router"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import PersistentDrawer from "./PersistentDrawer"
import Nav from "./Nav"
import { DRAWER_WIDTH } from "config"
import Home from "components/pages/Home"
import Studios from "components/pages/Studios"

class PersistentDrawerLeft extends React.Component {
  state = {
    isDrawerOpen: true
  }

  toggleDrawer = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }

  render() {
    const { classes } = this.props
    const { isDrawerOpen } = this.state

    return (
      <div className={classes.root}>
        <Nav toggleDrawer={this.toggleDrawer} />
        <PersistentDrawer isDrawerOpen={isDrawerOpen} />

        <main
          className={classNames(classes.content, {
            [classes.contentWithOpenDrawer]: isDrawerOpen
          })}
        >
          <Router>
            <Home path="/" />
            <Studios path="/studios" />
          </Router>
        </main>
      </div>
    )
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    marginTop: theme.spacing.unit * 6,
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -DRAWER_WIDTH
  },
  contentWithOpenDrawer: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
})

export default withStyles(styles)(PersistentDrawerLeft)
