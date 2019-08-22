import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import MessengerListItem from "./MessengerListItem";
import { updateMessages } from "../actions/updateActions";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
  paper: {}
};

export class MessengerSidebar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    conversations: PropTypes.object
  };

  render() {
    return (
      <div>
        {this.props.auth.user.conversations.map(conversation => (
          // <Button onClick={this.geoLocator} className={classes.button}>Click Me</Button>
          <MessengerListItem key={conversation} data={conversation} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  conversations: state.auth.conversations
});

export default connect(
  mapStateToProps,
  { updateMessages }
)(withStyles(styles)(MessengerSidebar));
