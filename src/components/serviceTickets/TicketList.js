import React, { useEffect, useState } from "react"

export const TicketList = () => {
    const [tickets, updateTickets] = useState([])
    const [descriptionString, updateString] = useState(", ")

    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets")
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
           
            {
                tickets.map(
                    (ticketObj) => {
                        return <p key={`tickets--${ticketObj.id}`}>{ticketObj.description}</p>;
                    }
                )
            }
        </>
    )
}