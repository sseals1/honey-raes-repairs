import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export const TicketForm = () => {
    const [ticket, updateTicket] = useState({
        // capturing state with an object placeholder that will contain the values
        // chosen form options in the DOM
        description: "",
        emergency: false
    });

    const history = useHistory()
    // React hook that is used to push the user to previous stored browser data



    const submitTicket = (captureEventToPreventDefaultBehavior) => {
        // This parameter "captureEventToPreventDefault" stops the default behavior of the 
        // browser which in this case is to Submit the ticket. By preventing the default browser behavior
        // the browser will display the other html.
        captureEventToPreventDefaultBehavior.preventDefault()

        const newTicket={
            // the ticket object being updated with values from the state variable "ticket"
            description: ticket.description,
            emergency: ticket.emergency,
            // dot notation to create the value pairs on the new object keys
            customerId: parseInt(localStorage.getItem("honey_customer")),
            // getting the customerId value from localStorage
            employeeId: 1,
            // employeeId is hard-coded because you can't have a value of "0"in the
            // the API because the API will delete the key.
            dateCompleted: ""
        }

        const fetchOption = {
            // POST fetch call to send the new object to the API
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(newTicket)
            // the body of the fetch object has to be converted to JSON string
        }
        return fetch("http://localhost:8088/serviceTickets", fetchOption)
        // the fetchOption object is being sent to the url in the return fetch
                .then(() => {
                    history.push("/tickets")
                    // Once the object is sent to the API, the user is then 
                    // pushed/routed back to the /tickets route that is 
                    // specified as ticketList in the ApplicationViews component
                    })
    }





    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                    // The input tag holds all of the logic for capturing the 
                    // user input for the description field
                        required autoFocus
                        type="text"
                        // The code that tells what the form field will be (type="text")
                        className="form-control"
                        placeholder="Brief description of problem"

                        // The onChange event listener is used to capture the user input from the DOM
                        onChange={
                            (event) => {
                                // function of the onChange event
                                const copyOfTicketState = {...ticket}
                                // copying the value of the ticket state variable into a mutable variable
                                // state variables can't be modified directly
                                copyOfTicketState.description = event.target.value
                                // assigning to the key of description on the copyOfTicketState variable
                                // the value of the event.target
                                updateTicket(copyOfTicketState)
                                // invoking the updateTicket state setter function with the copyOfTicketState variable
                                // with the value of the event assigned to the description value 
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        onChange={
                            (event) => {
                                const copyOfTicketState = {...ticket}
                                copyOfTicketState.emergency = event.target.checked
                                updateTicket(copyOfTicketState)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={submitTicket}>
                {/* Invoking the submitTicket function which runs all of the code above */}
                {/* creating the ticket and sending it to the API */}
                Submit Ticket
            </button>
        </form>
    )
}