import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as yup from 'yup'



//Styled components
const FormContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;
    padding: 2%;
    font-weight: 500;

    input {
        margin: 1%;
    }
    
    button {
        padding: 0.5%;
        font-size: 1.5rem;
        margin: 2% 0;
    }
`;

const ErrorContainer = styled.div`
    margin: 2% 0;
    padding: 2% 0;
    color: red;
`;


//Default blank form 
const defaultFormData = {
    name: '',
    email: '',
    password: '',
    agree: false
}

const defaultErrorState = {
    name: '',
    email: '',
    password: '',
    agree: ''
}


//Yup Validation Schema
const schema = yup.object().shape({
    name: yup.string().required('Please enter your name').min(4, 'Please enter a name greater than 4 characters'),
    email: yup.string().required('Please enter your email address').email('Please enter a valid email address'),
    password: yup.string().required('Please enter a password').min(10, 'Please create a strong password that is greater than 10 characters'),
    agree: yup.boolean().oneOf([true], 'Please accept our TOS agreement')
})


export default function Form(props) {
    //Hold form values in state
    const [formData, setFormData] = useState(defaultFormData);

    //Set Yup errors during validation
    const [errors, setErrors] = useState(defaultErrorState)

    //Disable button until form is complete
    const [disabled, setDisabled] = useState(true);

    //Every time form data is filled out, check if it's valid. If so disable button.
    useEffect(() => {
        schema.isValid(formData)
            .then(valid => setDisabled(!valid))
            .catch(err => alert())
    }, [formData])

    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
            .then(() => setErrors({ ...errors, [name]: '' }))
            .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
    }

    const submit = () => {

    }

    const handleForm = (evt) => {
        //Get target name, it's value and type and checked from field user interacted with
        const { name, value, checked, type } = evt.target;
        //Check if the input was a checkbox, if so set checked state as value, else use the input fields value
        const valueToUse = type === 'checkbox' ? checked : value;
        setFormErrors(name, valueToUse);
        setFormData({...formData, [name]: valueToUse});
    }

    return(
        <FormContainer>            
            <ErrorContainer>
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.agree}</div>
            </ErrorContainer>
            <form onSubmit={submit}>
                <label>Name<br/>               
                    <input type="text" name="name" value={formData.name} onChange={handleForm} />
                </label>
                <br/>
                <label>Email<br/>                
                    <input type="email" name="email" value={formData.email} onChange={handleForm} />
                </label>
                <br/>
                <label>Password<br/>                    
                    <input type="text" name="password" value={formData.password} onChange={handleForm} />
                </label>
                <br/>
                <label>Agree to TOS<br/>                    
                    <input type="checkbox" name="agree" checked={formData.agree} onChange={handleForm} />
                </label>
                <br/>
                <button disabled={disabled}>Submit</button>
            </form>
        </FormContainer>
    )
}