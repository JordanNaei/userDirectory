import React from "react";

const styles = {
  card: {
    marginLeft: 20,
  },
  center: {
  margin: 50,
  }
};

function EmployeeCard(props) {
  return (
      <tr>
        <td><img alt={props.firstName} src={props.picture} /></td>
        <td >{props.firstName}</td>
        <td >{props.lastName}</td>
        <td >{props.email}</td>
        <td >{props.phone}</td>
        {props.children}
      </tr>
  );
}

export default EmployeeCard;