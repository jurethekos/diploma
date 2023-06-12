import React from 'react'
import { useEffect, useState, useRef } from "react";



export default function RegisterStudent({entryStudID, entryName, entryResAddr, entryDay, entryMonth, entryYear, entryUni, handleRegisterStudent, entryEmail}) {
    

    return ( 
        <div>
            <div class="container-fluid">
                <div class="d-flex justify-content-center">
                    <div class="col-xl-8 col-md-10 col-sm-12 shadow-lg p-4 bg-light rounded">

                        <div class="inputs form-group col-md-2">
                            <label for="studIdEntry">Student ID:</label>
                            <input class="form-control" ref={entryStudID} type="text" id="studIdEntry"></input>
                        </div>
                        <div class="inputs form-group col-md-3">
                            <label for="studIdEntry">Full name:</label>
                            <input class="form-control" ref={entryName} type="text" id="studIdEntry"></input>
                        </div>
                        <div class="inputs form-group col-md-3">
                            <label for="studIdEntry">Residential address:</label>
                            <input class="form-control" ref={entryResAddr} type="text" id="studIdEntry"></input>
                        </div>
                        <div class="inputs">
                            Birth date (D/M/Y) <br></br><input ref={entryDay} size="3"></input><input ref={entryMonth} size="3"></input><input ref={entryYear} size="4"></input>
                        </div>
                        <div class="inputs form-group col-md-3">
                            <label for="studIdEntry">University:</label>
                            <input class="form-control" ref={entryUni} type="text" id="studIdEntry"></input>
                        </div>
                        <div class="inputs form-group col-md-3">
                            <label for="studIdEntry">Email:</label>
                            <input class="form-control" ref={entryEmail} type="text" id="studIdEntry"></input>
                        </div>
                        <button type="button" class="inputsBtn btn btn-primary" onClick={handleRegisterStudent}>
                            Register student</button>

                    </div>
                </div>
            </div>
        </div>
        

    )
}