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
        console.log("TOKEN GET ALL USER", token);
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

        console.log("RESPONSE", response);
        return response.data;
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
        throw error;
    }
};