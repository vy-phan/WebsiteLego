import React, { useEffect, useState } from 'react'
import SlideBar from '../components/SlideBar'
import useGetProducts from '../hooks/useGetProducts'
import useGetCategories from '../hooks/useGetCategories';
import useGetAges from '../hooks/useGetAges';
import { postProduct, updateProduct, deleteProduct } from '../hooks/useCUD_Propducts';

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loading, error, fetchProducts } = useGetProducts();
  const { categories, loading: loadingCategories, error: errorCategories, fetchCategories } = useGetCategories();
  const { ages, loading: loadingAges, error: errorAges, fetchAges } = useGetAges();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchAges();
  }, []);

  const handleAdd = () => {
    setModalMode('add');
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async(id) => {
    const name = products.find((product) => product._id === id).name;
    if(confirm(`Are you sure you want to delete this product : ${name}?`)){
      await deleteProduct(id);
      await fetchProducts();
    }
  };

  // Xử lý thêm/sửa dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.elements.name.value,
      description: e.target.elements.description.value,
      image: e.target.elements.image.value,
      price: Number(e.target.elements.price.value),
      stock: Number(e.target.elements.stock.value),
      category: e.target.elements.category.value,
      age: e.target.elements.age.value,
    };
    

    try {
        if (modalMode === 'add') {
            await postProduct(formData);
        } else {
            await updateProduct(selectedProduct._id, formData);
        }
        setIsModalOpen(false);
        await fetchProducts(); // Cập nhật danh sách sau khi thêm/sửa
    } catch (err) {
        console.error('Error updating product:', err);
    }
};

  if (loading || loadingCategories || loadingAges) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || errorCategories || errorAges) return <div className="text-red-500 text-center">{error.message}</div>;

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

          {/* Table */}
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">STT</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Image</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Age</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Stock</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Price</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <img src={product.image} alt={product.name} className="h-16 w-16 object-cover" />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.description.length > 50 ? `${product.description.slice(0, 50)}...` : product.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {categories.map((category) => category._id === product.category ? category.name : null)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {ages.map((age) => age._id === product.age ? age.ageRange : null)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.stock}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.price} $
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
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
                          {modalMode === 'add' ? 'Add Product' : 'Edit Product'}
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
                                    defaultValue={selectedProduct?.name}
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
                                    defaultValue={selectedProduct?.description}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                  ></textarea>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                  Category
                                </label>
                                <div className="mt-1">
                                  <select
                                    id="category"
                                    name="category"
                                    defaultValue={selectedProduct?.category}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                  >
                                    {categories.map(category => (
                                      <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                  Age Range
                                </label>
                                <div className="mt-1">
                                  <select
                                    id="age"
                                    name="age"
                                    defaultValue={selectedProduct?.age}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                  >
                                    {ages.map(age => (
                                      <option key={age._id} value={age._id}>{age.ageRange}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                  Price
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    min={0}
                                    step={0.01}
                                    defaultValue={selectedProduct?.price}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                  Stock
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    min={0}
                                    step={1}
                                    defaultValue={selectedProduct?.stock}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                  Image URL
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    name="image"
                                    id="image"
                                    defaultValue={selectedProduct?.image}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <button
                              type="submit"
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              {modalMode === 'add' ? 'Add Product' : 'Save Changes'}
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

export default AdminProduct