import axos from "axios";
import { useState } from "react";

const useGetCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axos.get("/api/categories/");
            setCategories(response.data.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { categories, loading, error, fetchCategories };
};

export default useGetCategories;