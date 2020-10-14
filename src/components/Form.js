import React, { useState } from 'react'
import styled from 'styled-components'
import * as yup from 'yup'



//Styled components
const FormContainer = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-content: center;
    height: 30vh;
    padding: 2%;
    font-weight: 500;

    input {
        margin: 2%;
    }

    label {
        margin: 4%;
    }

    button {
        padding: 2%;
        font-size: 1.5rem;
        margin: 4% 0;
    }
`;



//Default blank form 
const defaultFormData = {
    name: '',
    email: '',
    password: '',
    agree: false
}


export default function Form(props) {
    //Hold form values in state
    const [formData, setFormData] = useState(defaultFormData);

    //Disable button until form is complete
    const [disabled, setDisabled] = useState(true);

    const handleForm = (evt) => {
        //Get target name, it's value and type and checked from field user interacted with
        const { name, value, checked, type } = evt.target;
        //Check if the input was a checkbox, if so set checked state as value, else use the input fields value
        const valueToUse = type === 'checkbox' ? checked : value;
        setFormData({...formData, [name]: valueToUse})
    }

    return(
        <FormContainer>
            <form onSubmit={null}>
                <label>Name               
                    <input type="text" name="name" value={formData.name} onChange={handleForm} />
                </label>
                <br/>
                <label>Email            
                    <input type="email" name="email" value={formData.email} onChange={handleForm} />
                </label>
                <br/>
                <label>Password                
                    <input type="text" name="password" value={formData.password} onChange={handleForm} />
                </label>
                <br/>
                <label>Agree to TOS                
                    <input type="checkbox" name="agree" checked={formData.agree} onChange={handleForm} />
                </label>
                <br/>
                <button disabled={disabled}>Submit</button>
            </form>
        </FormContainer>
    )
}