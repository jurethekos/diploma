import React from 'react'
import { useEffect, useState, useRef } from "react";


export default function Navbar({loggedIn, loggedUser, handleLogin, handleLogout, handleRegisterStudent}) {
    
    return ( 
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container">
                <a class="title" href="/"><img src="/KosCloud.png" alt="logo" width="45" height="45"></img> NFTAPP</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/search">Search students</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/howtouse">How To Use</a>
                        </li>
                        { loggedUser.accType == "admin" && (
                            <li class="nav-item">
                            <a class="nav-link" href="/adduni">Add Uni</a>
                            </li>
                        )}
                        { loggedUser.accType == "uni" && (
                            <li class="nav-item">
                            <a class="nav-link" href="/addprof">Add Prof</a>
                            </li>
                        )}
                        { loggedUser.accType == "prof" && (
                            <li class="nav-item">
                            <a class="nav-link" href="/mint">Mint NFTs</a>
                            </li>
                        )}
                        { (loggedUser.accType == "prof" || loggedUser.accType == "student") && (
                            <li class="nav-item">
                            <a class="nav-link" href="/mynfts">My NFTs</a>
                            </li>
                        )}
                        { (loggedUser.accType == "admin" || loggedUser.accType == "uni" || loggedUser.accType == "prof" || loggedUser.accType == "student") && (
                            <li class="nav-item">
                            <a class="nav-link" href="/account">Account</a>
                            </li>
                        )}
                        
                    </ul>
                    
                </div>
                { loggedIn && loggedUser.accType == "" && <a type="button" class="loginBtn btn btn-secondary" href="/registerstudent">Register as Student</a>}
                { loggedIn && <div class="user_name">{loggedUser.name}</div> }
                { !loggedIn && <button type="button" class="loginBtn btn btn-secondary" onClick={handleLogin}>Login</button>}
                { loggedIn && <button type="button" class="loginBtn btn btn-secondary" onClick={handleLogout}>Logout</button>}
            </div>
        </nav>
    )
}