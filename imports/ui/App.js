import React, { Component } from 'react';
import { Viajes } from '../api/viajes.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import InsertarForm from './InsertarForm.js';
import CardViaje from './CardViaje';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            botonRegistrar: false,
            verLlenos: true
        };
        this.toggleRegistrar = this.toggleRegistrar.bind(this);
        this.toggleVerLlenos = this.toggleVerLlenos.bind(this);
    }

    toggleRegistrar() {
        this.setState({
            botonRegistrar: !this.state.botonRegistrar
        });
    }

    toggleVerLlenos() {
        this.setState({
            verLlenos: !this.state.verLlenos
        });
    }

    renderCards() {
        let filteredViajes = this.props.viajes;

        if (this.state.verLlenos) {
            filteredViajes = filteredViajes.filter(viaje => viaje.cantidad > 0);
        }

        return filteredViajes.map((viaje) => {
            return (
                <CardViaje
                    key={viaje._id}
                    viaje={viaje}
                    idOwner={this.props.currentUser && this.props.currentUser._id}
                />
            );
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <h3 className="navbar-brand">Carpooling</h3>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <AccountsUIWrapper />
                        </li>
                    </ul>

                    {this.props.currentUser ? 
                    <a className="nav-link btn btn-primary" href="#">Volver Arriba</a>
                    : ''}

                    {this.props.currentUser ?
                        <label className="hide-completed check">
                            <input
                                type="checkbox"
                                readOnly
                                checked={this.state.verLleno}
                                onClick={this.toggleVerLlenos}
                            /> <h5 className="llenos"> Ver viajes llenos</h5>
                        </label>
                        : ''}
                </nav>
                <div className="container">
                    {this.props.currentUser ?
                        <button type="button" className="btn btn-primary registrar btn-lg" onClick={this.toggleRegistrar}>Registrar Viaje</button>
                        : ''}
                    <br/>

                    {this.state.botonRegistrar ? <InsertarForm ocultar={this.toggleRegistrar} /> : ''}

                    <div className="row">
                        {this.renderCards()}
                    </div>
                </div>
            </div>);
    }
}

export default withTracker(() => {

    Meteor.subscribe('viajes');

    return {
        viajes: Viajes.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
})(App);