import React from "react";
import { CustomerList } from "./customers/CustomerList.js";
import { EmployeeList } from "./EmployeeList.js";
import { TicketList } from "./serviceTickets/TicketList.js";




export const Repairs = () => {
  return (
    <>
      <h1>Honey Rae's Repair Shop</h1>
      <h2>Customers:</h2>
      <CustomerList />
      <h2>Employees:</h2>
      <EmployeeList />
      <h2>Ticket List</h2>
      <TicketList />
    </>
  );
};
