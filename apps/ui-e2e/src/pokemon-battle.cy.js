describe('Pokemon Battle Flow', () => {
  it('should login, search for Scizor, open its detail, select Charizard for battle and initiate the battle', () => {
    cy.visit('/#/login');

    cy.get('input[id="username"]').type('gustavo.paris');
    cy.get('input[id="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/login');

    cy.get('input[placeholder="Search by Name"]').type('Scizor');
    cy.get('input[placeholder="Search by Name"]').type('{enter}');

    cy.get('div').should('not.contain', 'Loading...');

    cy.contains('Scizor').click();

    cy.get('h3').should('contain', 'Scizor');
    cy.get('select[id=battle-select]').select('1');
    cy.get('button').contains('Battle').click();

    cy.get('div').should('contain', 'Battle Result');
    cy.get('div').should('contain', 'Success: No');
    cy.get('div').should('contain', 'Original Attack: 60');
  });
});
