const remoteURL = "https://frontend-capstone-api.herokuapp.com"

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
        return fetch(`${remoteURL}/tasks/?companyId=${companyId}&_expand=user`)
            .then(ct => ct.json())
    },

    getOneTask: (taskId) => {
        return fetch(`${remoteURL}/tasks/${taskId}?_expand=user`)
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

    archiveTask: (taskId) => {
        return fetch(`${remoteURL}/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ archived: true })
        })
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

    reopenTask: (taskId) => {
        return fetch(`${remoteURL}/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ isComplete: false })
        });
    },

    assignTask: (taskId, empId) => {
        return fetch(`${remoteURL}/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: parseInt(empId) })
        });
    }
}
