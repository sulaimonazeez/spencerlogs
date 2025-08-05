import axiosInstance from "./utility";

export const logout = async () => {
  try {
    console.log("Attempting to log out on backend...");
    await axiosInstance.post('/logout/');
    console.log("Backend logout successful.");
  } catch (error) {
    console.error("Error during backend logout:", error.response?.data || error.message);
  } finally {
    console.log("Clearing client-side tokens and redirecting.");
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    window.location.href = '/login';
  }
};
