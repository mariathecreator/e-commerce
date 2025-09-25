import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Sign from './pages/signup'
import Navbar from './components/navbar'
import Login from './pages/login'
import Admin from './pages/Adminlogin'
import DashBoard from './pages/Dashboard'
import Userdata from './dashboard/manageuser'
import Createproduct from './dashboard/createp'
import Product from './dashboard/manageproduct'
import Category from './dashboard/managecategory'
import Createcat from './dashboard/createcat'
import Updateproduct from './dashboard/updatep'
import Updatecat from './dashboard/updatecat'
import UserDashboard from './pages/userdashboard'



function App() {
  const location = useLocation()
  return (
    <>

      {!location.pathname.startsWith('/dashboard') && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Sign />} />
        <Route path='/adminlogin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<DashBoard />}>
          <Route path='users' element={<Userdata />} />
          <Route path='products' element={<Product />} />
          <Route path='addproducts' element={<Createproduct />} />
          <Route path='updateproducts/:id' element={<Updateproduct />} />
          <Route path='category' element={<Category />} />
          <Route path='addcategory' element={<Createcat />} />
          <Route path='updatecategory/:id' element={<Updatecat />} />
        </Route>
        <Route path='/home' element={<UserDashboard />} />

      </Routes>
    </>
  )
}

export default App
