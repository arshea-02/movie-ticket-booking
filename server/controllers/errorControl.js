
const handleError = (err)=>{
    let errors = { fullname: '', username: '', email: '', password: ''};
    
    if(err.code === 11000){
        errors.username = "Username is taken";
        return errors;
    }

    if(err.message.includes('validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

export default handleError