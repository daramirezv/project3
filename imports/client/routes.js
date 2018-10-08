import React from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { render } from 'react-dom';
import App from '../ui/App.js';
import Home from '../ui/Home.js';
import MensajeApp from '../ui/MensajeApp.js';
import NewUserForm from '../ui/NewUserForm.js';
import SignIn from '../ui/SignIn.js';
import NewCompanieForm from '../ui/NewCompanieForm.js';

//Se crean dos rutas, la principal y la de mensajes. En cada uno se renderiza su componente respectivo
Meteor.startup(() => {
  render(
    <BrowserRouter>
      <Switch>
        <Route path='/mensajes' component={MensajeApp} />
        <Route path='/app' component={App} />        
        <Route path='/newuserform' component={NewUserForm} />        
        <Route path='/signin' component={SignIn} />
        <Route path='/newcompanieform' component={NewCompanieForm} />  
        <Route path='/' component={Home} />        
      </Switch>
    </BrowserRouter>,
    document.getElementById('render-target')
  );
});