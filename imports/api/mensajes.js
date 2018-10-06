import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Mensajes = new Mongo.Collection('mensajes');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('mensajes', function mensajesPublication() {
        return Mensajes.find();
    });
}

Meteor.methods({
    'mensajes.insert'(mensaje, idChat) {
        check(mensaje, String);
        check(idChat, String);

        // Make sure the user is logged in before inserting a task
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