import React, { useEffect, useState } from 'react'
import SlideBar from '../components/SlideBar';
import useGetCategories from '../hooks/useGetCategories';
import { postCategory, updateCategory, deleteCategory } from '../hooks/useCUD_Categories';

const AdminCategories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { categories, loading, error, fetchCategories } = useGetCategories();

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAdd = () => {
        setModalMode('add');
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleEdit = (category) => {
        setModalMode('edit');
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        const name = categories.find((category) => category._id === id).name;
        if (confirm(`Are you sure you want to delete this category : ${name}?`)) {
            try {
                await deleteCategory(id);
                await fetchCategories();
            } catch (error) {

            }
        }
    };

    // Xử lý thêm/sửa dữ liệu
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;

        try {
            if (modalMode === 'add') {
                await postCategory({ name, description });
            } else {
                await updateCategory(selectedCategory._id, { name, description });
            }
            setIsModalOpen(false);
            await fetchCategories(); // Cập nhật danh sách sau khi thêm/sửa
        } catch (err) {
            console.error('Error updating category:', err);
        }
    };

    if (loading) return <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
    </div>;
    if (error) return <p className="text-red-500 text-center">{error.message}</p>;

    return (
        <div className="flex">
            <SlideBar />
            <div className="flex-1 p-4">
                <div className="overflow-x-auto">
                    <button
                        onClick={handleAdd}
                        className="mb-4 me-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 float-right hover:shadow-lg transition duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add
                    </button>

                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">STT</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {categories.map((category, index) => (
                                <tr key={category._id}>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left">
                                        {category.name}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left">
                                        {category.description}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category._id)}
                                            className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
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
                        <div className="fixed inset-0 z-50 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>

                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                                <h3 className="text-2xl leading-6 font-medium text-gray-900">
                                                    {modalMode === 'add' ? 'Add Category' : 'Edit Category'}
                                                </h3>
                                                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                                    <div className="rounded-md shadow-sm">
                                                        <div className="grid grid-cols-1 gap-y-3">
                                                            <div>
                                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                                    Name
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        id="name"
                                                                        defaultValue={selectedCategory?.name}
                                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                                    Description
                                                                </label>
                                                                <div className="mt-1">
                                                                    <textarea
                                                                        id="description"
                                                                        name="description"
                                                                        rows="3"
                                                                        defaultValue={selectedCategory?.description}
                                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                                        required
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6">
                                                        <button
                                                            type="submit"
                                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                        >
                                                            {modalMode === 'add' ? 'Add Category' : 'Save Changes'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminCategories