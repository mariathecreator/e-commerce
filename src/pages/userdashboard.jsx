import { Outlet } from "react-router-dom"
import Cover from "../components/cover"
import Userbody from "../components/userhome/loginbody"
import Footer from "../components/footer"

const UserDashboard=()=>{
    return(
        <>
        <Cover/>
        <Userbody/>
        <Footer/>
        <Outlet/>
        </>
    )
}
export default UserDashboard