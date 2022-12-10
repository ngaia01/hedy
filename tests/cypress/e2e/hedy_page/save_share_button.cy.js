import {goToHedyPage, goToHome} from "../tools/navigation/nav";
import {loginForStudent} from "../tools/login/login";

describe('Checks if save & share button works', () => {
    it('Passes', () => {
      loginForStudent();
      cy.get('#start_programming_button').click();

      // clear and type in editor 'print test'
      cy.get('textarea').clear({force: true})
      cy.get('#editor').type('print test');
      
      cy.get('#runit').click();
      cy.wait(3000);

      // the save and share button:
      cy.get('#share_program_button')
      .should('be.visible')
      .should('not.be.disabled')
      .click();
      
      // this is for if you already have saved your level once:
      if (cy.get('#modal-confirm')){
        cy.get('#modal-yes-button').click();
      }

      // block for copying link should be visible:
      cy.get('#modal-copy')
      .should('be.visible');

      // clicking on button for copying the share link
      cy.get('#modal-copy-button')
      .should('be.visible')
      .should('not.be.disabled')
      .click();
      
      goToHome();
      goToHedyPage();

      // checks if it is correctly saved:
      cy.get('#editor > .ace_scroller > .ace_content .ace_line').each((element, index) => {
        if(index == 0) {
          cy.get(element).should('have.text', 'print test');
        }
      })

      
    })
  })