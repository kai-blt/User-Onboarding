//Form Test

describe('Form Testing', () => {
    //Before each test, start with a clean slate by visiting homepage
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })

    //Helper functions to avoid repetition
    const nameField = () => cy.get('input[name="name"]');
    const emailField = () => cy.get('input[name="email"]');
    const passwordField = () => cy.get('input[name="password"]');
    const roleDropdown = () =>  cy.get('select[name="role"]');
    const radioButton = () => cy.get('input[value="Python"]');
    const tosCheckbox = () =>  cy.get('input[name="agree"]');
    const nameError = () => cy.get('.nameError');
    const emailError = () => cy.get('.emailError');
    const submitButton = () => cy.get('button')


    describe('Form Inputs exist', () => {
        it('checks if the element exists', () => {
            nameField().should('exist');
            emailField().should('exist');
            passwordField().should('exist');
            roleDropdown().should('exist');
            radioButton().should('exist');
            tosCheckbox().should('exist')
        })       
    })


    describe('Inputs Can Be Used', () => {
        it('Types in the name field and verifies correct value', () => {               
            nameField()
                .type('Testing')
                .should('have.value', 'Testing');          
        })

        it('Types in the email field and verifies correct value', () => {               
            emailField()
                .type('test@test.com')
                .should('have.value', 'test@test.com');          
        })

        it('Types in the password field and verifies correct value', () => {               
            passwordField()
                .type('testpassword12345')
                .should('have.value', 'testpassword12345');          
        })

        it('Tests if the role dropdown works', () => {
            roleDropdown()
                .select('Front End Engineer')
                .should('have.value', 'Front End Engineer')
        })

        it('Tests if radio button works', () => {
            radioButton()
                .click()
                .should('have.value', 'Python');    
        })

        it('Tests if checkbox works', () => {
            tosCheckbox()
                .click()
                .should('be.enabled');    
        })
    });
    
  
    
     

    
    
    // describe('Tests TOS checkbox', function() {
    //     //Arrange
    //     it('Checks to see if the checkbox can be used', function() {
    //         //Act   
    //         cy.get('input[name="agree"]').click().should('be.enabled')
    //     })
    // });

    // describe('Error message tests', () => {
    //     it('leaves fields blank to test if errors show', () => {
    //         cy.get('.passwordError').should('contain', 'Please create a strong password that is greater than 10 characters')
    //     })
    // })

    
    // describe('Corrects all fields, submits form and checks for cleared fields', function() {
    //     //Arrange
    //     it('Makes fields viable and submits form', function() {
    //         //Act   
    //         cy.get('input[name="name"]').type('t').should('have.value', 'Test')
    //         cy.get('input[name="email"]').type('.com').should('have.value', 'email@email.com')
    //         cy.get('input[name="password"]').type('0').should('have.value', '1234567890')
    //         cy.get('button').click()
    //         cy.get('input[name="name"]').should('have.value', '')
    
    //     })
    // });
    
})