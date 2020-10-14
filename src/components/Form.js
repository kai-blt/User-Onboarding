import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as yup from 'yup'
import schema from '../schema/schema'
import axios from 'axios'


//Styled components
const FormContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 50%;
    padding: 2%;
    font-weight: 500;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 5px 5px 25px #222;
    margin: 2% 0;
   
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
    padding: 2% 0;
    color: red;
`;

const UserContainer = styled.div`
    color: #fff;
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





export default function Form(props) {
    //Hold form values in state
    const [formData, setFormData] = useState(defaultFormData);

    //Set Yup errors during validation
    const [errors, setErrors] = useState(defaultErrorState)

    //Disable button until form is complete
    const [disabled, setDisabled] = useState(true);

    //Keep track of users entered
    const [users, setUsers] = useState([]);
    
    //Every time form data is filled out, check if it's valid. If so disable button.
    useEffect(() => {
        schema.isValid(formData)
            .then(valid => setDisabled(!valid))
            .catch(err => alert())
    }, [formData])


    //Check the schema and set errors for display
    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
            .then(() => setErrors({ ...errors, [name]: '' }))
            .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
    }

    const submit = (evt) => {
        evt.preventDefault();
        axios.post('https://reqres.in/api/users', formData)
            .then(res => {
                const newUser = res.data;
                setUsers([...users, newUser])
                console.log(JSON.stringify(newUser))
            })
            .catch(err => {
                debugger
            })
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
        <>
        <FormContainer>            
            <ErrorContainer>
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.agree}</div>
            </ErrorContainer>
            <h1>Add Users</h1>
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
        <UserContainer>
             { /*Display users only if there is data. Replace json [], {}, ',' and " with regex */ }
         { (users.length !== 0) && <pre>{JSON.stringify(users, null, '\t' ).replace(/[\[\]\{\}\"\,]/g, '')}</pre> }     
        </UserContainer>
        </>
    )
}