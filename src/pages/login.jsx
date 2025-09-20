import { useState } from "react";
import api from "../global/Axios";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const[sucess , isSucess] =useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post("/user/login", { email, password })

            console.log(res.data);
            setEmail("")
            setPassword("")
            isSucess(true)
            setMessage("login successful:" + (res.data.message))
        }
        catch (err) {
            console.error(err)
            isSucess(false)
            setMessage("login failed" + (err.response?.data?.message || err))
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white mt-15 h-auto ">
            <div className="w-full max-w-md border border-gray-600 bg-black rounded-3xl  p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <input className="p-3 rounded-3xl  text-black  bg-white focus:outline-none " type="email" name="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                    <input className="p-3 rounded-3xl  text-black  bg-white focus:outline-none " type="password" name="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="border border-white py-3 rounded-3xl text-white" type="submit">Submit</button>
                </form>
            </div>
            {message && (
                <p
                    className={`mt-4 text-center font-medium ${sucess ? "text-green-400" : "text-red-400"
                        }`}
                >
                    {message}
                </p>
            )}
            <div className="mt-10 text-lg text-center text-black">
                <h3 className="">If admin? Then Login here</h3>
                <Link className="underline" to="/Adminlogin">Login</Link>


            </div>
        </div >
    )
}

export default Login;