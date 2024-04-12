import axios from 'axios';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const registerUser = async (formData, token) => {
    try {
        const response = await axios.post('http://127.0.1:8000/api/register', {
            name: formData.name,
            email: formData.email
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllUsers = async (token) => {
    try {
        const response = await axios.get('http://127.0.1:8000/api/get-all-users', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}


export const forgotPassword = async (email) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/forgot-password', {
            email: email
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const resetPassword = async (token, email, password, confirmPassword) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/reset-password', {
            token: token,
            email: email,
            password: password,
            password_confirmation: confirmPassword
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const changePassword = async (currentPassword, newPassword, confirmPassword, token) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/change-password', {
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirmation: confirmPassword
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        return {
            status: response.status,
            data: response.data
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const createNewTask = async (newTask, token) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/create-tasks', {
            "title": newTask.title,
            "description": newTask.description,
            "status": newTask.status,
            "assigned_to": newTask.assigned_to
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        ;
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllTasks = async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/tasks', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        return response.data.tasks;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateTaskApi = async (id, newStatus, token) => {
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/tasks/${id}/status`, {
            status: newStatus,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const createNewComment = async (task_id, comment, token) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/comments', {
            "task_id": task_id,
            "body": comment
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        return response.data;
    }
    catch (error) {
        console.error('Response data:', error.response?.data);
        console.error('Status code:', error.response?.status);
        throw error;
    }
}

export const getCommentsByTaskId = async (task_id, token) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/comments`, {
            params: {
                task_id: task_id
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        return response.data.comments;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchData = async () => {
    try {
        const token = store.state.token;
        const response = await axios.get('http://ejemplo.com/api/data', { headers: { Authorization: token } });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
