import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Viajes = new Mongo.Collection('viajes');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('viajes', function viajesPublication() {

        const empresa = Meteor.users.findOne(this.userId).emails[0].address.split("@")[1].split(".")[0]

        return Viajes.find({
            email : { $eq : empresa }
        });
    });
}

Meteor.methods({
    'viajes.insert'(origen, destino, ruta, fecha, tiempo, cantidad, precio) {
        check(origen, String);
        check(destino, String);
        check(ruta, String);
        check(cantidad, String);
        check(precio, String);

        // Make sure the user is logged in before inserting a task
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
            username: Meteor.users.findOne(this.userId).username,
            email: Meteor.users.findOne(this.userId).emails[0].address.split("@")[1].split(".")[0]
        });
    },
    'viajes.remover'(viajeId) {
        check(viajeId, String);

        const viaje = Viajes.findOne(viajeId);
        if (viaje.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        Viajes.remove(viajeId);
    },
    'viajes.reservar'(viajeId) {
        check(viajeId, String)

        const viaje = Viajes.findOne(viajeId);
        const numero = parseInt(viaje.cantidad,10) - 1 + "";
        Viajes.update(viajeId, { $set: { cantidad: numero } });
    }
});