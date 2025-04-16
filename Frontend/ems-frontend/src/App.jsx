import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import './index.css'
import EmployeeList from './Pages/EmployeeList/employee-list.jsx'
import Header from './Component/Header/header.jsx'
import Footer from './Component/Footer/footer.jsx'
import AddEmployee from './Pages/AddEmployee/add-update-employee.jsx'
import DepartmentList from './Pages/DepartmentList/depratment-list.jsx';
import AddDepartment from './Pages/AddDepartment/add-update-department.jsx';

function App() {


  return (
    <div className='app'>
          <Router>

            <Header />

            <Routes>
              <Route path='/' element={<EmployeeList/>} />
              
              <Route path='/employees' element = {<EmployeeList/>} />
              <Route path= 'add-employee' element = {<AddEmployee />} />
              <Route path= 'edit-employee/:id' element = {<AddEmployee />} />
              
              <Route path= '/departments' element = {<DepartmentList />} />
              <Route path= '/add-department' element = {<AddDepartment />} />
              <Route path= '/edit-department/:id' element = {<AddDepartment />} />
            
            </Routes>


          </Router>
          
        <Footer />
    </div>
  )
}

export default App
