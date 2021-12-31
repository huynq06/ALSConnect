import validator from 'validator'
function isValidEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
    if (value == "") {
        setEmailError("")
    }
    else if (isValidEmail(value)) {
        setEmailError("")
    }
    else {
        setEmailError("Invalid Email")
    }
}
// function validatePassword(value, setPasswordError) {
//     if (value.length < 6) {
//         setPasswordError("Password not Strong")
//     } else {
//         setPasswordError("")
//     }
// }
function validatePassword(value, setPasswordError) {
    if (validator.isStrongPassword(value, {
        minLength: 6, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
        setPasswordError("")
    } else {
        setPasswordError("Error,Password is not Strong")
    }
}

const utils = {
    isValidEmail,
    validateEmail,
    validatePassword
};

export default utils;