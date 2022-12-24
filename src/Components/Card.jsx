import React from "react"
import {Link} from "react-router-dom"

export default function Card(props) {
  return (
    <Link className="card-slot" to={`/anime-info/${props.id}`}>
      <main className="top-half">
        <span className="rank">{props.rank}</span>
        <img className="card-slot-img" src={props.image}/>
      </main>
    </Link>
  )
}