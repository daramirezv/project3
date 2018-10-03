import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class InsertarForm extends Component {
    constructor(props) {
        super(props);
        this.registrarViaje = this.registrarViaje.bind(this);
    }

    registrarViaje() {

        const origen = document.getElementById("origen").value;
        const destino = document.getElementById("destino").value;
        const ruta = document.getElementById("routeToTake").value;
        const fecha = document.getElementById("dateLeaving").value;
        const tiempo = document.getElementById("timeLeaving").value;
        const cantidad = document.getElementById("cantidadCupos").value;
        const precio = document.getElementById("precioViaje").value;

        Meteor.call('viajes.insert', origen, destino, ruta, fecha, tiempo, cantidad, precio);
    }
    
    render() {
        return (
            <div className="formulario">
                <form>
                    <div className="form-group">
                        <label htmlFor="origen">Origen</label>
                        <input type="text" className="form-control" id="origen" placeholder="Ingrese su origen" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destino">Destino</label>
                        <input type="text" className="form-control" id="destino" placeholder="Ingrese su destino" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="routeToTake">Ruta</label>
                        <input type="text" className="form-control" id="routeToTake" placeholder="Ingrese su ruta" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateLeaving">Fecha de salida</label>
                        <input type="date" className="form-control" id="dateLeaving" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="timeLeaving">Hora de Salida</label>
                        <input type="time" className="form-control" id="timeLeaving" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cantidadCupos">Cantidad Cupos</label>
                        <input type="number" className="form-control" id="cantidadCupos" placeholder="0" min="0" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precioViaje">Precio (pesos) </label>
                        <input type="number" className="form-control" id="precioViaje" placeholder="0" min="0" />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.registrarViaje}>Registrar</button>
                </form>
            </div >
        )
    }
}