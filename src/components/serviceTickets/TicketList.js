import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"


export const TicketList = () => {
    const [tickets, updateTickets] = useState([])
    const [descriptionString, updateString] = useState(", ")
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets?_expand=customer&_expand=employee")
                .then(res => res.json())
                .then((data) => {
                    updateTickets(data)
                })
        }, []
    )

    useEffect(
        () => {
            const ticketDescription = tickets.map(ticketObj => ticketObj.description)
                updateString(ticketDescription.join(", "))
    }, [tickets])


    return (
        <>
        <div>
        <button onClick={() => { history.push("/tickets/create")}}>Create Ticket</button>
        </div>
            {
                tickets.map(
                    (ticketObj) => {
                        return <div key={`tickets--${ticketObj.id}`}>
                            <p>
                          {ticketObj.description}  submitted by: {ticketObj.customer.name} and worked on by: {ticketObj.employee.name}
                           </p>
                            </div>
                    }
                )
            }
        </>
    )
}