import { useEffect, useState } from "react"
import api from "../global/Axios"
import { useNavigate, useParams } from "react-router-dom"

const Updatecat = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({ name: "", description: "" })
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await api.get(`/admin/getcategories/${id}`)
                setForm({name:res.data.name,
                    description:res.data.description
                })
            }
            catch (err) {
                console.log("failed to fetch category", err);

            }
        }
        fetchCategory();
    },[id])
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
              const formdata = new FormData()
              formdata.append("name", form.name)
              formdata.append("description", form.description)


            await api.put(`/admin/updatecategories/${id}`, formdata,{
                headers: { "Content-Type": "application/json" },
            })

            setForm({ name: "", description: "" })
            setError(null)
            setSuccess(" Category updated successfully!")
            setTimeout(() => navigate("/dashboard/category"), 1500);
        } catch (err) {
            setSuccess(null)
            setError(err.message)
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Category</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Category name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
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

export default Updatecat
