import axios from 'axios';
axios.defaults.withCredentials = true;
const API = "http://localhost:5000/post";

//create comment
const createComment = async({id, message}) => {
    return axios.post(API + `/${id}/comments`, {message}, {withCredentials: true}).then(response => {
        return response.data;
    })
}

const fetchNotifications = async () => {
    const response = await axios.get(API + "/notifications");
    return response.data;
}

const markAsRead = async (notificationIds) => {
    await axios.put(API + "/markAsRead", { notificationIds });
    return notificationIds;
}

export const commentService ={
    createComment,
    fetchNotifications,
    markAsRead
}