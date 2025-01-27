import axios from "axios";
import { useState } from "react";

const useGetAges = () => {
    const [ages, setAges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAges = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("/api/ages/");
            setAges(response.data.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { ages, loading, error, fetchAges };
};

export default useGetAges;