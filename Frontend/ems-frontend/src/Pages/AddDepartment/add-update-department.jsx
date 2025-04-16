import { Link, useNavigate, useParams } from 'react-router-dom'
import './add-update-department.css'
import { useEffect, useState } from 'react';
import { createDepartment, getDepartmentById, updateDepartment } from '../../Services/DepartmentService';

function AddUpdateDepartment(){
    const [departmentName,setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');


    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getDepartmentById(id).then((response) => {
            setDepartmentName(response.data.departmentName);
            setDepartmentDescription(response.data.departmentDescription);
        }).catch(error => {
            console.error(error);
        })
    },[id])

    // const [errors, setErrors] = useState({
    //     departmentName: '',
    //     departmentDescription: '',
    //     email: ''
    // })

    function saveOrUpdateDepartment(e){
        e.preventDefault();

        const department = {departmentName, departmentDescription}
        console.log(department)

        if(id){
            updateDepartment(id, department).then((response) => {
                console.log(response.data);
                navigator('/departments');
            }).catch(error => {
                console.error(error);
            })
        }
        else{
            createDepartment(department).then((response) => {
                console.log(response.data);
                navigator("/departments");
            }).catch(error => {
                console.error(error);
            })
        }

        

        
    }

    function pageTitle(){
        if(id){
            return <div className="login-box-c101">Update Department</div>
        }
        else{
            return <div className="login-box-c100">Add A Department</div>
        }
    }


    return(
        <div className="body1">
        <div className="bgimage-c"></div>
        <div className="wrapper-c100">
          {pageTitle()}
          

          
          <form >
            <div className="input-box-c">
              <input
                type="text"
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                required
                
              />
              {/* { errors.departmentName && <div className='invalid-feedback'> {errors.departmentName} </div>} */}
              <label>Department Name</label>
            </div>
            <div className="input-box-c">
              <input
                type="text"
                id="password"
                value={departmentDescription}
                onChange={(e) => setDepartmentDescription(e.target.value)}
                required
                
              />
              {/* { errors.departmentDescription && <div className='invalid-feedback'> {errors.departmentDescription} </div>} */}
              <label>Department Description</label>
            </div>
            
            <button
              className="signin-button-c100"
              onClick={(e) => saveOrUpdateDepartment(e)}
            >
              Submit
            </button>
            
          </form>
        </div>
      </div>

    )
}
export default AddUpdateDepartment