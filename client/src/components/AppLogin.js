import React, { Component } from "react";
import { Button, Form, Row, Col, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

class AppLogin extends Component {
  state = {
    email: "",
    password: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    this.props.login(user);
  };

  render() {
    return (
      <div className="Registration">
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col>
              <Input
                type="email"
                name="email"
                // id="email"
                placeholder="email"
                onChange={this.onChange}
              />
            </Col>
            <Col>
              <Input
                type="password"
                name="password"
                // id="password"
                placeholder="password"
                onChange={this.onChange}
              />
            </Col>
            <Col>
              <Button color="primary">Login</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(AppLogin);
