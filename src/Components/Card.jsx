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

{/* <section className="card-slot">
<main className="top-half">
  <span className="rank">{props.rank}</span>
  <a href={props.url}><img className="card-slot-img" src={props.image}/></a>
  <article>
    <header className="title">{props.title}</header>
    <p className="description">{props.synopsis}</p>
  </article>
</main>
<main className="bottom-half">
  <div className="parameters">Status: <span className={props.status === "airing" ? "parameters-subtext status online" : "parameters-subtext"}>{props.status}</span></div>
  <div className="parameters">Year: <span className="parameters-subtext">{props.year}</span></div>
  <div className="parameters">Rating: <span className="parameters-subtext">{props.score}/10</span></div>
  <div className="parameters">Author: <span className="parameters-subtext">klobet</span></div>
</main>
</section> */}