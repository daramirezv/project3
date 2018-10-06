import { Redirect } from 'react-router'
import React, { Component } from 'react';
import { Viajes } from '../api/viajes.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import InsertarForm from './InsertarForm.js';
import CardViaje from './CardViaje';

// Es el componente que se renderiza en la pagina principal
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            botonRegistrar: false,
            verLlenos: true,
            redirect: false,
            idChat: null
        };

        this.toggleRegistrar = this.toggleRegistrar.bind(this);
        this.toggleVerLlenos = this.toggleVerLlenos.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.chatId = this.chatId.bind(this);
    }

    //se utiliza cuando se va a redireccionar a la pagina de mensajes.
    setRedirect() {
        this.setState({
            redirect: !this.state.redirect
        });
    }

    //se utiliza cuando se va a redireccionar a la pagina de mensajes.
    //se le pasa el id de la publicacion y el usuario conectado actualmente a la pagina de mensajes.
    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/mensajes',
                state: { idMensajes: this.state.idChat, username: this.props.currentUser.username }
            }} />
        }
    }

    //se utiliza cuando se va a registrar una publicacion
    toggleRegistrar() {
        this.setState({
            botonRegistrar: !this.state.botonRegistrar
        });
    }

    //se utiliza cuando se quieren ver las publicaciones llenas
    toggleVerLlenos() {
        this.setState({
            verLlenos: !this.state.verLlenos
        });
    }

    //se utiliza para que un card pueda actulizar el state del APP.JS y poner en su state el id de la publicacion
    //y asi saber qué chat abrir con el botón.
    chatId(id) {
        this.setState({
            idChat: id
        });
    }

    //se renderizan los cards de los viajes.
    //el viaje es el viaje del card. this.chatID lo va a llamar el card si se reserva un cupo y 
    //actulizar el state del APP.JS
    //el current user es por si se quiere borrar una publicacion.
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
                    establecerChat={this.chatId}
                    idOwner={this.props.currentUser && this.props.currentUser._id}
                />
            );
        })
    }

    render() {
        return (
            <div>
                {/*aqui va el narvar que se tiene arriba*/}
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <h3 className="navbar-brand">Carpooling</h3>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            {/*esto es el login*/}
                            <AccountsUIWrapper />
                        </li>
                    </ul>
                    {/*si hay un usuario conectado, aparece un boton para ir arriba*/}
                    {this.props.currentUser ?
                        <a className="nav-link btn btn-primary" href="#">Volver Arriba</a>
                        : ''}
                    {/*si hay un usuario conectado, aparece la opcion de ver los cupos llenos*/}
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
                {/*boton de registrar un viaje si hay un usuario conectado*/}
                <div className="container">
                    {this.props.currentUser ?
                        <button type="button" className="btn btn-primary registrar btn-lg" onClick={this.toggleRegistrar}>Registrar Viaje</button>
                        : ''}
                    <br />
                    {/*boton para entrar en la sala de chats*/}
                    {this.props.currentUser && (this.state.idChat != null) ?
                        <div>
                            {this.renderRedirect()}
                            <button type="button" className="btn btn-primary chat btn-lg" onClick={this.setRedirect}>Sala de chat</button>
                        </div>
                        : ''}

                    {/*el form para crear una nueva publicacion*/}
                    {this.state.botonRegistrar ? <InsertarForm ocultar={this.toggleRegistrar} /> : ''}

                    {/*las cards reenderizadas*/}
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
        //se organiza del ultimo creado al mas viejo.
        viajes: Viajes.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
})(App);