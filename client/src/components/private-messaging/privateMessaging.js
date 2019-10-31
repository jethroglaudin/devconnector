import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConversationItem from "../private-messages/ConversationItem";
import MessagingItem from "./MessagingItem"
import MessagingFeed from "./MessagingFeed";
import MessagingForm from "./MessagingForm";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import { getMessage } from "../../actions/messagingActions";

class PrivateMessaging extends Component {
  componentDidMount() {
    this.props.getMessage(this.props.match.params.id);
  }

  render() {
    const { replies, loading } = this.props.messaging;
    let replyContent;

    if (replies === null || loading || Object.keys(replies).length === 0) {
      replyContent = <Spinner />;
    } else {
      replyContent = (
        <div> 
          <MessagingItem reply={replies} showActions={false} />
          <MessagingFeed replyId={replies._id} replies={replies.replies} />
          <MessagingForm replyId={replies._id} />
        </div>
      );
    }
    return (
      <div className="replies">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/messages" className="btn btn-light mb-3">
                Back To Conversations
              </Link>
              {replyContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
PrivateMessaging.propTypes = {
  getMessage: PropTypes.func.isRequired,
  messaging: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messaging: state.messaging
});

export default connect(
  mapStateToProps,
  { getMessage }
)(PrivateMessaging);
