import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Companies } from '../api/companies.js';
import {Redirect} from 'react-router-dom';

class NewUserForm extends Component {


  constructor(props) {
    super(props);

    this.state = {
      error: '',
      redirectSignIn: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){

    event.preventDefault();

    let newUser = {
      username: this.username.value,
      password: this.pass.value,
      companie: this.cat.value,
      position: this.pos.value
    };
    Accounts.createUser(newUser, (e) => {
      console.log(Meteor.user());
      if (!Meteor.user() || e) {
        console.log('[ERROR] No se realiza el signup: ' + e.reason);
        this.setState({
          error: e.reason
        });
      }
      else{
        console.log('Exito. Se agrego el usuario: ', newUser);
        //this.props.history.push('/');
        this.setState({
          error:'',
          redirectSignIn: !this.state.redirectSignIn
        });
      }
    });   

  }

  renderListOfCompanies( )
  {
    return this.props.companies.map((comp)=>{
      return (       
        <option key={comp._id} value={comp.name}>{comp.name} from {comp.city}</option>
      );
    });
  }

  renderError( )
  {
    if(this.state.error !== '')
    {
      return(
        <div className="alert">      
          {this.state.error}
        </div>
      );   
    }
  }

  signIn( )
  {
    if (this.state.redirectSignIn) {
      return <Redirect to={{
        pathname: '/signin'       
      }} />;
    } 
  }

 
  render() { 
    return (      
      <div className="submit">       
        <div className="content">
          <div className="container">
            {this.renderError()}
            <div className="row">
              <div className="col-lg-12">
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Username</label>
                        <input name="username" ref={(username) => this.username=username} className="form-control" required="required" type="text"/>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input name="password" ref={(pass) => this.pass=pass} className="form-control" required="required" type="password"/>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label> Your company </label>
                        <select className="form-control js-search-category" name="category" ref={(cat) => this.cat=cat} required="required" data-placeholder="Choose Category" aria-hidden="true">
                          {this.renderListOfCompanies()} 
                        </select>
                      </div>
                    </div>

                  </div>
                  <div className="form-group">
                    <label>Position</label>
                    <input name="position" ref={(pos) => this.pos=pos} className="form-control" required="required" type="text"/>
                  </div>
                  {this.signIn()}                  
                  <button type="submit" className="btn btn-submit">Sign Up!</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

NewUserForm.propTypes = {
  companies: PropTypes.array.isRequired
};

export default withTracker(() => {

  Meteor.subscribe('companies');

  return {
    //se organiza del ultimo creado al mas viejo.
    companies: Companies.find({}).fetch()
  };
})(NewUserForm);
