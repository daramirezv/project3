import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {Redirect} from 'react-router-dom';

export default class NewCompanieForm extends Component {


  constructor(props) {
    super(props);

    this.state = {
      error: '',
      redirectHome: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){

    event.preventDefault();

    let newCompanie = {
      name: this.name.value,
      city: this.city.value,
      address: this.address.value,
      numberOfEmployees: parseInt(this.employees.value,10)
    };

    console.log('Empresa', newCompanie);

    Meteor.call('companies.insert', newCompanie);

    this.setState({
      error:'',
      redirectHome: !this.state.redirectHome
    });
   

  }


  renderError( )
  {
    if(this.state.error /*así es suficiente*/)
    {
      return(
        <div className="alert">      
          {this.state.error}
        </div>
      );   
    }
  }

  home( )
  {
    if (this.state.redirectHome) {
      return <Redirect to={{
        pathname: '/'       
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
                        <label>Name</label>
                        <input name="name" ref={(name) => this.name=name} className="form-control" required="required" type="text"/>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>City</label>
                        <input name="city" ref={(city) => this.city=city} className="form-control" required="required" type="text"/>
                      </div>
                    </div>               
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Number Of Employees</label>
                      <input name="employees" ref={(employees) => this.employees=employees} className="form-control" required="required" type="number"/>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Address </label>
                      <input name="address" ref={(address) => this.address=address} className="form-control" required="required" type="text"/>
                    </div>
                  </div>                  
                  {this.home()}                  
                  <button type="submit" className="btn btn-submit">Sign Up!</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

