import React, { Component } from 'react';
import { Mensajes } from '../api/mensajes.js';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import CardMensaje from './CardMensaje.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import PropTypes from 'prop-types';

//la pagina principal de mensaje
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

  //se utiliza cuando se va a devolver a la pagina principal
  setRedirect() {
    this.setState({
      redirect: true
    });
  }
  //se utiliza cuando se va a devolver a la pagina principal. el state que se manda no esta implementado
  //al otro lado todavia. Queria hacer que al devolverse, siguiera el boton de entrar a la sala, en vez
  //de tener que reservar otro cupo para entrar.
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/',
        state: { idMensajes: this.props.location.state.idMensajes }
      }} />;
    }
  }

  //inserta un nuevo mensaje
  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('mensajes.insert', text, this.props.location.state.idMensajes);

    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  //reenderiza los mensajes.
  //estoy haciendo el filtro del chat aqui, es un poco burdo e inseguro, creo que se debería hacer
  //en la clase de la coleccion de mongo, pero no supe como hacerlo (no busqué mucho tampoco)
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
    });
  }

  render() {
    return (
      <div>
        {/*navvar*/}
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <h3 className="navbar-brand">Carpooling</h3>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <AccountsUIWrapper />
            </li>
          </ul>
        </nav>

        <div className="container">
          {this.renderRedirect()}
          <button className="btn btn-primary inicio btn-lg" onClick={this.setRedirect}>Devolverse</button>
        </div>
        {/*el espacio para ingresar un nuevo mensaje*/}
        <form className="new-mensaje container" onSubmit={this.handleSubmit} >
          <input
            type="text"
            size="60"
            ref="textInput"
            placeholder="Ingresa nuevos mensajes"
          />
        </form>
        {/*mensajes reenderizados*/}
        <ul>
          {this.renderMensajes()}
        </ul>

      </div>
    );
  }
}

MensajeApp.propTypes = {
  mensajes: PropTypes.array.isRequired
  
};

export default withTracker(() => {
  //se suscribe a la coleccion mensajes
  Meteor.subscribe('mensajes');
  //se ordena del ultimo creado al mas viejo
  return {
    mensajes: Mensajes.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(MensajeApp);