import React, { useEffect, useState } from 'react';
import useGetAges from '../hooks/useGetAges';
import SlideBar from '../components/SlideBar';
import useGetProducts from '../hooks/useGetProducts';
import { postAge, updateAge, deleteAge } from '../hooks/useCUD_Ages';

const AdminAges = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedAge, setSelectedAge] = useState(null);
    const { ages, loading, error, fetchAges } = useGetAges();
    const { products, loading: loadingProducts, error: errorProducts, fetchProducts } = useGetProducts();

    useEffect(() => {
        fetchAges();
        fetchProducts();
    }, []);

    // Mở modal để thêm mới
    const handleAdd = () => {
        setModalMode('add');
        setSelectedAge(null);
        setIsModalOpen(true);
    };

    // Mở modal để chỉnh sửa
    const handleEdit = (age) => {
        setModalMode('edit');
        setSelectedAge(age);
        setIsModalOpen(true);
    };

    // Xóa tuổi theo ID
    const handleDelete = async (id) => {
        const name = ages.find((age) => age._id === id)?.ageRange;
        if (confirm(`Are you sure you want to delete this age: ${name}?`)) {
            try {
                await deleteAge(id);
                await fetchAges(); // Cập nhật danh sách
            } catch (err) {
                console.error('Error deleting age:', err);
            }
        }
    };

    // Xử lý thêm/sửa dữ liệu
    const handleSubmit = async (e) => {
        e.preventDefault();
        const ageRange = e.target.ageRange.value;

        try {
            if (modalMode === 'add') {
                await postAge({ ageRange });
            } else {
                await updateAge(selectedAge._id, { ageRange });
            }
            setIsModalOpen(false);
            await fetchAges(); // Cập nhật danh sách sau khi thêm/sửa
        } catch (err) {
            console.error('Error updating age:', err);
        }
    };

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (error || errorProducts) return <div className="text-red-500 text-center">{error?.message || errorProducts?.message}</div>;

    return (
        <div className="flex">
            <SlideBar />
            <div className="flex-1 p-4">
                <div className="overflow-x-auto">
                    <button
                        onClick={handleAdd}
                        className="mb-4 me-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
                    >
                        Add Age
                    </button>

                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">STT</th>
                                <th className="px-4 py-2">Age Range</th>
                                <th className="px-4 py-2">Quantity Lego Of Age</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {ages.map((age, index) => (
                                <tr key={age._id}>
                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 text-center">{age.ageRange}</td>
                                    <td className="px-4 py-2 text-center">
                                        {products.filter((product) => product.age === age._id).length}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleEdit(age)}
                                            className="bg-blue-600 px-4 py-2 text-xs text-white rounded hover:bg-blue-700 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(age._id)}
                                            className="bg-red-600 px-4 py-2 text-xs text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                                <h3 className="text-xl font-semibold mb-4">
                                    {modalMode === 'add' ? 'Add Age' : 'Edit Age'}
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <label className="block mb-2">
                                        Age Range
                                        <input
                                            type="text"
                                            name="ageRange"
                                            defaultValue={selectedAge?.ageRange}
                                            className="w-full border p-2 rounded"
                                            required
                                        />
                                    </label>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2 bg-gray-300 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            {modalMode === 'add' ? 'Add' : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminAges;
