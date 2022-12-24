import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import LoginPage from './Components/login';
import Home from './pages/Home';
import DashBoard from "./pages/Dashboard"
import AnimeInfo from "./Components/anime-info"

import BookmarkItem from './Components/bookmark-item';

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
    //console.log(event.currentTarget.getAttribute('data-id'))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login-user' element={<LoginPage/>}></Route>
        <Route path='/dashboard' element={<DashBoard data={bookmarks}/>}></Route>
        <Route path={`/Anime-info/:id`} element={<AnimeInfo onClick={handleClick} data={bookmarks} delete={handleDelete}/>}></Route>
        {/* <Route path="/CartPage" element={<BookmarkItem data={realCart}/>}></Route> */}
      </Routes>
    </BrowserRouter>
  );   
}
 {/*synopsis={}*/}
