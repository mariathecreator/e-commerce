import { useState } from "react"
import api from "../global/Axios"

const Createproduct = () => {
  const [form, setForm] = useState({ name: "", price: "", brand: "", category: "" })
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formdata = new FormData()
      formdata.append("name", form.name)
      formdata.append("price", form.price)
      formdata.append("brand", form.brand)
      formdata.append("category", form.category)
      if (image) formdata.append("image", image)

      await api.post("/admin/addproducts", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setForm({ name: "", price: "", brand: "", category: "" })
      setImage(null)
      setError(null)
      setSuccess(" Product added successfully!")
    } catch (err) {
      setSuccess(null)
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Product</h2>

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

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
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
          Submit
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}
      {success && <p className="text-green-500 mt-4 font-medium">{success}</p>}
    </div>
  )
}

export default Createproduct
