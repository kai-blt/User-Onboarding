describe('Name Field Testing', function() {
    //Arrange
    it('Tests the name and it\'s error message if not enough characters', function() {
        //Act   
        cy.visit('http://localhost:3000/')
        cy.get('input[name="name"]').type('Tes').should('have.value', 'Tes')
        
        //Assert
        cy.get('.nameError').should('contain', 'Please enter a name greater than 4 characters')
    })
});


describe('Email Field Testing', function() {
    //Arrange
    it('Tests the email field to see if it works as expected', function() {
        //Act   
        cy.get('input[name="email"]').type('email@email').should('have.value', 'email@email')

        //Assert
        cy.get('.emailError').should('contain', 'Please enter a valid email address')
    })
});

describe('Password Field Testing', function() {
    //Arrange
    it('Tests the password field to see if it works as expected', function() {
        //Act   
        cy.get('input[name="password"]').type('123456789').should('have.value', '123456789')

        //Assert
        cy.get('.passwordError').should('contain', 'Please create a strong password that is greater than 10 characters')
    })
});


describe('Role Dropdown Testing', function() {
    //Arrange
    it('Tests the role dropdown works', function() {
        //Act   
        cy.get('select[name="role"]').select('Front End Engineer') 

        //Assert
        cy.get('.passwordError').should('contain', 'Please create a strong password that is greater than 10 characters')
    })
});

describe('Radio Button Testing', function() {
    //Arrange
    it('Tests the radio buttons work', function() {
        //Act   
        cy.get('input[name="bestlanguage"]').click({ multiple: true }).should('have.value', 'Python')

        //Assert
        cy.get('.passwordError').should('contain', 'Please create a strong password that is greater than 10 characters')
    })
});


describe('Tests TOS checkbox', function() {
    //Arrange
    it('Checks to see if the checkbox can be used', function() {
        //Act   
        cy.get('input[name="agree"]').click().should('be.enabled')
    })
});

describe('Corrects all fields, submits form and checks for cleared fields', function() {
    //Arrange
    it('Makes fields viable and submits form', function() {
        //Act   
        cy.get('input[name="name"]').type('t').should('have.value', 'Test')
        cy.get('input[name="email"]').type('.com').should('have.value', 'email@email.com')
        cy.get('input[name="password"]').type('0').should('have.value', '1234567890')
        cy.get('button').click()
        cy.get('input[name="name"]').should('have.value', '')

    })
});