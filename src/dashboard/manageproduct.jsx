import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../global/Axios";

const Product = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/admin/products");
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const deleteProducts = async (id) => {
    try {
      await api.delete(`/api/admin/deleteproducts/${id}`);
      setData((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.log("Product cannot be deleted", err);
    }
  };

  if (loading) return <div className="text-white text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  if (!data || data.length === 0)
    return <div className="text-white text-center mt-8">No products found.</div>;

  return (
    <div className="text-black p-4">
      <h3 className="text-2xl font-bold mb-4">Products</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Brand</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product._id} className="border-t border-gray-600">
                <td className="px-6 py-4">
                  {product.image ? (
                    <img
                      src={`http://localhost:3000/uploads/${product.image}`}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.brand}</td>
                <td className="px-6 py-4">{product.category.name}</td>
                <td className="flex gap-2 mt-10">
                  <button
                    onClick={() => navigate(`/dashboard/updateproducts/${product._id}`)}
                    className="px-4 py-1 rounded text-sm font-medium bg-blue-500 hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteProducts(product._id)}
                    className="px-4 py-1 rounded text-sm font-medium bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
