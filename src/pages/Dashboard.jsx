import React from "react";
import "../styles/dashboard.scss"
import { auth } from "../utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import {Navigate, Link} from "react-router-dom"
import BookmarkItem from "../Components/bookmark-item";


export default function DashBoard(props) {
    const [user, loading] = useAuthState(auth);
    //Redirects user if they are not logged in...
    if (!user) return <Navigate to="/login-user" />
    
    return (
        <section className="dashboard-page">    
            <Link to={"/"} className="dashboard-nav">Go Back</Link>
            <img src={user.photoURL} alt="avatar photo" />
            <h1>Welcome {user.displayName}!</h1>
            <div className="bookmarks">
                <h2>Bookmarks:</h2>
                {props.data && (
                    props.data.map(x => {
                        return (
                            <BookmarkItem
                                key={x.id}
                                id={x.id}
                                url={x.url}
                                image={x.image}
                                title={x.title}
                                synopsis={x.synopsis}
                            />
                        )
                    })
                )} 
            </div>
            <div className="settings">
                <button onClick={() => auth.signOut()}>Sign Out</button>
            </div>
        </section>
    )
}