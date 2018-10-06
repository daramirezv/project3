import { Accounts } from 'meteor/accounts-base';

//aqui se indica que se necesita username y correo para registrarse
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});