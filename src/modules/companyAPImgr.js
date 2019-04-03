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

    getOneTask: (taskId) => {
        return fetch(`${remoteURL}/tasks/${taskId}`)
            .then(ot => ot.json())
    },

    postNewTask: (newTask) => {
        return fetch(`${remoteURL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }).then(nt => nt.json())
    },

    updateTask: (editedTask, userId) => {
        return fetch(`${remoteURL}/tasks/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTask)
        })
            .then(et => et.json())
    },

    deleteTask: (taskId) => {
        return fetch(`${remoteURL}/tasks/${taskId}`, {
            method: "DELETE"
        })
    },

    markTaskComp: (taskId) => {
        return fetch(`${remoteURL}/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ isComplete: true })
        });
    },

    assignTask: (taskId, empId) => {
        return fetch(`${remoteURL}/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ assignedTo: parseInt(empId) })
        });
    }
}
