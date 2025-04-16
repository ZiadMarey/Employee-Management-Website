package net.javaguides.ems_backend.controller;


import lombok.AllArgsConstructor;
import net.javaguides.ems_backend.dto.EmployeeDto;
import net.javaguides.ems_backend.entity.Employee;
import net.javaguides.ems_backend.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private EmployeeService employeeService;

    //Build Add Employee Rest API
    //http://localhost:8080/api/employees/create

    @PostMapping("add")
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);

        return new ResponseEntity<>(savedEmployee , HttpStatus.CREATED);

    }

    // Build Get Employee Rest API
    //http://localhost:8080/api/employees/1

    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployee(@PathVariable("id") Long employeeId){
        EmployeeDto savedEmployee = employeeService.getEmployeeById(employeeId);

        return new ResponseEntity<>(savedEmployee , HttpStatus.OK);
    }

    // Build Get Employee Rest API
    //http://localhost:8080/api/employees
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployee(){
        List employees = employeeService.getAllEmployee();

        return new ResponseEntity<>(employees , HttpStatus.OK);
    }

    // Build Get Employee Rest API
    //http://localhost:8080/api/employees/update
    @PutMapping("update/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,
                                                      @RequestBody EmployeeDto employeeDto){
        EmployeeDto updatedEmployee = employeeService.updateEmployee(employeeId, employeeDto );

        return new ResponseEntity<>(updatedEmployee , HttpStatus.OK);

    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
        employeeService.deleteEmployee(employeeId);

        return new ResponseEntity<>("Employee deleted" , HttpStatus.OK);
    }
}
