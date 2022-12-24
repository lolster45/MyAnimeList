import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import "../styles/anime-info.scss"
import {SiMyanimelist} from "react-icons/si"
import {ImBookmarks, ImCheckmark} from "react-icons/im"
import {BsBookmarkDashFill} from "react-icons/bs"

import { auth } from "../utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth"


export default function AnimeInfo (props) {
    const [user, loading] = useAuthState(auth);
    const [anime, setAnime] = useState([])
    const {id} = useParams()

    useEffect(() => {
        getTopAnime()
    }, [id])
    //Searches the anime you have clicked on by ID using useParams()
    async function getTopAnime() {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/full`
        );
        const data = await response.json();
        setAnime(data.data);
    }
    console.log(anime)

    return (
        <section className="info-background">
            <img className="image-info" src={anime.images?.jpg?.image_url}/>
            <div>
                <h1 className="title-info">{anime.title_english}</h1>
                <div className="details-info">
                    <p>Score: {anime.score}</p>
                    <p>Rank: {anime.rank}</p>
                    <p>Status: {anime.status}</p>
                    
                    {/* Checks if the provided id of the anime is in bookmarks, if not, it shows add bm logo */}
                    {user && props.data.filter(x => x.id === id).length === 0 && (
                        <button 
                            className="logos bookmark"
                            data-id={anime.mal_id}
                            data-url={anime.url}
                            data-title={anime.title} 
                            data-image={anime.images?.jpg?.image_url} 
                            data-synopsis={anime.synopsis} 
                            onClick={props.onClick} 
                        >
                            {props.data.filter(x => x.id === id).length === 0 ? <ImBookmarks/> : <ImCheckmark/>}
                        </button>)
                    }
                    {/* {Essentially the same as above but it checks if its in booksmarks, if so, it shows dlt logo} */}
                    {user && props.data.filter(x => x.id === id).length >= 1 && (
                        <BsBookmarkDashFill 
                            className="remove-bookmark" 
                            data-id={anime.mal_id}
                            onClick={props.delete}
                        />
                    )}
                    <a href={anime.url} className="logos" target="_blank"><SiMyanimelist/></a>
                </div>
                <p className="synopsys">
                    {anime.synopsis}
                </p>
            </div>

        </section>
    )
}