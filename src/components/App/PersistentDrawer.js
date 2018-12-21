import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { DRAWER_WIDTH } from "config"

import Collapse from "@material-ui/core/Collapse"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

import { Link } from "@reach/router"

class PersistentDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inbox: false,
      studios: false
    }
  }

  toggle = item => () => {
    this.setState({ [item]: !this.state[item] })
  }

  render() {
    const { classes, isDrawerOpen } = this.props
    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <List>
          <ListItem button onClick={this.toggle("inbox")}>
            <ListItemText primary="Inbox" />
            {this.state.inbox ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.inbox} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Starred" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Films" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Articles" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={this.toggle("studios")}>
            <ListItemText primary="Studios" />
            {this.state.studios ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.studios} timeout="auto" unmountOnExit>
            <List>
              <ListItem
                button
                component={Link}
                to="/studios"
                className={classes.nested}
              >
                <ListItemText primary="Studios" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/awards"
                className={classes.nested}
              >
                <ListItemText primary="Awards" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/partners"
                className={classes.nested}
              >
                <ListItemText primary="Partners" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    )
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired
}

const styles = theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    zIndex: theme.zIndex.appBar - 100,
    top: 64,
    paddingBottom: 64
  },

  nested: {
    paddingLeft: theme.spacing.unit * 3
  }
})

export default withStyles(styles)(PersistentDrawer)
