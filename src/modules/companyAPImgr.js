const remoteURL = "http://localhost:5002"

export default {
    getAllCompanies: () => {
        return fetch(`${remoteURL}/companies`)
            .then(ac => ac.json())
    },

    getOneCompany: () => {
        return fetch(`${remoteURL}/companies`)
            .then(oc => oc.json())
    },

    postNewCompany: (newCompany) => {
        return fetch(`${remoteURL}/companies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCompany)
        }).then(nc => nc.json())
    },

    getCompanyTasks: (companyId) => {
        return fetch(`${remoteURL}/tasks/?companyId=${companyId}`)
            .then(ct => ct.json())
    },

    postNewTask: (newTask) => {
        return fetch(`${remoteURL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }).then(at => at.json())
        }

}
