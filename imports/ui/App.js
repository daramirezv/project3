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
            botonRegistrar:false,
            verLlenos:true
        };
        this.toggleRegistrar = this.toggleRegistrar.bind(this);
        this.toggleVerLlenos = this.toggleVerLlenos.bind(this);
    }

    toggleRegistrar(){
        this.setState({
            botonRegistrar: !this.state.botonRegistrar
        });
    }

    toggleVerLlenos()
    {
        this.setState({
            verLlenos: !this.state.verLlenos
        });
    }

    renderCards() {
        let filteredViajes = this.props.viajes;

        if (this.state.verLlenos) {
            filteredViajes = filteredViajes.filter(viaje => viaje.cantidad>0);
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
            <div className="container">
               
                <header>
                    <h1>Carpooling</h1>
                </header>

                <AccountsUIWrapper />

                <br/>

                {this.props.currentUser ?
                 <label className="hide-completed">
                    <input
                        type="checkbox"
                        readOnly
                        checked={this.state.verLleno}
                        onClick={this.toggleVerLlenos}
                    />
                    Ver viajes llenos 
                </label> 
                : ''}
                
                <br/>

                {this.props.currentUser ?
                <button type="button" className="btn btn-primary" onClick={this.toggleRegistrar}>Registrar Viaje</button>
                : ''}
                
                {this.state.botonRegistrar ? <InsertarForm /> : ''}

                    {this.renderCards()}
            </div>
        );
    }
}

export default withTracker(() => {

    Meteor.subscribe('viajes');

    return {
        viajes: Viajes.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
})(App);