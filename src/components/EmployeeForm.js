import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const EmployeeForm = () => {
  const [locations, setLocations] = useState([]);

  const [employee, updateEmployee] = useState({
    // capturing state with an object placeholder that will contain the values
    // chosen form options in the DOM
    name: "",
    locationId: "",
    specialty: ""
  });

  const history = useHistory();
  // React hook that is used to push the user to previous stored browser data

  const SubmitEmployee = (captureEventToPreventDefaultBehavior) => {
    // This parameter "captureEventToPreventDefault" stops the default behavior of the
    // browser which in this case is to Submit the employee. By preventing the default browser behavior
    // the browser will display the other html.
    captureEventToPreventDefaultBehavior.preventDefault();

    const newEmployee = {
      // the employee object being updated with values from the state variable "employee"
      name: employee.name,
      locationId: employee.locationId,
      // dot notation to create the key values on the new object
      specialty: employee.specialty,
      employeeId: 1,
      // employeeId is hard-coded because you can't have a value of "0"in the
      // the API because the API will delete the key.
    };

    const fetchOption = {
      // POST fetch call to send the new object to the API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
      // the body of the fetch object has to be converted to JSON string
    };

    return (
      fetch("http://localhost:8088/employees", fetchOption)
        // the fetchOption object is being sent to the url in the return fetch
        .then(() => {
          history.push("/employees");
          // Once the object is sent to the API, the user is then
          // pushed/routed back to the /employees route that is
          // specified as employeeList in the ApplicationViews component
        })
    );
  };




  useEffect(() => {
    fetch("http://localhost:8088/locations")
      .then((res) => res.json())
      .then((locationData) => {
        setLocations(locationData);
        console.log(locationData);
      });
  }, []);

  return (
    <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Employee Name:</label>
          <input
            // The input tag holds all of the logic for capturing the
            // user input for the description field
            required
            autoFocus
            type="text"
            // The code that tells what the form field will be (type="text")
            className="form-control"
            placeholder="Employee name..."
            // The onChange event listener is used to capture the user input from the DOM
            onChange={(event) => {
              // function of the onChange event
              const copyOfEmployeeState = { ...employee };
              // copying the value of the employee state variable into a mutable variable
              // state variables can't be modified directly
              copyOfEmployeeState.name = event.target.value;
              // assigning to the key of description on the copyOfEmployeeState variable
              // the value of the event.target
              updateEmployee(copyOfEmployeeState);
              // invoking the updateEmployee state setter function with the copyOfEmployeeState variable
              // with the value of the event assigned to the employee key value
            }}
          />
        </div>
      </fieldset>


      <fieldset>
        <div className="form-group">
          <label htmlFor="specialty_description">Employee Specialty:</label>
          <input
            // The input tag holds all of the logic for capturing the
            // user input for the description field
            required
            autoFocus
            type="text"
            // The code that tells what the form field will be (type="text")
            className="form-control"
            placeholder="Employee specialty..."
            // The onChange event listener is used to capture the user input from the DOM
            onChange={(event) => {
              // function of the onChange event
              const copyOfEmployeeState = { ...employee };
              // copying the value of the employee state variable into a mutable variable
              // state variables can't be modified directly
              copyOfEmployeeState.specialty = event.target.value;
              // assigning to the key of description on the copyOfEmployeeState variable
              // the value of the event.target
              updateEmployee(copyOfEmployeeState);
              // invoking the updateEmployee state setter function with the copyOfEmployeeState variable
              // with the value of the event assigned to the employee key value
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Location:</label>

          <select 
                onChange={
                    (event) => {
                const copyOfEmployeeState = { ...employee };
                // copyOfEmployeeState.find(data => data.employee === event.target.value)
                // if (parseInt(event.target.value) === copyOfEmployeeState[0].id)
                    copyOfEmployeeState.locationId = parseInt(event.target.value);
                    updateEmployee(copyOfEmployeeState);
               
                }
            }>
              
              
              <option value="0" key="location">Select a location...</option>
            {
                
              locations.map((data) => {
                    return (
                        <option value={data.id} key={data.id}>{data.name}</option>
                        )
                    })

            }
            


          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={SubmitEmployee}>
        {/* Invoking the submitEmployee function which runs all of the code above */}
        {/* creating the employee and sending it to the API */}
        Submit Employee
      </button>
    </form>
  );
};
