import React from 'react'
import { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom'

export default function NTFInfo({tokens, loggedUser, entryStudID, handleTransferNFT, entryNFTID, entryAUTH}) {
    
    const {id, title, description, course, day, month, year, university, professor} = useParams();
    //console.log(token);

    return ( 

        <div class="container-fluid">
            <div class="d-flex justify-content-center">
                <div class="col-xl-6 col-md-8 col-sm-12 shadow-lg p-4 bg-light rounded">

                    <h5 class="card-text">{title}</h5>
                    <p class="card-text">{description}</p>
                    <p class="card-text">{course}</p>
                    <p class="card-text">{day}. {month}. {year}</p>
                    <p class="card-text">{university}</p>
                    <p class="card-text">{professor}</p>
                    <p class="card-text">NFT ID: {id}</p>

                    { loggedUser.accType == "prof" && (
                        <div class="inputs">
                            <br></br>
                            <div class="inputs">
                                <input ref={entryNFTID} type="text" defaultValue={id} hidden></input>
                            </div>
                            <div class="inputs form-group col-md-2">
                                <label for="studIdEntry">Student ID:</label>
                                <input class="form-control" ref={entryStudID} type="text" id="studIdEntry"></input>
                            </div>
                            <div class="inputs form-group col-md-4">
                                <label for="studIdEntry">AUTH Key:</label>
                                <input class="form-control" ref={entryAUTH} type="text" id="studIdEntry"></input>
                            </div>
                            <div>
                                <button type="button" class="inputsBtn btn btn-primary" onClick={handleTransferNFT}>Transfer</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}