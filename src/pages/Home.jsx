import React, {useEffect} from "react"
import {auth} from "../utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import "../style.css"
import "../Components/style.scss"
import {Link} from "react-router-dom"
import {Select} from '../Components/Select';
import Card from '../Components/Card';
import SearchMobile from "../SearchMobile"
import ExitBtn from "../ExitBtn"


export default function Home() {
    const [user,loading] = useAuthState(auth)
    // These are the filters for Top anime....
    const [anime, setAnime] = React.useState([]);
    const [type, setType] = React.useState('');
    const [airing, setAiring] = React.useState('');
    const [page, setPage] = React.useState(1)

    const [button, setButton] = React.useState(false)
    const [buttonTwo, setButtonTwo] = React.useState(false)
    const [buttonThree, setButtonThree] = React.useState(false)
    
    // These are the states for the Search bar...
    const [input, setInput] = React.useState("")
    const [search, setSearch] = React.useState("")
    const [searchResults, setSearchResults] =  React.useState([])

    function onChange(event) {
        setInput(event.target.value) 
    } 
    function handleSubmit(event) {
        event.preventDefault()
        setSearch(input)
    }
    useEffect(() => {
        getSearch()
    }, [search])

    async function getSearch() {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`)   
        const data = await response.json()
        setSearchResults(data.data)
    }
    
    useEffect(() => {
        getTopAnime();
    }, [type, airing, page]);

    async function getTopAnime() {
        const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?type=${type}&filter=${airing}&page=${page}`
        );
        const data = await response.json();
        setAnime(data.data);
    }

    function handleChange(event) {
        setType(event.target.value);
    }
    function handleChangeAiring(event) {
        setAiring(event.target.value);
    }
    function buttonClickOne(event) {
        setButton(true)
        setButtonTwo(false)
        setButtonThree(false)
        setPage(1)
    }
    function buttonClickTwo(event) {
        setButton(false)
        setButtonTwo(true)
        setButtonThree(false)
        setPage(2)

    }
    function buttonClickThree(event) {
        setButton(false)
        setButtonTwo(false)
        setButtonThree(true)
        setPage(3)  
    }

    //Styles for nav backdrop
    const [navSearch, setNavSearch] = React.useState(false)
    function changePage() {
        setNavSearch(true)
    }
    function exitSearch(){ 
        setNavSearch(false)
    }

    return (
        <div className='App'>
        {/* These are the search page interactions */}
        <SearchMobile onClick={changePage} className={navSearch ? "mobile-search offline" : "mobile-search"} /> 
        <ExitBtn onClick={exitSearch} className={navSearch ? "exitBtn active" : "exitBtn"} />
        <div className={navSearch ? "search-results-container active" : "search-results-container"}>
          <section className="search-card-slots">
            {searchResults.map((x, index) => ( 
              <Card 
                className="search-card-slots" 
                key={index}
                id={x.mal_id}
                url={x.url} 
                title={x.title}
                synopsis={x.synopsis}
                image={x.images.jpg.image_url}
                score={x.score} 
                status={x.status}
                type={x.type}
                rank={x.rank}
                year={x.aired.string}
              />
            ))}
          </section>
        </div>
        <section className="nav-bar">
          <h1>TrendingAnime</h1>
          <Select
            handleChange={handleChange}
            optionOne='tv'
            optionTwo='movie'
            optionThree='ova' 
            optionFour='special'
            optionFive='music'
          />
          <Select
            handleChange={handleChangeAiring}
            optionOne='airing'
            optionTwo='upcoming'
            optionThree='ova'
            optionFour='favorite'
          />
          <form onSubmit={handleSubmit}>
            <input 
              onChange={onChange} 
              className={navSearch ? "search active" : "search"} 
              type="text" 
              placeholder="Search..." 
              value={input}
            />
          </form>
        {/* only shows up if user is not logged in with google */}
          {!user && (<Link to={"/login-user"}>
            <button className='login'>Join Now</button>
          </Link>)
          }
        {/* Only shows up if user is logged in with google */}
          {user && (<Link to={"/dashboard"}>
            <button className='dashboard-btn'>
                <img src={user.photoURL} alt="avatar"/>
            </button>
          </Link>)
          }
        </section>
        <section className='card-slot-container'>
          {anime.map(object => (
            <Card
              key={object.title}
              id={object.mal_id}
              type={type}
              airing={airing}
              page={page}
              image={object.images.jpg.image_url}
              title={object.title}
              rank={object.rank}
              url={object.url}
              synopsis={object.synopsis}
              score={object.score}
              status={object.status}
              year={object.aired.string}
            />
          ))}
        </section>
        {/* This is used to navigate between the pages of available anime. */}
          <div id="number-nav-container">
              <button className={button ? "number-nav active" : "number-nav"}onClick={buttonClickOne}>1</button>
              <button className={buttonTwo ? "number-nav active" : "number-nav"}onClick={buttonClickTwo}>2</button>
              <button className={buttonThree ? "number-nav active" : "number-nav"}onClick={buttonClickThree}>3</button>
          </div>
      </div>
    )
}