import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

//el card de un viaje
class CardViaje extends Component {
    constructor(props) {
        super(props);
        this.reservarCupo = this.reservarCupo.bind(this);
        this.removerPublicacion = this.removerPublicacion.bind(this);
    }
    //reservar un cupo
    reservarCupo() {
        Meteor.call('viajes.reservar', this.props.viaje._id);
        this.props.establecerChat(this.props.viaje._id);
    }
    //remover el viaje
    removerPublicacion() {
        Meteor.call('viajes.remover', this.props.viaje._id);
    }
    render() {
        return (
            <div className="card itemCard col-sm-5">
                <div className="card-body">
                    <h3 className="card-title">Viaje</h3>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Conductor: </strong> {this.props.viaje.username}</li>
                    <li className="list-group-item"><strong>Origen: </strong> {this.props.viaje.origen}</li>
                    <li className="list-group-item"><strong>Destino: </strong>{this.props.viaje.destino}</li>
                    <li className="list-group-item"><strong>Ruta: </strong>{this.props.viaje.ruta}</li>
                    <li className="list-group-item"><strong>Fecha: </strong>{this.props.viaje.fecha}</li>
                    <li className="list-group-item"><strong>Hora: </strong>{this.props.viaje.tiempo}</li>
                    <li className="list-group-item"><strong>Cantidad Pasajeros: </strong>{this.props.viaje.cantidad}</li>
                    <li className="list-group-item"><strong>Precio (pesos): </strong>{this.props.viaje.precio}</li>
                </ul>
                {/*boton para reservar un cupo*/}
                {parseInt(this.props.viaje.cantidad /*más sencillo*/) > 0 ?
                    <div className="card-body">
                        <a href="#" className="btn btn-success" onClick={this.reservarCupo}>Reservar Cupo</a>
                    </div> : <div className="card-body no_cupos">{/*¡Ojo la jerarquía! (falta un h4)*/}<h5><strong>No quedan cupos</strong></h5></div>}
                {/*boton para borrar la publicacion*/}
                {this.props.viaje.owner = this.props.idOwner ?
                    <div className="card-body">
                        <a href="#" className="btn btn-danger" onClick={this.removerPublicacion}>Remover Publicación</a>
                    </div> : ''}
            </div>
        )
    }
}

CardViaje.propTypes = {
    viaje: PropTypes.object,
    establecerChat: PropTypes.func,
    idOwner: PropTypes.string
};
export default CardViaje;
