import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Viajes = new Mongo.Collection('viajes');

if (Meteor.isServer) {

    // Se suscribe a la coleccion de viajes
    Meteor.publish('viajes', function viajesPublication() {

        const empresa = Meteor.users.findOne(this.userId).companie;

        //solo se devuelven los viajes que pertenezcan a la empresa del usuario loggineado
        return Viajes.find({
            companie: { $eq: empresa }
        });
    });
}

Meteor.methods({
    //se inserta un viaje
    'viajes.insert'(origen, destino, ruta, fecha, tiempo, cantidad, precio) {
        check(origen, String);
        check(destino, String);
        check(ruta, String);
        check(cantidad, String);
        check(precio, String);

        // El usuario debe estar loggineado
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Viajes.insert({
            origen,
            destino,
            ruta,
            fecha,
            tiempo,
            cantidad,
            precio,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username
        });
    },

    //se remueve un viaje
    'viajes.remover'(viajeId) {
        check(viajeId, String);

        const viaje = Viajes.findOne(viajeId);
        if (viaje.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        Viajes.remove(viajeId);
    },

    //se reserva un cupo del viaje
    'viajes.reservar'(viajeId) {
        check(viajeId, String)

        const viaje = Viajes.findOne(viajeId);
        const numero = parseInt(viaje.cantidad, 10) - 1 + "";
        Viajes.update(viajeId, { $set: { cantidad: numero } });
    }
});