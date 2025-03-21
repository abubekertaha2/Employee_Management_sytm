import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import Category from './Components/Category'
import Dashboard from './Components/Dashboard'
import EditEmployee from './Components/EditEmployee'
import Employee from './Components/Employee'
import EmployeeDetails from './Components/EmployeeDetails'
import EmployeeLogin from './Components/EmployeeLogin'
import Home from './Components/Home'
import Login from './Components/Login'
import PrivateRoute from './Components/PrivateRoute'
import Profile from './Components/Profile'
import Start from './Components/Start'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetails />}></Route>
      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App