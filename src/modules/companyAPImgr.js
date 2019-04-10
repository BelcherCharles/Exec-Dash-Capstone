// const remoteURL = "http://localhost:5002"

export default {
    getAllCompanies: () => {
        return fetch("https://frontend-capstone-api.herokuapp.com/companies")
            .then(ac => ac.json())
    },

    getOneCompany: () => {
        return fetch("https://frontend-capstone-api.herokuapp.com/companies")
            .then(oc => oc.json())
    },

    postNewCompany: (newCompany) => {
        return fetch("https://frontend-capstone-api.herokuapp.com/companies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCompany)
        }).then(nc => nc.json())
    },

    getCompanyTasks: (companyId) => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/tasks/?companyId=${companyId}&_expand=user`)
            .then(ct => ct.json())
    },

    getOneTask: (taskId) => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/tasks/${taskId}?_expand=user`)
            .then(ot => ot.json())
    },

    postNewTask: (newTask) => {
        return fetch("https://frontend-capstone-api.herokuapp.com/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }).then(nt => nt.json())
    },

    updateTask: (editedTask, userId) => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/tasks/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTask)
        })
            .then(et => et.json())
    },

    deleteTask: (taskId) => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/tasks/${taskId}`, {
            method: "DELETE"
        })
    },

    markTaskComp: (taskId) => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ isComplete: true })
        });
    },

    assignTask: (taskId, empId) => {
        return fetch(`https://frontend-capstone-api.herokuapp.com/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: parseInt(empId) })
        });
    }
}
