import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage } from '../../actions/messagingActions';


class ConversationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: "",
            errors: {}
        }

    }

    componentWillReceiveProps(newProps){
        if(newProps.errors) {
            this.setState({errors: newProps.errors})
        }
    }



    

    render(){
        const { user } = this.props.auth;
        return(
            <div className="main">

            </div>
        )
    }

}
ConversationForm.propTypes = {
    addMessage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})



export default connect(mapStateToProps, { addMessage })(ConversationForm);