import { useEffect, useState } from 'react'
import './department-list.css'
import { deleteDepratment, listDepartments } from '../../Services/DepartmentService';
import { useNavigate } from 'react-router-dom';

function DepartmentList(){

    const [departments, setDepartments] = useState([])

    const navigator =  useNavigate();

    function addNewDepartment(){
        navigator('/add-department')
    }

    useEffect(() => {
        getAllDepartments();

    }, [])

    function getAllDepartments(){
            listDepartments().then((response) => {
                setDepartments(response.data);
    
            }).catch(error => {
                console.error(error);
            })
    }

    function updateDepartment(id){

        navigator(`/edit-department/${id}`);
    }

    function removeDepartment(id){
            
            deleteDepratment(id).then((response) => {
                console.log(response.data);
                getAllDepartments();
            }).catch(error => {
                console.error(error);
            })
        }
        

    return(
        <div className='container'>
            <p className='page-title'> List Of Departments</p>
            
            <div className='d-add-button-container2'>
                <button className='add-button2' onClick={addNewDepartment}>Add Department</button>
            </div>
            
            
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Department Id</th>
                        <th>Department Name</th>
                        <th>Department Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        departments.map(department =>
                            <tr key={department.id}>
                                <td>{department.id}</td>
                                <td>{department.departmentName}</td>
                                <td>{department.departmentDescription}</td>
                                <td>
                                    <button className='update-button' onClick={() => updateDepartment(department.id)}>Update</button>
                                    <button className='delete-button' onClick={() => removeDepartment(department.id)}>Delete</button> 
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    )
    
}

export default DepartmentList