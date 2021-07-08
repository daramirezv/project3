import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

//el form para crear un nuevo viaje
export default class InsertarForm extends Component {
    constructor(props) {
        super(props);
        this.registrarViaje = this.registrarViaje.bind(this);
    }

    registrarViaje() {

        //¡Se pueden usar refs para evitar esto y queda mucho más simple! 
        const origen = document.getElementById("origen").value;
        const destino = document.getElementById("destino").value;
        const ruta = document.getElementById("routeToTake").value;
        const fecha = document.getElementById("dateLeaving").value;
        const tiempo = document.getElementById("timeLeaving").value;
        const cantidad = document.getElementById("cantidadCupos").value;
        const precio = document.getElementById("precioViaje").value;
        
        //No creo que sea buena idea pasarle DOM elements a el servidor (en Node puede ser peligroso manipularlos, porque no hay interfaz gráfica)
        Meteor.call('viajes.insert', origen, destino, ruta, fecha, tiempo, cantidad, precio, (err) =>{
            if(err) return alert(err);
            //Si hay un error, y no se va a ocultar
            this.props.ocultar(); 
        });
    }

    render() {
        return (
            <form>
                <div className="formulario col-md-6">
                    <div className="form-group">
                        <label htmlFor="origen"><strong>Origen </strong></label>
                        <input type="text" className="form-control" id="origen" placeholder="Ingrese su origen" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destino"><strong>Destino</strong></label>
                        <input type="text" className="form-control" id="destino" placeholder="Ingrese su destino" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="routeToTake"><strong>Ruta</strong></label>
                        <input type="text" className="form-control" id="routeToTake" placeholder="Ingrese su ruta" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateLeaving"><strong>Fecha de salida</strong></label>
                        <input type="date" className="form-control" id="dateLeaving" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="timeLeaving"><strong>Hora de Salida</strong></label>
                        <input type="time" className="form-control" id="timeLeaving" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cantidadCupos"><strong>Cantidad Cupos</strong></label>
                        <input type="number" className="form-control" id="cantidadCupos" placeholder="0" min="0" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precioViaje"><strong>Precio (pesos) </strong></label>
                        <input type="number" className="form-control" id="precioViaje" placeholder="0" min="0" />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.registrarViaje}>Registrar</button>
                </div >
            </form>
        )
    }
}
