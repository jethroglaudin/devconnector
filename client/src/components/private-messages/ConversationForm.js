import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMessage } from "../../actions/messagingActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class ConversationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recepient: "",
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;

    const newMessage = {
      user: user.id,
      recepient: this.state.recepient,
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addMessage(newMessage);
    this.setState({ text: "", recepient: "" });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        {/* <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
        </div> */}
       Recepient: <input type="text" name="recepient" value={this.state.recepient} onChange={this.onChange} />
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                  <TextAreaFieldGroup
                  placeholder="Enter Message"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                  />

              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
ConversationForm.propTypes = {
  addMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addMessage }
)(ConversationForm);
