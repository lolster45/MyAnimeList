import React from 'react'
import {FaSearch} from "react-icons/fa";





export default function MobileSearch (props) {
  return (
    <div onClick={props.onClick} className={props.className}>
      <p><FaSearch/></p>  
    </div>
  ) 
}