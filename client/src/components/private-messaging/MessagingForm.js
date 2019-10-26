import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addReply } from "../../actions/messagingActions"

class MessagingForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            text: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({errors: newProps.errors})
        }
    }
    onSubmit(e){
        e.preventDefault();
        const { user } = this.props.auth;
        const { replyId } = this.props;

        const newReply = {
            user: user.id,
            text: this.state.text,
            name: user.name,
            avatar: user.avatar,
        }

        this.props.addReply(replyId, newReply);
        this.setState({text: ''});
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
        const { errors } = this.state;
        return(
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Send Message
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup 
                    placeholder="Reply to post"
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
          </div>
        );
    }
}
MessagingForm.propTypes = {
    addReply: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    replyId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors    
})

export default connect(mapStateToProps, { addReply })(MessagingForm);