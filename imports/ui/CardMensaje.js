import React, { Component } from 'react';

//el card de un mensaje
export default class CardMensaje extends Component {

    render() {
        return (
            <div className="card itemCard col-sm-9">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Usuario: </strong>{this.props.mensaje.username}</li>
                    <li className="list-group-item"><strong>Mensaje: </strong>{this.props.mensaje.mensaje}</li>
                    <li className="list-group-item"><strong>Fecha: </strong>{this.props.mensaje.createdAt.toString()}</li>
                </ul>
            </div>
        )
    }
}