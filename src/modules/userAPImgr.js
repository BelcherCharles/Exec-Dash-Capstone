const remoteURL = "http://localhost:5002"

export default {
    getAllUsers: () => {
        return fetch(`${remoteURL}/users`)
            .then(au => au.json())
    },

    getCompanyUsers: (companyId) => {
        return fetch(`${remoteURL}/users/companyId=${companyId}`)
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

    userLogin: (userEmail) => {
        return fetch(`${remoteURL}/users/?email=${userEmail}`)
            .then(su => su.json())
    }
}