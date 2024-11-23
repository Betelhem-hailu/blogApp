import axios from 'axios';
const API = "http://localhost:5000/user";



const register = user => {
     return axios.post(API + "/register", user).then((response) => {
        return response.data;
    }).catch(error => {
        if (error.response && error.response.status === 409) {
            throw new Error(error);
        }
        else if (error.response && error.response.status === 400) {
            throw new Error(error.response.data.errors);
        } else {
            throw new Error(error || 'An unexpected error occurred');
        }
    })
}


const login = ({email, password}) => {
    return axios.post(API + "/login", {email, password}).then((response) => {
        return response.data;
    });
}

const logout = async() => {
    return axios.post(API + '/logout', { withCredentials: true})
    .then(() => {
        localStorage.removeItem("userInfo");
    });
  };

export const userService =  {
    register,
    login,
    logout
}

