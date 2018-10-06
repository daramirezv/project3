import React, { Component } from 'react';
import { Mensajes } from '../api/mensajes.js';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import CardMensaje from './CardMensaje.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

class MensajeApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            idMensajes: null
        };
        this.setRedirect = this.setRedirect.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setRedirect() {
        this.setState({
            redirect: true
        });
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/',
                state: { idMensajes: this.props.location.state.idMensajes }
            }} />
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('mensajes.insert', text, this.props.location.state.idMensajes);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderMensajes() {

        let filteredMensajes = this.props.mensajes;

        filteredMensajes = filteredMensajes.filter(mensaje => mensaje.idChat == this.props.location.state.idMensajes);
        return filteredMensajes.map((mensaje) => {
            return (
                <CardMensaje
                    key={mensaje._id}
                    mensaje={mensaje}
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
                </nav>

                <div className = "container">
                    {this.renderRedirect()}
                    <button className = "btn btn-primary inicio btn-lg" onClick={this.setRedirect}>Devolverse</button>
                </div>

                <form className="new-mensaje container" onSubmit={this.handleSubmit} >
                    <input
                        type="text"
                        size = "60"
                        ref="textInput"
                        placeholder="Ingresa nuevos mensajes"
                    />
                </form>

                <ul>
                    {this.renderMensajes()}
                </ul>

            </div>
        )
    }
}
export default withTracker(() => {

    Meteor.subscribe('mensajes');

    return {
        mensajes: Mensajes.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(MensajeApp);