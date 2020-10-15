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
    const passwordError = () => cy.get('.passwordError');
    const submitButton = () => cy.get('button')
    const preTag = () => cy.get('pre');

    //Check if Inputs Exist
    describe('Form Inputs exist', () => {
        it('checks if the element exists', () => {
            nameField().should('exist');
            emailField().should('exist');
            passwordField().should('exist');
            roleDropdown().should('exist');
            radioButton().should('exist');
            tosCheckbox().should('exist');
            submitButton().should('exist');
            preTag().should('not.exist')
        })       
    })

    //Check if submit starts disabled
    describe('Check if submit starts disabled', () => {
        it('Checks to see if submit starts disabled', () => {
            submitButton().should('be.disabled');
        })
    })


    //Check inputs can be used
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
    
    //Check error messages display correctly
    describe('Error message tests', () => {
        it('Types characters in the name field under required amt', () => {
            nameField()
                .type('Br')
                .should('have.value', 'Br');       
           nameError()
                .should('contain', 'Please enter a name greater than 4 characters')
        })

        it('Types characters in the email field using wrong format', () => {
            emailField()
                .type('email@email')
                .should('have.value', 'email@email');       
           emailError()
                .should('contain', 'Please enter a valid email address')
        })

        it('Types characters in the password field under required amt', () => {
            passwordField()
                .type('123456789')
                .should('have.value', '123456789');       
           passwordError()
                .should('contain', 'Please create a strong password that is greater than 10 characters')
        })
    })

      
    //Check if form can be submitted
    describe('Checks if user can submit form', () => {
        it('Fills out the form appropriately and checks if form can be submitted', () => {
            nameField().type('Brendan');
            emailField().type('test@test.com');
            passwordField().type('1234567890');
            roleDropdown().select('Front End Engineer');
            radioButton().click();
            tosCheckbox().click();
            preTag().should('not.exist')
            submitButton().click();
            cy.wait(100)
            preTag().should('exist')
        })
    })
    
    //Check if form validation kicks in if fields left empty
    describe('Form Validation', () => {
        it('Check that form cannot be submitted if fields left empty', () => {
            nameField().type('Brendan');
            passwordField().type('1234567890');
            roleDropdown().select('Front End Engineer');
            radioButton().click();
            tosCheckbox().click();
            submitButton().should('be.disabled');
        })
    })
})