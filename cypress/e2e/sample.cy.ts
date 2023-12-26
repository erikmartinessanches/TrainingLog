/// <reference types="cypress" />

import { Chance } from 'chance';

const chance = new Chance();

describe('Starter', () => {
  const email = chance.email();
  const password = 'MyGreatPassword123';

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Has title', () => {
    cy.contains('App view (front page)');
  });

  it('Test login form', () => {
    cy.get('#login').click();
    cy.contains('Log in');
    cy.get('#login').click();

    cy.get('#form-validation').within(() => {
      cy.get('#email').clear();
      cy.get('#outlined-password-input').clear();
      cy.get('input:invalid').should('have.length', 2);

      cy.log('**Enter email**');
      cy.get('#email').type(email);
      cy.get('input:invalid').should('have.length', 1);

      cy.log('**Enter password**');
      cy.get('#outlined-password-input').type(password);
      cy.get('input:invalid').should('have.length', 0);
      cy.get('input:valid').should('have.length', 2);
    });
  });
});
