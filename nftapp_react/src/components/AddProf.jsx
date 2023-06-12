import React from 'react'
import { useEffect, useState, useRef } from "react";


export default function AddProf({loggedIn, loggedUser, entryAddress, entryName, entryEmail, entryAUTH, handleAddProf}) {
    
    return ( 
        <div>
            <div class="container-fluid">
                <div class="d-flex justify-content-center">
                    <div class="col-xl-8 col-md-10 col-sm-12 shadow-lg p-4 bg-light rounded">
                        <h2>Add Professor</h2>
                        <div class="inputs form-group col-md-3">
                            <label for="studIdEntry">Ethereum address:</label>
                            <input class="form-control" ref={entryAddress} type="text" id="studIdEntry"></input>
                        </div>
                        <div class="inputs form-group col-md-3">
                            <label for="studIdEntry">Professor name:</label>
                            <input class="form-control" ref={entryName} type="text" id="studIdEntry"></input>
                        </div>
                        <div class="inputs form-group col-md-3">
                            <label for="studIdEntry">Email:</label>
                            <input class="form-control" ref={entryEmail} type="text" id="studIdEntry"></input>
                        </div>
                        <br></br>

                        <div class="inputs form-group col-md-3">
                            <label for="studIdEntry">AUTH Key:</label>
                            <input class="form-control" ref={entryAUTH} type="text" id="studIdEntry"></input>
                        </div>
                        { loggedUser.accType == "uni" && <button type="button" class="inputsBtn btn btn-primary" onClick={handleAddProf}>Add Prof</button>}
                    </div>
                </div>
            </div>
        </div>
        

    )
}