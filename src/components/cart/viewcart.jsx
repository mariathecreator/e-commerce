import { useEffect, useState } from "react"
import api from "../../global/Axios"
import { FaPlus, FaMinus } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const [cart, setCart] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchcart = async () => {
            try {
                const res = await api.get("/user/viewcart")
                setCart(res.data)
            }
            catch (err) {
                setError(err.message)
            }
        }
        fetchcart()
    }, [])

    const handleAdd = async (productId) => {
        try {
            const res = await api.put(`/user/updatecart/${productId}`, { action: "increment" })
            setCart(res.data) 
        } catch (err) {
            console.error(err)
        }
    }

    // Decrement quantity
    const handleSubtract = async (productId) => {
        try {
            const res = await api.put(`/user/updatecart/${productId}`, { action: "decrement" })
            setCart(res.data) 
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (productId) => {
        try {
            const res = await api.delete(`/user/deleteitems/${productId}`)
            setCart(res.data)
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleOrder = async () => {
        try {
            const res = await api.post('/user/addorder', { delivery_status: "pending" })
            alert('Order placed successfully')
            setCart({ items: [], total: 0 }) // Clear cart after order
            navigate('/order') 
        }
        catch (err) {
            console.error(err)
            alert('Failed to place order')
        }
    }

    if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>
    if (!cart || !cart.items || cart.items.length === 0) return <div className="text-black text-center mt-8">Your cart is empty.</div>

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-center">Your Cart</h1>
            <div className="max-w-xl mx-auto space-y-4">
                {cart.items.map((item, i) => (
                    <div className="flex flex-col justify-between items-center border-b pb-2" key={i}>
                        <div>
                            <img className="w-16 h-16 object-contain" src={item.product_image} alt={item.product_name} />
                            <h4 className="font-semibold">Product Name:{item.product_name}</h4>

                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    onClick={() => handleSubtract(item.product)}
                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    <FaMinus />
                                </button>
                                <span className="font-bold">{item.quantity}</span>
                                <button
                                    onClick={() => handleAdd(item.product)}
                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    <FaPlus />
                                </button>
                            </div>

                        </div>
                        <div>
                            <h3 className="font-semibold">Price: {item.product_price}</h3>
                            <h4 className="text-gray-600 text-sm">Subtotal: {item.subtotal}</h4>
                        </div>
                        <div className=" text-center">
                            <h4 className="text-xl font-bold">Total: {cart.total}</h4>
                        </div>
                        <div className="mt-6 text-center">

                            <button
                                onClick={() => handleDelete(item.product)}
                                className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                            >
                                Delete
                            </button>

                            <button
                                onClick={handleOrder}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Place Order
                            </button>

                        </div>


                    </div>
                ))}
            </div>
        </div>
    )
}
export default Cart