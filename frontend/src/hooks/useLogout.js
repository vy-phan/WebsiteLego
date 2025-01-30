import axios from "axios";


export const useLogout = () => {
    const logout = async () => {
        try {
            await axios.post("/api/auth/logout");
            localStorage.removeItem('userLego');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return logout;
};

export default useLogout;
