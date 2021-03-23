const form = document.getElementById("form")
const userName = document.getElementById("username")
const password = document.getElementById("password")
const passwordConfirm = document.getElementById("password2")
const submit = document.getElementById("submit")
let gender = form.elements['gender']

// function for showing errors
function showError(input, msg) {
    const formControl = input.parentElement
    formControl.className = "form-control error"
    const small = formControl.querySelector('small')
    small.innerText = msg
    // return false
}

// function for showing success
function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = "form-control success"
    // return true
}


// check inputs length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `Your password must be at least ${min}`)
        return  false
    } else if (input.value.length > max) {
        showError(input, `Your password must be less then ${max}`)
        return false
    } else {
        showSuccess(input)
        return true
    }
}

//check passwords
function checkPasswords(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Passwords dont match")
        return false
    } else {
        return true
    }
}


//event listener on submit
form.addEventListener('submit',  (e)=> {
    e.preventDefault();

    if (
        checkPasswords(password, passwordConfirm) &&
        checkLength(password, 6, 12) &&
        checkLength(userName, 5, 15)
    ) {
        // console.log("hello")
        fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify({
            userName: userName.value,
            gender: gender.value,
            password: password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => window.location.replace("users.html"))
        .catch(rej => console.error(rej))
    }
})

