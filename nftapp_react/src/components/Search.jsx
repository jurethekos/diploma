import React from 'react'
import { useEffect, useState, useRef } from "react";
import NTFCard from './NFTCard';
import { useParams } from 'react-router-dom'


export default function Search({searchID, handleSearch, searchUser, searchTokens}) {

    const {studId} = useParams();

    useEffect(() => {
        if (studId) {
            handleSearch();
        }
    }, []);
    
    return ( 
        <div>
            <div class="container-fluid">
                <div class="d-flex justify-content-center">
                    <div class="col-xl-8 col-md-10 col-sm-12 shadow-lg p-4 bg-light rounded">
                        <div>
                            <div>
                                <h2>Search page</h2>
                            </div>
                            <div class="inputs form-group col-md-2">
                                <label for="studIdEntry">Student ID: </label>
                                <input class="form-control" ref={searchID} type="text" id="studIdEntry" value={studId}></input>
                            </div> <br></br>
                            <div> 
                                <button type="button" class="inputsBtn btn btn-primary" onClick={handleSearch}>Search</button>
                            </div>  
                        </div>

                    </div>
                </div>
            </div>

            {searchTokens?.length > 0 ? 
            (<div class="container-fluid">
                <div class="d-flex justify-content-center">
                    <div class="col-xl-8 col-md-10 col-sm-12 shadow-lg p-4 bg-light rounded">

                        <div class="searchinfo">
                            Name: {searchUser.name}<br></br>
                            Address: {searchUser.residentialAddress}<br></br>
                            Birth: {searchUser.day}. {searchUser.month}. {searchUser.year}<br></br>
                            University: {searchUser.university}<br></br><br></br>
                            Email: <h6><a href={'mailto:' + searchUser.email}>{searchUser.email}</a></h6><br></br>
                        </div>

                        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4">
                            {searchTokens?.length > 0 ? 
                            (searchTokens.map((token) => (<NTFCard token={token} />))) : 
                            (<div>
                                <p>No tokens found</p>
                            </div>)}

                        </div>


                    </div>
                </div>
            </div>) :
            <div></div>}
        </div>
    )
}
