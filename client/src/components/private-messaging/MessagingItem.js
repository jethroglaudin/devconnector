import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteReply } from "../../actions/messagingActions";

class MessagingItem extends Component {
  onDeleteClick(replyId, messageId) {
    this.props.deleteReply(replyId, messageId);
  }

  render() {
    const { reply, replyId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              className="rounded-circle d-none d-md-block"
              src={reply.avatar}
              alt=""
            />
            <br />
            <p className="text-center">{reply.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{reply.text}</p>
            {reply.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, reply._id, replyId)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
                {" "}
                 Delete Reply
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
MessagingItem.propTypes = {
  deleteReply: PropTypes.func.isRequired,
  reply: PropTypes.object.isRequired,
  replyId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteReply }
)(MessagingItem);
