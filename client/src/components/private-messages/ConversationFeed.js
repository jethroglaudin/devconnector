import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommmentItem from './ConversationItem';

class ConversationFeed extends Component {
    render(){
        const { conversations } = this.props;
        return conversations.map(convos => <CommmentItem key={convos._id} convos={convos} />)
    }
}
ConversationFeed.propTypes = {
    conversations: PropTypes.array.isRequired
}

export default ConversationFeed;