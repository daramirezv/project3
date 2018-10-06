import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router'
import { render } from 'react-dom';
import App from '../ui/App.js'
import MensajeApp from '../ui/MensajeApp.js'

//Se crean dos rutas, la principal y la de mensajes. En cada uno se renderiza su componente respectivo
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