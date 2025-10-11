import { useEffect, useState } from "react"
import api from "../global/Axios"
import { useNavigate } from "react-router-dom"

const Category = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await api.get('/api/admin/getcategories')
                setData(res.data)
            }
            catch (err) {
                setError(err.message)
            }
        }
        fetchCategory()
    }, [])

    const deleteCategory = async (id) => {
        try {
            await api.delete(`/api/admin/deletecategories/${id}`)
            setData((prev) => prev.filter((c) => c._id !== id))
        }
        catch (err) {
            console.log("category cannot be deleted", err);
        }
    }

    return (
        <div className="text-black p-4">
            <h3 className="text-2xl font-bold mb-4">Category</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Description</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((category) => (
                            <tr key={category._id} className="border-t border-gray-600">
                                <td className="px-6 py-4">{category.name}</td>
                                <td className="px-6 py-4">{category.description}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/dashboard/updatecategory/${category._id}`)}
                                        className="px-4 py-1 rounded text-sm font-medium bg-blue-500 hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(category._id)}
                                        className="px-4 py-1 rounded text-sm font-medium bg-red-500 hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    )
}
export default Category;