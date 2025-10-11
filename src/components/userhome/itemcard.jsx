import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../global/Axios"
import { useCart } from "../cart/context"

const Itemcard = () => {
  const [item, setItem] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const { addtocart } = useCart()


  useEffect(() => {
    const getitem = async () => {
      try {
        const res = await api.get(`/api/user/viewproduct/${id}`)
        setItem(res.data)
      } catch (err) {
        console.log("data not found", err)
      }
    }
    getitem()
  }, [id]);

  

  const handlebutton = async () => {
    try {
      const res = await api.post(`/api/user/addcart/${item._id}`, { quantity: 1 });
      console.log(res.data);
      addtocart(item); // update cart context
      alert('Item added to cart!');
      navigate('/cart')

    } 
    catch (err) {
      console.error(err);
      alert('Failed to add item to cart.');
    }
  };


  if (!item) return null

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-xl relative">

        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <img
          className="w-full h-80 object-contain rounded-lg mb-4"
          src={`http://localhost:3000/uploads/${item.image}`}
          alt={item.name}
        />
        <h3 className="text-2xl font-bold">{item.name}</h3>
        <h3 className="text-gray-600 mt-1">{item.brand}</h3>
        <h4 className="text-lg font-semibold mt-2">${item.price}</h4>
        <p className="mt-3 text-gray-700">{item.description}</p>

        <button onClick={handlebutton} className="mt-5 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Itemcard
