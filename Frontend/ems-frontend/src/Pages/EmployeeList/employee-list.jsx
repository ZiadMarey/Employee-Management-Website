
import { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../../Services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import Header from '../../Component/Header/header'
import './employee-list.css'

function EmployeeList(){

    const[employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();

    }, [])

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data);

        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        
        deleteEmployee(id).then((response) => {
            console.log(response.data);
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }


    return(
        <div className='container'>
            <p className='page-title'> List Of Employees</p>
            
            <div className='add-button-container'>
                <button className='add-button' onClick={addNewEmployee}>Add Employee</button>
            </div>
            
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='update-button' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='delete-button' onClick={() => removeEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    )
}

export default EmployeeList