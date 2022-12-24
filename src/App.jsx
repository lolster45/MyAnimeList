import React, {useState } from 'react';
import {HashRouter, Route, Routes} from "react-router-dom"
import LoginPage from './Components/login';
import Home from './pages/Home';
import DashBoard from "./pages/Dashboard"
import AnimeInfo from "./Components/anime-info"


export function App() {
  const [bookmarks, setBookMarks] = useState([])
    
  function handleClick(event) {
    let id = event.currentTarget.getAttribute("data-id");
    let url = event.currentTarget.getAttribute("data-url")
    let title = event.currentTarget.getAttribute("data-title");
    let image = event.currentTarget.getAttribute("data-image");
    let synopsis = event.currentTarget.getAttribute("data-synopsis");

    setBookMarks(prevState => [...prevState, {
      id: id,
      url: url,
      title: title,
      image: image,
      synopsis: synopsis
    }])
  }

  function handleDelete (event) {
    const target = event.currentTarget.getAttribute("data-id");
    setBookMarks(prevState => [...prevState.filter(x => x.id !== target)])
  }

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login-user' element={<LoginPage/>}></Route>
        <Route path='/dashboard' element={<DashBoard data={bookmarks}/>}></Route>
        <Route path={`/Anime-info/:id`} element={<AnimeInfo onClick={handleClick} data={bookmarks} delete={handleDelete}/>}></Route>
      </Routes>
    </HashRouter>
  );   
}
