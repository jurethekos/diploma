import React from 'react'
import { useEffect, useState, useRef } from "react";


export default function MintNFT({loggedIn, loggedUser, handleMint, entryNum, entryDay, entryMonth, entryYear, entryTitle, entryDescription, entrySubject, entryAUTH}) {
    
    return ( 
        <div>
            <div class="container-fluid">
                <div class="d-flex justify-content-center">
                    <div class="col-xl-8 col-md-10 col-sm-12 shadow-lg p-4 bg-light rounded">
                        <h2>Mint NFTs</h2>

                        <div class="inputs form-group col-md-4">
                            <label for="studIdEntry">NFT Title:</label>
                            <input class="form-control" ref={entryTitle} type="text" id="studIdEntry"></input>
                        </div>
                        <div class="inputs form-group">
                            <label for="studIdEntry">NFT Description:</label>
                            <input class="form-control" ref={entryDescription} type="text" id="studIdEntry"></input>
                        </div>
                        <div class="inputs form-group col-md-4">
                            <label for="studIdEntry">Subject:</label>
                            <input class="form-control" ref={entrySubject} type="text" id="studIdEntry"></input>
                        </div>
                        <div class="inputs">
                                Date (D/M/Y): <br></br><input ref={entryDay} size="3"></input><input ref={entryMonth} size="3"></input><input ref={entryYear} size="4"></input>
                        </div>

                        <div class="inputs form-group col-md-2">
                            <label for="studIdEntry">Number of NFTs:</label>
                            <input class="form-control" ref={entryNum} type="text" id="studIdEntry"></input>
                        </div>
                        <br></br>

                        <div class="inputs form-group col-md-3">
                            <label for="studIdEntry">AUTH Key:</label>
                            <input class="form-control" ref={entryAUTH} type="text" id="studIdEntry"></input>
                        </div>

                    { loggedUser.accType == "prof" && <button type="button" class="inputsBtn btn btn-primary" onClick={handleMint}>Mint NFTs</button>}
                    
                    </div>
                </div>
            </div>
        </div>
        
         
    )
}