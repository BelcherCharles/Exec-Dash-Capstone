const remoteURL = "http://localhost:5002"

export default {
    getAllUsers: () => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/users`)
            .then(au => au.json())
    },

    getCompanyUsers: (compId) => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/users/?companyId=${compId}`)
            .then(cu => cu.json())
    },

    getOneUser: (userId) => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/users/${userId}`)
            .then(ou => ou.json())
    },

    postNewUser: (newUser) => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(nu => nu.json())
    },

    updateUser: (editedUser, userId) => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedUser)
        })
            .then(eu => eu.json())
    },

    deleteUser: (userId) => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/users/${userId}`, {
            method: "DELETE"
        })
    },

    userLogin: (userEmail) => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/users/?email=${userEmail}`)
            .then(su => su.json())
    }
    // searchUserName: (name) => {
    //     return fetch(`https://frontend-capstone-api.herokuapp.com/users/?name=${name}`)
    //         .then(pu => pu.json())


}