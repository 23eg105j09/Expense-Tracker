import api from '../api/api';

const login = (username, password) => {
  return api.post('/auth/signin', { username, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const register = (username, email, password) => {
  return api.post('/auth/signup', { username, email, password });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  login,
  logout,
  register,
  getCurrentUser,
};

export default authService;
