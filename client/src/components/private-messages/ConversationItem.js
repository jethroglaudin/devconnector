import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteConversation } from "../../actions/messagingActions";

class ConversationItem extends Component {
    onDeleteClick(id){
        this.props.deleteConversation(id);
    }
    render(){
        return(
            <div className="">

            </div>
        )
    }

}
ConversationItem.propTypes = {
    deleteConversation: PropTypes.func.isRequired,
    messaging: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps, 
    { deleteConversation }
    )(ConversationItem);