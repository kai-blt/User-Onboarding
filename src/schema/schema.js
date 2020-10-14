import * as yup from 'yup'

//Yup Validation Schema
const schema = yup.object().shape({
    name: yup.string().required('Please enter your name').min(4, 'Please enter a name greater than 4 characters'),
    email: yup.string().required('Please enter your email address').email('Please enter a valid email address'),
    password: yup.string().required('Please enter a password').min(10, 'Please create a strong password that is greater than 10 characters'),
    agree: yup.boolean().oneOf([true], 'Please accept our TOS agreement')
})

export default schema 