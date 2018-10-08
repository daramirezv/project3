import { Accounts } from 'meteor/accounts-base';

//aqui se indica que se necesita username para registrarse
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});