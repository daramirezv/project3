import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Companies = new Mongo.Collection('companies');

if (Meteor.isServer) {
  // Se publica la coleccion de companies
  Meteor.publish('companies', function companiesPublication() {
    return Companies.find();
  });
}

Meteor.methods({

  //se inserta una nueva companie. 
  'companies.insert'(companie) {
    check(companie, {
      name: String,
      city: String,
      address: String,
      numberOfEmployees: Number
    });

    Companies.insert(companie);
  }
});