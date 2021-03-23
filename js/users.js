const ul = document.getElementById("ul")
let users = []

const createUsers = (user) => {
    let li = document.createElement("li")

    li.innerHTML = `
    <div>
        <p>${user.userName}</p>
        <p>${user.gender}</p>
    </div>`

    ul.appendChild(li)
}

const getUsers  = async () => {
    await fetch('http://localhost:3000/users')
        .then(data => data.json())
        .then(data => users = data)

    drawUsers()
}

function drawUsers() {
    users.forEach(user => {
        createUsers(user)
    })
}

getUsers()