import React from "react"

export default function Exit(props) {
  return (
    <button onClick={props.onClick} className={props.className}>X</button>
  )
}