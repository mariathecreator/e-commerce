import { useState } from "react";
import api from "../global/Axios";
import { Link, useNavigate } from "react-router-dom";

const Sign = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [sucess,isSucess]=useState(null)
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res=await api.post("/api/register",{name,email,password})

            console.log("Response:", res.data);
            setName("")
            setEmail("")
            setPassword("")
            isSucess(true)
            setMessage("registered successfully")
            navigate('/login')
        }
        catch (err) {
            console.error(err.response?.data?.message || err)
            isSucess(false)
            setMessage("registeration failed" + (err.response?.data?.message || "unknown error"))
        }
    }

    return (
        <div className="flex flex-col items-center  min-h-screen text-white mt-15 w-auto h-auto">
            <div className="w-full max-w-md rounded-3xl p-8 shadow-lg bg-black ">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <input type="text" name="name" value={name} placeholder="name" className="p-3 rounded-3xl  text-black  bg-white focus:outline-none " onChange={(e) => setName(e.target.value)} />
                    <input type="email" name="name" value={email} placeholder="email" className="p-3 rounded-3xl  text-black  bg-white focus:outline-none " onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="name" value={password} placeholder="password" className="p-3 rounded-3xl  text-black  bg-white focus:outline-none " onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Submit</button>
                </form></div>
            {message && (<p className={`mt-4 text-center font-medium ${sucess ?"text-green-400":"text-red-400"}`}>{message}</p>)}

            <div className="mt-10 text-lg text-center text-black">
                <h3 className="">If already a registered user Click here to</h3>
                <Link className="underline" to="/login">Login</Link>


            </div>
        </div>
    )

}
export default Sign