import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Mensajes = new Mongo.Collection('mensajes');

if (Meteor.isServer) {
    // Se publica la coleccion de mensajes
    Meteor.publish('mensajes', function mensajesPublication() {
        return Mensajes.find();
    });
}

Meteor.methods({

    //se inserta un nuevo mensaje. idChat se refiere al ID de la publicacion y Mensaje es el mensaje
    'mensajes.insert'(mensaje, idChat) {
        check(mensaje, String);
        check(idChat, String);

        //el usuario tiene que estar loggineado
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Mensajes.insert({
            mensaje,
            idChat,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    }
});