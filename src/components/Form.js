import React, { useState } from 'react'
import * as yup from 'yup'


const defaultFormData = {
    name: '',
    email: '',
    password: '',
    agree: false
}


export default function Form(props) {
    //Hold form values in state
    const [formData, setFormData] = useState(defaultFormData)

    const handleForm = (evt) => {
        //Get target name, it's value and type and checked from field user interacted with
        const { name, value, checked, type } = evt.target;
        //Check if the input was a checkbox, if so set checked state as value, else use the input fields value
        const valueToUse = type === 'checkbox' ? checked : value;
        setFormData({...formData, [name]: valueToUse})
    }

    return(
        <form onSubmit={null}>
            <label>Name               
                <input type="text" name="name" value={formData.name} onChange={handleForm} />
            </label>
            <label>Email            
                <input type="email" name="email" value={formData.email} onChange={handleForm} />
            </label>
            <label>Password                
                <input type="text" name="password" value={formData.password} onChange={handleForm} />
            </label>
            <label>TOS                
                <input type="checkbox" name="agree" checked={formData.agree} onChange={handleForm} />
            </label>
            <button>Submit</button>
        </form>
    )
}