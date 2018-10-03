import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class CardViaje extends Component {
    constructor(props) {
        super(props);
        this.reservarCupo = this.reservarCupo.bind(this);
        this.removerPublicacion = this.removerPublicacion.bind(this);
    }

    reservarCupo(){
        Meteor.call('viajes.reservar', this.props.viaje._id);
    }

    removerPublicacion()
    {
        Meteor.call('viajes.remover', this.props.viaje._id);
    }
    render() {
        return (
            <div className="container itemCard card">
                <div className="card-body">
                    <h3 className="card-title">Nombre Conductor</h3>
                    <p className="card-text">{this.props.viaje.username}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Origen: {this.props.viaje.origen}</li>
                    <li className="list-group-item">Destino: {this.props.viaje.destino}</li>
                    <li className="list-group-item">Ruta: {this.props.viaje.ruta}</li>
                    <li className="list-group-item">fecha: {this.props.viaje.fecha}</li>
                    <li className="list-group-item">Hora: {this.props.viaje.tiempo}</li>
                    <li className="list-group-item">Cantidad Pasajeros: {this.props.viaje.cantidad}</li>
                    <li className="list-group-item">precio: {this.props.viaje.precio}</li>
                </ul>

                {parseInt(this.props.viaje.cantidad, 10) > 0 ?
                <div className="card-body">
                    <a href="#" className="card-link" onClick={this.reservarCupo}>Coger Cupo</a>
                </div> : <h3>No quedan cupos</h3>}

                {this.props.viaje.owner = this.props.idOwner ?
                <div className="card-body">
                    <a href="#" className="card-link" onClick={this.removerPublicacion}>Remover Publicacion</a>
                </div> : ''}

            </div>
        )
    }
}