import { useEffect, useState } from "react"
import api from "../../global/Axios"
import { FaPlus, FaMinus } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  
  const [cart, setCart] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const fetchCart = async () => {
    try {
      const res = await api.get("/api/user/viewcart")
      setCart(res.data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])


  const handleAdd = async (productId) => {
    try {
      await api.put(`/api/user/updatecart/${productId}`, { action: "increment" })
      fetchCart() 
    } catch (err) {
      console.error(err)
    }
  }

  
  const handleSubtract = async (productId) => {
    try {
      await api.put(`/api/user/updatecart/${productId}`, { action: "decrement" })
      fetchCart()
    } catch (err) {
      console.error(err)
    }
  }


  const handleDelete = async (productId) => {
    try {
      await api.delete(`/api/user/deleteitems/${productId}`)
      fetchCart()
    } catch (err) {
      console.error(err)
    }
  }

 
  const handleOrder = async () => {
    try {
      await api.post('/api/user/addorder', { delivery_status: "pending" })
      alert('Order placed successfully!')
      setCart({ items: [], total: 0 })
      navigate('/order')
    } catch (err) {
      console.error(err)
      alert('Failed to place order.')
    }
  }

  
  if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>
  if (!cart || !cart.items || cart.items.length === 0)
    return <div className="text-black text-center mt-8">Your cart is empty.</div>

     
  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {cart.items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row justify-between items-center bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition-all"
          >
            {/* Image + Name */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <img
                className="w-24 h-24 object-contain rounded-md"
                src={`http://localhost:3000/uploads/${item.product_image}`}
                alt={item.product_name}
              />
              <div className="text-center sm:text-left">
                <h4 className="font-semibold">{item.product_name}</h4>
                <p className="text-gray-600">Price: ${item.product_price}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mt-3 sm:mt-0">
              <button
                onClick={() => handleSubtract(item.product)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                <FaMinus />
              </button>
              <span className="font-bold">{item.quantity}</span>
              <button
                onClick={() => handleAdd(item.product)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                <FaPlus />
              </button>
            </div>

            {/* Price Info */}
            <div className="text-center sm:text-right mt-3 sm:mt-0">
              <h4 className="font-semibold">Subtotal: ${item.subtotal}</h4>
            </div>

            {/* Delete */}
            <button
              onClick={() => handleDelete(item.product)}
              className="mt-4 sm:mt-0 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Total + Place Order */}
      <div className="mt-8 text-center">
        <h4 className="text-2xl font-bold">Total: ${cart.total}</h4>
        <button
          onClick={handleOrder}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  )
}

export default Cart
