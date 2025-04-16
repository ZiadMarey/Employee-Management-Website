import { useNavigate, useParams } from 'react-router-dom';
import './add-update-employee.css'
import { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../../Services/EmployeeService';

function AddEmployee(){

    const [firstName,setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email,setEmail] = useState('');

    const navigator = useNavigate();
    const {id} = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail (e.target.value)
    }

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        if(validateForm()){

            const employee = {firstName, lastName, email}
            console.log(employee);

            if(id){
                updateEmployee(id,employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                
                }).catch(error => {
                    console.error(error);
                })
            }
            else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
    
                }).catch(error => {
                    console.error(error);
                })
            }
            
            
            navigator('/employees');
        }
        
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors} //we're copying the whole error object inside
        
        if(firstName.trim()){
            errorsCopy.firstName = '' //if firstName is not empty then we won't show any validation errors
        } else{
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = ''
        } else{
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = ''
        } else{
            errorsCopy.email = 'Email Name is required';
            valid = false;
        }
        
        setErrors(errorsCopy);
        
        return valid;
    }

    useEffect(() => {

        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            
            }).catch( error => {
                console.error(error);
            })
        }

    }, [id]);

    function pageTitle(){
        if(id){
            return <div className="login-box-c">Edit An Employee</div>
        } else{
            return <div className="login-box-c">Add An Employee</div>
        }
    }

    

    return(
        <div className="body1">
        <div className="bgimage-c"></div>
        <div className="wrapper-c">
          {pageTitle()}
          <form /*onSubmit={handleLogin}*/>
            <div className="input-box-c">
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleFirstName}
                required
                
              />
              { errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
              <label>First Name</label>
            </div>
            <div className="input-box-c">
              <input
                type="text"
                id="password"
                value={lastName}
                onChange={handleLastName}
                required
                
              />
              { errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
              <label>Last Name</label>
            </div>

            <div className="input-box-c">
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmail}
                required
                className={`${errors.email ? 'is-invalid' : ''}`}
              />
              { errors.email && <div className='invalid-feedback'> {errors.email} </div>}
              <label>Email</label>
            </div>
            
            <button
              className="signin-button-c"
              onClick={saveOrUpdateEmployee}
            >
              Submit
            </button>
            
          </form>
        </div>
      </div>
    )
}

export default AddEmployee