import React, { useState } from "react";
import "./App.css"
import Home from "./Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Details"
import SearchResult from "./SearchResult";
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Protected from "./Components/Protected/Protected";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from './Components/Header/Header'

function App() {
  const tokenLocalStorage = localStorage.getItem("token");
  const [token, setToken] = useState(tokenLocalStorage);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Header setToken={setToken} token={token} />
        <Routes>
          <Route path='/' element={<Home token={token} setToken={setToken} />} />
          <Route path='/Details/:id' element={
            <Protected token={token} setToken={setToken}>
              <Details />
            </Protected>
          } />
          <Route path='/search-result' element={<SearchResult />} />
          <Route path='/login' element={<Login token={token} setToken={setToken} />} />
          <Route path='/register' element={<Register token={token} setToken={setToken} />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
