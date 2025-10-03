import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../global/Axios";

const Search = () => {
    const [results, setResults] = useState([])
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q") || "";

    useEffect(() => {
        const fetchResults = async () => { 
            try {
                const res = await api.get(`/user/search?query=${query}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                    }
                )
                setResults(res.data);
            }
            catch (err) {
                console.error("Error fetching search results:", err);
                setResults([])
            }
        }
        if (query) {
            fetchResults();
        } else {
            setResults([])
        }
    }, [query]);

    if (results.length === 0) {
        return <div className="text-center mt-8 text-white">No results found for "{query}"</div>
    }

    return (
        <div className="p-6 text-black">
            <h1 className="text-3xl font-bold mb-6 text-center ">
                Search Results for "{query}"</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {results.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4 bg-white shadow hover:shadow-lg cursor-pointer"
                        onClick={() => navigate(`/home/itemcard/${item._id}`)}>

                        <img
                            src={`http://localhost:3000/uploads/${item.image}`}
                            alt={item.name}
                            className="w-full h-48 object-contain mb-4"
                        />

                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-gray-600">{item.brand}</p>
                        <p className="text-black font-bold">${item.price}</p>

                    </div>
                ))}
            </div>
        </div>
    )

}
export default Search;  