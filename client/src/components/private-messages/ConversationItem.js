import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { deleteConversation } from "../../actions/messagingActions";

class ConversationItem extends Component {
  onDeleteClick(id) {
    this.props.deleteConversation(id);
  }
  render() {
    const { convos, showActions, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={convos.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{convos.name}</p>
          </div>
       
        <div className="col-md-10">
          <p className="lead">{convos.text}</p>
          {  showActions ? (<span>
              <Link to={`/messaging/${convos._id}`} className="btn btn-info mr-1">Enter Conversation</Link>
              {convos.user === auth.user.id ? (
                  <button
                  onClick={this.onDeleteClick.bind(this, convos._id)}
                  type="buddon"
                  className="btn btn-danger mr-1">Leave Conversation
                  </button>
              ): null}
              </span>): null  }
        </div>
        </div>
      </div>
    );
  }
}
ConversationItem.defaultProps = {
  showActions: true
};
ConversationItem.propTypes = {
  deleteConversation: PropTypes.func.isRequired,
  convos: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteConversation }
)(ConversationItem);
