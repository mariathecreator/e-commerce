import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../global/Axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", price: "", brand: "", category: "" });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [category, setCategory] = useState([]);

  // Fetch product by id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resp = await api.get(`/api/admin/products/${id}`);
        setForm({
          name: resp.data.name,
          price: resp.data.price,
          brand: resp.data.brand,
          category: resp.data.category._id,
        });

        const resc= await api.get('/api/admin/getcategories')
        setCategory(resc.data)
         } catch (err) {
           setError("Failed to fetch products and categories",err);
         }
      
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("name", form.name);
      formdata.append("price", form.price);
      formdata.append("brand", form.brand);
      formdata.append("category", form.category);
      if (image) formdata.append("image", image);

      await api.put(`/api/admin/updateproducts/${id}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Product updated successfully!");
      setError(null);
      setTimeout(() => navigate("/dashboard/products"), 1500);
    } catch (err) {
      setSuccess(null);
      setError("Failed to update product");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <select
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="" disabled>Select a category
            </option>
            {category.map((cat)=>(
              <option key={cat._id} value={cat._id}>
                {cat.name}
                </option>
            ))}
          </select>

        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 cursor-pointer focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Update
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}
      {success && <p className="text-green-500 mt-4 font-medium">{success}</p>}
    </div>
  );
};

export default UpdateProduct;
