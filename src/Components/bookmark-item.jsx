import {Link} from "react-router-dom"

export default function BookmarkItem (props) {
    return (
        <Link className="bookmark" to={`/anime-info/${props.id}`}>
             <img src={props.image} alt="image cover for anime"/>
            <div>
                <h3>{props.title}</h3>
                <p>{props.synopsis.substring(0, 100)}</p>
            </div>
         </Link>
    )
}