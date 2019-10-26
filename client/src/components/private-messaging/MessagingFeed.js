import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessagingItem from './MessagingItem';

class MessagingFeed extends Component{

    render(){
        const { replies, replyId } = this.props
        return replies.map(reply => (<MessagingItem key={reply._id} reply={reply} replyId={replyId} />))
    }
}
MessagingFeed.propTypes = {
    replies: PropTypes.array.isRequired,
    replyId: PropTypes.string.isRequired
}

export default MessagingFeed;