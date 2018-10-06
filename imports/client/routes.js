import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router'
import { render } from 'react-dom';
import App from '../ui/App.js'
import MensajeApp from '../ui/MensajeApp.js'

Meteor.startup(() => {
    render(
        <BrowserRouter>
            <Switch>
                <Route path='/mensajes' component={MensajeApp} />
                <Route path='/' component={App} />
            </Switch>
        </BrowserRouter>,
        document.getElementById('render-target')
    );
});