import axios from 'axios'

import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Show from './pages/Show';
import Edit from './pages/Edit';
import Register from './pages/Register'

import './App.css'



function App() {

    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    async function getUser(token) {
        try {
            const response = await axios.get('/api/users', {
                headers: {
                    Authorization: token
                }
            })
            setUser(response.data)
        } catch(err) {
            console.log(err)
            localStorage.removeItem("token")
        }
        setIsLoading(false)
    }

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (token) {
            // get user info
            getUser(token)
        } else {
            setIsLoading(false)
        }

    }, [])

    let loggedIn = user.username

    return ( 
        <div className="app">
            <Navbar username={user.username} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile username={user.username} email={user.email}/>} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register setUser={setUser} />} />
                <Route path="/pages/Show/:id" element={<Show/>} />
                <Route path="/pages/edit/:id" element={<Edit/>} />


            </Routes>
        </div>
     );
}

export default App;

// oleo link: <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap" rel="stylesheet"></link>

// font-family: 'Oleo Script Swash Caps', system-ui;