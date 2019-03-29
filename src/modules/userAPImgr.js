const remoteURL = "http://localhost:5002"

export default {
    getAllUsers: () => {
        return fetch(`${remoteURL}/users`)
            .then(au => au.json())
    },

    getCompanyUsers: () => {
        return fetch(`${remoteURL}/users/?companyId=${sessionStorage.getItem("companyId")}`)
            .then(cu => cu.json())
    },

    getOneUser: (userId) => {
        return fetch(`${remoteURL}/users/${userId}`)
            .then(ou => ou.json())
    },

    postNewUser: (newUser) => {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(nu => nu.json())
    },

    deleteEmp: (userId) => {
        return fetch(`${remoteURL}/users/${userId}`, {
            method: "DELETE"
    })
},

    userLogin: (userEmail) => {
        return fetch(`${remoteURL}/users/?email=${userEmail}`)
            .then(su => su.json())
    }
}