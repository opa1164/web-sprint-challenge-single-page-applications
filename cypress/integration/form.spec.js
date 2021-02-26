

describe('Form', () => {
  
  beforeEach(() =>{
    cy.visit("http://localhost:3000/pizza");
  })

  const nameInput = () => cy.get('input[name=name]');
  const pepInput = () => cy.get('input[name=pep]');
  const sizeInput  = () => cy.get('select[name = size]');
  const sausInput = () => cy.get('input[name=saus]');
  const subButton = () => cy.get('button[id = submit]');

  it("mvp", function(){
    nameInput().type('Mike').should('have.value','Mike');
    pepInput().click().should('have.value',"on");
    sausInput().click().should('have.value',"on");
    pepInput().should('have.value',"on");
    sizeInput().select("Small");
    subButton().click();
    nameInput().should('have.value','');
    subButton().should('be.disabled');
  })
})