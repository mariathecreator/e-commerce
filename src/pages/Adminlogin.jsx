import { useState } from "react";
import api from "../global/Axios";

const Admin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [sucess ,isSucess] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res =await api.post("/admin/login", { email, password })
            console.log(res);

            setEmail("")
            setPassword("")
            isSucess(true)
            setMessage("login successful"+(res.data.message))
        }
        catch (err) {
            console.error(err)
            isSucess(false)
            setMessage("Error:" + (err.response?.data?.message || err))
        }
    }
    return (
         <div className="flex items-center justify-center min-h-screen text-white">
      <div className="w-full max-w-md border border-gray-600 bg-black rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Admin Email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-3xl bg-white text-black focus:outline-none"
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-3xl bg-white text-black focus:outline-none"
            required
          />
          <button
            type="submit"
            className="border border-white py-3 rounded-3xl hover:bg-white hover:text-black transition duration-200"
          >
            Submit
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              sucess ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
    


export default Admin