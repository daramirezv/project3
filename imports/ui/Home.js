import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
//import {Route} from 'react-router-dom';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectSignUp: false,
      redirectSignIn: false,
      redirectNewCompany: false
    };
  }

  setRedirectSignUp()
  {
    this.setState({
      redirectSignUp: !this.state.redirectSignUp
    });
  }

  companyForm() {

    if (this.state.redirectNewCompany) {
      return <Redirect to={{
        pathname: '/newcompanieform'       
      }} />;
    } 
    
  }

  setRedirectNewCompany()
  {
    this.setState({
      redirectNewCompany: !this.state.redirectNewCompany
    });
  }

  userForm() {

    if (this.state.redirectSignUp) {
      return <Redirect to={{
        pathname: '/newuserform'       
      }} />;
    } 
    
  }

  setRedirectSignIn() {
    this.setState({
      redirectSignIn: !this.state.redirectSignIn
    });
   
  }

  signIn() {
    if (this.state.redirectSignIn) {
      return <Redirect to={{
        pathname: '/signin'       
      }} />;
    } 
  }

  render() {

    return (
      <div className="header-2">
        <div className="page-header h-80">
          <div className="filter"></div>
          <div className="content-center">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-left">
                  <h1 className="title">Corporative carpooling</h1>
                  <div className="p6">
                    <p align="justify">With your carpooling app you can meet new people of your company, 
                    share car journeys and reduce costs while helping the environment.                                                                  
                    </p>
                  </div>                                                                                                       
                </div>
                <div className="row">
                  <div className="col-md-5">     
                    {this.companyForm()}                           
                    <button onClick={this.setRedirectNewCompany.bind(this)} className="btn btn-danger btn-lg">
                        New company <i className="fas fa-building"></i>
                    </button>                             
                  </div>
                  <div className="col-md-4"> 
                    {this.userForm()}                              
                    <button onClick={this.setRedirectSignUp.bind(this)} className="btn btn-danger btn-lg">
                        New user <i className="fas fa-user-plus"></i>
                    </button>                              
                  </div>
                  <div className="col-md-3"> 
                    {this.signIn()}                          
                    <button onClick={this.setRedirectSignIn.bind(this)} className="btn btn-danger btn-lg">
                        Sign in! <i className="fas fa-sign-in-alt"></i>
                    </button>                                
                  </div>
                </div>
              </div>              
            </div>
          </div>
        </div>
        <div className="section-gray">
          <div className="container">
            <div className="row">
              <div className="subtitle content-center col-lg-12 col-md-12 text-center">
                <h2>What is this about?</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="fa fa-user-plus"/>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Register companies and users</h4>
                    <p className="description">Sign up now and start enjoying!</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="fas fa-car"></i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Share journeys</h4>
                    <p className="description">Create carpooling entry and wait for your co-workers to join.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="fas fa-hand-pointer"></i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Join journeys</h4>
                    <p> Join other`s journey with a single click! </p>
                  </div>
                </div>
              </div>                           
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;