import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import ListSubheader from "@material-ui/core/ListSubheader"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import DraftsIcon from "@material-ui/icons/Drafts"
import SendIcon from "@material-ui/icons/Send"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import StarBorder from "@material-ui/icons/StarBorder"

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 3
  }
})

class NestedList extends React.Component {
  state = {
    inbox: false,
    studios: false
  }

  toggle = item => () => {
    this.setState({ [item]: !this.state[item] })
  }

  render() {
    const { classes } = this.props

    return (
      <List
        component="nav"
        subheader={
          <ListSubheader component="div">Nested List Items</ListSubheader>
        }
        className={classes.root}
      >
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText inset primary="Sent mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Drafts" />
        </ListItem>

        <ListItem button onClick={this.toggle("inbox")}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText inset primary="Inbox" />
          {this.state.inbox ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.inbox} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Starred" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={this.toggle("studios")}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText inset primary="Studios" />
          {this.state.studios ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.studios} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Studios" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Awards" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Partners" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    )
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NestedList)