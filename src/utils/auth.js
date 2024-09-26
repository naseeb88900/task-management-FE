import { jwtDecode } from 'jwt-decode';

export const saveToken = (token) => {
  localStorage.setItem("jwtToken", token);
};

export const getToken = () => {
  return localStorage.getItem("jwtToken");
};

export const clearToken = () => {
  localStorage.removeItem("jwtToken");
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role; // Assuming the role is stored in the 'role' field of the token
  } catch (err) {
    console.error('Failed to decode token:', err);
    return null;
  }
};