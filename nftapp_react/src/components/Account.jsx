import React from 'react'
import { useEffect, useState, useRef } from "react";



export default function Account({entryEmail, entryLatitude, entryLongitude, handleEditUser, entryAUTH, handleGetAuthToken}) {
    

    return ( 
        <div>
            <div class="container-fluid">
                <div class="d-flex justify-content-center">
                    <div class="col-xl-8 col-md-10 col-sm-12 shadow-lg p-4 bg-light rounded">

                        <h2>Change account information</h2><br></br>

                        <div class="inputs form-group col-md-3">
                            <label for="studIdEntry">Email</label>
                            <input class="form-control" ref={entryEmail} type="text" id="studIdEntry"></input>
                        </div>
                        <div class="inputs form-group col-md-2">
                            <label for="studIdEntry">Latitude</label>
                            <input class="form-control" ref={entryLatitude} type="text" id="studIdEntry"></input>
                        </div>
                        <div class="inputs form-group col-md-2">
                            <label for="studIdEntry">Longitude</label>
                            <input class="form-control" ref={entryLongitude} type="text" id="studIdEntry"></input>
                        </div>

                        <br></br>

                        <div class="inputs form-group col-md-3">
                            <label for="studIdEntry">Auth key*</label>
                            <input class="form-control" ref={entryAUTH} type="text" id="studIdEntry"></input>
                        </div>
                        <p class="inputs">*Authentication key is required to change your profile information. To recieve your key, click "Get Auth Token" and it will be sent to your email.</p>
                        <br></br>

                        <button type="button" class="inputsBtn btn btn-primary" onClick={handleEditUser}>
                            Edit account</button>
                        <button type="button" class="inputsBtn btn btn-info nav-item" onClick={handleGetAuthToken}>
                            Get Auth Token</button>

                        

                    </div>
                </div>
            </div>
        </div>
        

    )
}