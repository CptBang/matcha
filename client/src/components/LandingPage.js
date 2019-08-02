import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { connect } from 'react-redux';

import AppRegistration from "./AppRegistration";

class LandingPage extends Component {

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        <h1>Meet your bald soulmate...</h1>
        <Container className="CenterArea">
          <Row>
            <Col>{/* <AppDescription /> */}</Col>
            <Col>
              <AppRegistration />
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, null)(LandingPage);
