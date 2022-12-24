import React from "react"

function Select (props) {
  return(
    <select id="select-options" onChange={props.handleChange}>
        <option value={props.optionOne}>{props.optionOne}</option>
        <option value={props.optionTwo}>{props.optionTwo}</option>
        <option value={props.optionThree}>{props.optionThree}</option>
        <option value={props.optionFour}>{props.optionFour}</option>
        {props.optionFive && <option value={props.optionFive}>{props.optionFive}</option>}
    </select>
  )
}

export {Select}